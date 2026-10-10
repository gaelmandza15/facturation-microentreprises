// FacturaMicro — point d'entrée Tauri (Windows/Linux/macOS)
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    facturamicro_lib::run()
}
