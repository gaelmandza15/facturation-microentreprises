# FacturaMicro — application desktop (Tauri v2)

Le projet reste **une seule base de code** : le web (ouvrir `index.html`) et
l'application desktop partagent exactement les mêmes fichiers HTML/CSS/JS.
`src-tauri/` est un simple *wrapper* Tauri qui emballe le site existant.

## Prérequis (une seule fois)

1. **Rust** : https://rustup.rs (toolchain stable, ≥ 1.80)
2. **Dépendances système WebView** (selon l'OS) :
   - Windows : WebView2 (inclus dans Windows 10/11 ; sinon `downloadBootstrapper` le récupère à l'installation)
   - macOS : rien (WebKit natif)
   - Linux : `webkit2gtk-4.1`, `build-essential`, `libssl-dev`, etc. — voir https://tauri.app/start/prerequisites/
3. **CLI Tauri** : `npm install --save-dev @tauri-apps/cli`

## Commandes

```bash
npx tauri dev        # fenêtre native en hot-reload (développement)
npx tauri build      # installeurs signables : .msi/.exe (NSIS), .dmg, .deb/.rpm/.AppImage
```

Les artefacts produits se trouvent dans `src-tauri/target/release/bundle/`.

## Ce que change le mode desktop

| Fonction | Web | Desktop (Tauri) |
|---|---|---|
| Sauvegarde JSON | téléchargement navigateur | dialogue natif **« Enregistrer sous… »** (`save_backup`) |
| Import JSON | input file | dialogue natif **« Ouvrir »** (`open_backup`, gère le BOM UTF‑8) |
| Fenêtre au lancement | — | affichée seulement quand l'UI est prête (pas de flash blanc), filet de sécurité d'affichage à 3 s |
| Données | localStorage du navigateur | localStorage persistant de la WebView (même mécanisme, dossier des données de l'app) |
| Réseau | aucun | aucun (CSP restrictive, app 100 % hors-ligne) |

La détection se fait dans `js/desktop.js` : sans `window.__TAURI__` (mode web),
tout retombe sur les comportements navigateur — aucune régression possible.

## Architecture

```
src-tauri/
├── Cargo.toml              # crate facturamicro + tauri 2 + tauri-plugin-dialog
├── build.rs
├── tauri.conf.json         # frontendDist "../" (le site tel quel), CSP, bundle multi-OS
├── capabilities/default.json  # ACL : core:default + dialog save/open uniquement
├── icons/                  # icônes PNG (32→512) + ICO générées pour le bundle
└── src/
    ├── main.rs             # entrée Windows/Linux/macOS
    └── lib.rs              # commandes save_backup / open_backup + fenêtre différée
```

## Notes

- Les icônes actuelles sont une **placeholder propre** (carré bleu arrondi, « F »)
  générées par script. Pour les remplacer par le vrai logo :
  `npx tauri icon chemin/logo.png` (régénère tous les formats).
- L'impression/PDF passe par `window.print()` de la WebView native
  (« Microsoft Print to PDF », « Imprimer → PDF » sur macOS/Linux). Un export
  PDF 1-clic via commande Rust est prévu comme évolution ultérieure.
- `Cargo.lock` n'est pas versionné ici (app binaire sans release reproductible
  exigée) ; ajoutez-le si vous publiez des builds vérifiables.
