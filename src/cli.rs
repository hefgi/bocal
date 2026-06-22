use clap::{Args, Parser, Subcommand};

#[derive(Parser)]
#[command(
    name = "bocal",
    about = "Snapshot, share, and restore your local dev environment",
    version
)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Command,
}

#[derive(Subcommand)]
pub enum Command {
    /// Initialize bocal in the current project: create .bocal.toml
    Init,
    /// Capture the current environment into a local snapshot
    Snapshot(SnapshotArgs),
    /// List local (and, with --remote, registry) snapshots
    List(ListArgs),
    /// Push a local snapshot to the registry to share with your team
    Push(PushArgs),
    /// Pull a snapshot from the registry into the local store
    Pull(PullArgs),
    /// Restore a snapshot onto the current environment
    Restore(RestoreArgs),
    /// Remove a local snapshot
    Remove(RemoveArgs),
}

#[derive(Args)]
pub struct SnapshotArgs {
    /// Name/tag for the snapshot (defaults to a timestamped id)
    #[arg(long, short)]
    pub name: Option<String>,
    /// Optional human-readable message describing this snapshot
    #[arg(long, short)]
    pub message: Option<String>,
}

#[derive(Args)]
pub struct ListArgs {
    /// Also list snapshots available in the configured registry
    #[arg(long)]
    pub remote: bool,
}

#[derive(Args)]
pub struct PushArgs {
    /// Snapshot name to push (defaults to the most recent local snapshot)
    pub name: Option<String>,
}

#[derive(Args)]
pub struct PullArgs {
    /// Snapshot name (or name:tag) to pull from the registry
    pub name: String,
}

#[derive(Args)]
pub struct RestoreArgs {
    /// Snapshot name to restore onto the current environment
    pub name: String,
    /// Skip the confirmation prompt
    #[arg(long, short)]
    pub yes: bool,
}

#[derive(Args)]
pub struct RemoveArgs {
    /// Snapshot name to remove from the local store
    pub name: String,
}
