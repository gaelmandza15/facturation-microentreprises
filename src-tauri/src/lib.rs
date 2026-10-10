// FacturaMicro — backend Rust (Tauri v2)
//
// L'app reste 100% locale et hors-ligne : les donnees vivent dans le
// localStorage de la WebView, aucun acces reseau n'est necessaire.
// Ce backend apporte :
//   1. `save_backup` / `open_backup` : dialogues natifs "Enregistrer sous" /
//      "Ouvrir" via tauri-plugin-dialog (lecture/ecriture du vrai systeme de fichiers) ;
//   2. une fenetre demarree cachee (visible:false), affichee par le frontend
//      quand l'UI est prete -> pas de flash blanc au lancement ;
//   3. un filet de securite : si le JS ne s'est jamais initialise (erreur de
//      chargement), la fenetre s'affiche apres 3 s au lieu de rester invisible.

use std::path::PathBuf;
use tauri::{Manager, WebviewWindow};
use tauri_plugin_dialog::{DialogExt, FilePath};

/// Ouvre une boite de dialogue native "Enregistrer sous..." puis ecrit le contenu JSON.
/// Retourne le chemin choisi, ou None si l'utilisateur annule.
#[tauri::command]
async fn save_backup(
    window: WebviewWindow,
    default_name: String,
    content: String,
) -> Result<Option<String>, String> {
    let file_name = if default_name.ends_with(".json") {
        default_name
    } else {
        format!("{}.json", default_name)
    };
    let picked = window
        .dialog()
        .file()
        .set_file_name(&file_name)
        .add_filter("JSON (sauvegarde FacturaMicro)", &["json"])
        .blocking_save_file();
    match picked {
        Some(fp) => {
            let path = match fp {
                FilePath::Path(p) => p,
                FilePath::Url(u) => PathBuf::from(url_to_path(&u)),
            };
            std::fs::write(&path, content).map_err(|e| e.to_string())?;
            Ok(Some(path.display().to_string()))
        }
        None => Ok(None), // utilisateur a annule
    }
}

/// Ouvre une boite de dialogue native "Ouvrir" et retourne le contenu du fichier.
/// Retourne None si l'utilisateur annule.
#[tauri::command]
async fn open_backup(window: WebviewWindow) -> Result<Option<String>, String> {
    let picked = window
        .dialog()
        .file()
        .add_filter("JSON (sauvegarde FacturaMicro)", &["json"])
        .blocking_pick_file();
    match picked {
        Some(fp) => {
            let path = match fp {
                FilePath::Path(p) => p,
                FilePath::Url(u) => PathBuf::from(url_to_path(&u)),
            };
            let data = std::fs::read(&path).map_err(|e| e.to_string())?;
            // Accepte UTF-8 avec ou sans BOM (le Bloc-notes Windows ajoute un BOM).
            let data = if data.starts_with(&[0xEF, 0xBB, 0xBF]) {
                data[3..].to_vec()
            } else {
                data
            };
            String::from_utf8(data)
                .map_err(|_| "Fichier non encode en UTF-8".to_string())
                .map(Some)
        }
        None => Ok(None),
    }
}

fn url_to_path(u: &str) -> String {
    u.strip_prefix("file://")
        .unwrap_or(u)
        .trim_start_matches('/')
        .to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            // Filet de securite : affichage force au plus tard 3 s apres le
            // lancement, meme si Desktop.signalReady() n'a jamais ete appele.
            if let Some(w) = app.get_webview_window("main") {
                let w2 = w.clone();
                std::thread::spawn(move || {
                    std::thread::sleep(std::time::Duration::from_secs(3));
                    let _ = w2.show();
                    let _ = w2.set_focus();
                });
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![save_backup, open_backup])
        .run(tauri::generate_context!())
        .expect("error while running FacturaMicro");
}
