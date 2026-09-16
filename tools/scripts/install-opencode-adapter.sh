#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: install-opencode-adapter.sh [--dry-run] <project-directory> [selector...]
       install-opencode-adapter.sh --list

Installs OpenCode toolkit assets as symlinks without changing opencode.json.
With no selectors, installs the complete OpenCode adapter and all canonical
asset directories. Select individual assets with typed selectors:

  agent:code-reviewer
  skill:code-review
  workflow:bug-fixing
EOF
}

dry_run=false
list=false

while (($#)); do
  case "$1" in
    --dry-run) dry_run=true; shift ;;
    --list) list=true; shift ;;
    --help|-h) usage; exit 0 ;;
    --) shift; break ;;
    -*) printf 'Unknown option: %s\n' "$1" >&2; usage >&2; exit 2 ;;
    *) break ;;
  esac
done

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
toolkit_root=$(cd -- "$script_dir/../.." && pwd -P)
manifest="$toolkit_root/framework/adapters/opencode.json"

if $list; then
  if (($#)); then
    printf '%s\n' '--list does not accept a project directory or selectors.' >&2
    exit 2
  fi
  node - "$manifest" <<'NODE'
const manifest = JSON.parse(require("node:fs").readFileSync(process.argv[2], "utf8"));
for (const mapping of manifest.mappings) console.log(`${mapping.kind}:${mapping.name}`);
NODE
  exit 0
fi

if (($# == 0)); then
  usage >&2
  exit 2
fi

project_root=$(cd -- "$1" 2>/dev/null && pwd -P) || {
  printf 'Project directory does not exist: %s\n' "$1" >&2
  exit 2
}
shift

if (($# == 0)); then
  link_specs=(
    $'.opencode\t.opencode'
    $'agents\tagents'
    $'skills\tskills'
    $'workflows\tworkflows'
    $'policies\tpolicies'
  )
else
  link_output=$(node - "$manifest" "$@" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");
const manifest = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const mappings = new Map(manifest.mappings.map((mapping) => [`${mapping.kind}:${mapping.name}`, mapping]));
const links = new Map();

for (const selector of process.argv.slice(3)) {
  if (!/^(agent|skill|workflow):[a-z0-9]+(?:-[a-z0-9]+)*$/.test(selector)) {
    throw new Error(`Invalid selector: ${selector}`);
  }
  const mapping = mappings.get(selector);
  if (!mapping) throw new Error(`Unknown selector: ${selector}`);

  links.set(mapping.adapter, mapping.adapter);
  const canonicalDirectory = path.posix.dirname(mapping.canonical);
  links.set(canonicalDirectory, canonicalDirectory);
  for (const dependency of mapping.dependencies) links.set(dependency, dependency);
}

for (const [source, destination] of links) console.log(`${source}\t${destination}`);
NODE
  ) || exit 2
  if [[ -n "$link_output" ]]; then
    mapfile -t link_specs <<< "$link_output"
  else
    link_specs=()
  fi
fi

if ((${#link_specs[@]} == 0)); then
  printf '%s\n' 'No assets selected.' >&2
  exit 2
fi

for spec in "${link_specs[@]}"; do
  IFS=$'\t' read -r source_rel destination_rel <<< "$spec"
  source_path="$toolkit_root/$source_rel"
  destination_path="$project_root/$destination_rel"

  if [[ ! -e "$source_path" && ! -L "$source_path" ]]; then
    printf 'Toolkit asset is missing: %s\n' "$source_rel" >&2
    exit 1
  fi
  if [[ -e "$destination_path" || -L "$destination_path" ]]; then
    printf 'Refusing to overwrite existing path: %s\n' "$destination_path" >&2
    exit 1
  fi

  parent=$(dirname -- "$destination_path")
  while [[ "$parent" != "$project_root" ]]; do
    if [[ -e "$parent" || -L "$parent" ]]; then
      if [[ ! -d "$parent" ]]; then
        printf 'Destination parent is not a directory: %s\n' "$parent" >&2
        exit 1
      fi
      break
    fi
    parent=$(dirname -- "$parent")
  done
done

for spec in "${link_specs[@]}"; do
  IFS=$'\t' read -r source_rel destination_rel <<< "$spec"
  source_path="$toolkit_root/$source_rel"
  destination_path="$project_root/$destination_rel"

  if $dry_run; then
    printf 'ln -s %q %q\n' "$source_path" "$destination_path"
  else
    mkdir -p -- "$(dirname -- "$destination_path")"
    ln -s -- "$source_path" "$destination_path"
    printf 'Linked %s\n' "$destination_rel"
  fi
done

if ! $dry_run; then
  printf '%s\n' 'Restart OpenCode to load the installed assets.'
fi
