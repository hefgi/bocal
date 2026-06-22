# bocal

> Snapshot, share, and restore your local dev environment.

`bocal` (French for *jar* — the sealing jar you preserve things in) is a CLI for
capturing the state of a local development environment — database dumps, fixture
files, constant files, environment variables — into a named **snapshot**, pushing
it to a registry to share with your team, and pulling any teammate's snapshot back
into your own machine.

```
I like my env  →  bocal snapshot  →  bocal push  →  teammate: bocal pull  →  bocal restore
```

## Why

Onboarding, reproducing bugs, and sharing "the env that works" usually means a
README full of manual steps and a Slack thread of `.env` files. `bocal` makes the
whole environment a versioned, shareable artifact.

## Install

```sh
# Homebrew
brew install hefgi/tap/bocal

# Cargo
cargo install bocal

# npm
npm install -g bocal
```

## Usage

```sh
bocal init                 # create .bocal.toml in your project
bocal snapshot -n baseline # capture current env into a local snapshot
bocal list                 # show local snapshots
bocal push baseline        # share it via the registry
bocal pull baseline        # fetch a snapshot from the registry
bocal restore baseline     # apply a snapshot onto your current env
```

## Status

Early development — the CLI surface is scaffolded; capture/restore backends are
in progress.

## License

Apache-2.0
