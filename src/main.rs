mod cli;

use clap::Parser;
use cli::{Cli, Command};

fn main() {
    let cli = Cli::parse();
    let result: Result<(), String> = match cli.command {
        Command::Init => {
            println!("bocal: init — not yet implemented");
            Ok(())
        }
        Command::Snapshot(args) => {
            let name = args.name.unwrap_or_else(|| "snapshot".to_string());
            println!("bocal: snapshot '{name}' — not yet implemented");
            Ok(())
        }
        Command::List(args) => {
            println!(
                "bocal: list (remote={}) — not yet implemented",
                args.remote
            );
            Ok(())
        }
        Command::Push(args) => {
            println!(
                "bocal: push '{}' — not yet implemented",
                args.name.as_deref().unwrap_or("<latest>")
            );
            Ok(())
        }
        Command::Pull(args) => {
            println!("bocal: pull '{}' — not yet implemented", args.name);
            Ok(())
        }
        Command::Restore(args) => {
            println!("bocal: restore '{}' — not yet implemented", args.name);
            Ok(())
        }
        Command::Remove(args) => {
            println!("bocal: remove '{}' — not yet implemented", args.name);
            Ok(())
        }
    };

    if let Err(e) = result {
        eprintln!("Error: {e}");
        std::process::exit(1);
    }
}
