#!/usr/bin/env node
/* i18n auto-checker — blocks commit if:
 * 1. a key exists in one language but not the other;
 * 2. a key is used in code but missing from dictionaries;
 * 3. accented text is hardcoded in a JS module;
 * 4. a currency appears hardcoded inside a translation string.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const I18N_FILE = path.join(ROOT, "js", "i18n.js");
const INDEX_FILE = path.join(ROOT, "index.html");
const JS_DIR = path.join(ROOT, "js");

let errors = [];

// ---------- Load dictionaries from js/i18n.js ----------
const i18nSrc = fs.readFileSync(I18N_FILE, "utf8");
const dictMatch = i18nSrc.match(/(?:const|var|window\.I18N\s*=|=)\s*\{[\s\S]*?\ben\s*:[\s\S]*?\bfr\s*:[\s\S]*?\}\s*;?\s*(?:$|[;\n])/);
let dicts = null;
try {
  // Evaluate the I18N object literal safely-ish
  const m = i18nSrc.match(/I18N\s*=\s*(\{[\s\S]*?\});/);
  if (m) dicts = eval("(" + m[1] + ")");
} catch (e) {
  errors.push("i18n.js: unable to parse I18N dictionary (" + e.message + ")");
}
if (!dicts) {
  console.error("FATAL: could not parse I18N dictionaries from js/i18n.js");
  process.exit(1);
}
const langs = Object.keys(dicts);
if (!langs.includes("en") || !langs.includes("fr")) {
  errors.push("Dictionaries must contain both 'en' and 'fr'.");
}

function flatten(obj, prefix, out) {
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    const key = prefix ? prefix + "." + k : k;
    if (v && typeof v === "object") flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}
const flat = {};
for (const l of langs) flat[l] = flatten(dicts[l], "", {});

// ---------- Rule 1: key symmetry ----------
for (let i = 0; i < langs.length; i++) {
  for (let j = 0; j < langs.length; j++) {
    if (i === j) continue;
    const a = langs[i], b = langs[j];
    for (const key of Object.keys(flat[a])) {
      if (!(key in flat[b])) {
        errors.push(`[symmetry] key "${key}" exists in ${a.toUpperCase()} but missing in ${b.toUpperCase()}`);
      }
    }
  }
}

// ---------- Collect all source files ----------
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}
const jsFiles = fs.readdirSync(JS_DIR).filter((f) => f.endsWith(".js"));

// ---------- Rule 2: keys used but missing ----------
const usedKeys = new Set();
for (const f of jsFiles) {
  const src = stripComments(fs.readFileSync(path.join(JS_DIR, f), "utf8"));
  const re = /\bt\(\s*["'`]([^"'`]+)["'`]/g;
  let m;
  while ((m = re.exec(src))) usedKeys.add(m[1]);
}
const htmlSrcRaw = fs.readFileSync(INDEX_FILE, "utf8");
const htmlAttrRe = /data-i18n(?:-html|-ph|-title|-doc-title)?\s*=\s*"([^"]+)"/g;
let hm;
while ((hm = htmlAttrRe.exec(htmlSrcRaw))) usedKeys.add(hm[1]);

for (const key of usedKeys) {
  for (const l of langs) {
    if (!(key in flat[l])) {
      errors.push(`[missing-key] key "${key}" is used in code but absent from ${l.toUpperCase()} dictionary`);
    }
  }
}

// ---------- Rule 3: accented hardcoded text in JS modules ----------
// Only UI display strings are checked. Data values (country legal texts, seed
// demo data) and stable internal identifiers (invoice status enum) are exempt.
const ACCENT_RE = /[\u00C0-\u00D6\u00D9-\u00F6\u00D9-\u00FF]/; // real accented letters only
const EXEMPT_FILES = ["i18n.js", "countries.js", "state.js"]; // dictionaries / country data / seed data
const INTERNAL_IDS = new Set(["Brouillon", "En attente", "Pay\u00E9e"]); // stable status enum values

for (const f of jsFiles) {
  if (EXEMPT_FILES.includes(f)) continue;
  const src = stripComments(fs.readFileSync(path.join(JS_DIR, f), "utf8"));
  const strRe = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g;
  let m;
  while ((m = strRe.exec(src))) {
    const lit = m[0];
    const inner = lit.slice(1, -1);
    if (!ACCENT_RE.test(inner)) continue;
    if (INTERNAL_IDS.has(inner)) continue; // stable internal enum value, displayed via t()/statusLabel()
    if (lit.startsWith("`") && inner.indexOf("${") !== -1) continue; // interpolated template -> translated inline
    errors.push("[hardcoded-accent] js/" + f + ": accented UI text hardcoded in string literal: " + lit.slice(0, 70));
  }
}

// ---------- Rule 4: hardcoded currency inside translations ----------
const CUR_RE = /[€$£¥₹¢]|(?<![A-Za-z])(EUR|USD|GBP|JPY|CHF|CAD|XOF|NGN|MAD|TND)(?![A-Za-z])/;
for (const l of langs) {
  for (const [key, val] of Object.entries(flat[l])) {
    if (typeof val !== "string") continue;
    // placeholders like {currency} are fine
    const cleaned = val.replace(/\{[A-Za-z_]+\}/g, "");
    const m = cleaned.match(CUR_RE);
    if (m) {
      errors.push(`[hardcoded-currency] ${l.toUpperCase()} key "${key}" contains hardcoded currency "${m[0]}": ${val.slice(0, 70)}`);
    }
  }
}

// ---------- Report ----------
if (errors.length) {
  console.error("i18n check FAILED (" + errors.length + " issue(s)):\n");
  for (const e of errors) console.error(" - " + e);
  console.error("\nCommit blocked. Fix the issues above (or add the missing keys to js/i18n.js).");
  process.exit(1);
} else {
  console.log("i18n check OK: dictionaries symmetric, no missing keys, no hardcoded accented text, no hardcoded currencies.");
}
