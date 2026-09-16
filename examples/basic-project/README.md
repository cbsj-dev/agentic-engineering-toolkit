# Basic OpenCode Integration

Copy or symlink this repository's `.opencode/` directory, `AGENTS.md`, and
`opencode.json` into an OpenCode project. OpenCode loads project assets from
`.opencode/` and reads the root configuration.

The adapter definitions in `.opencode/` link to the canonical assets at the
repository root. Consumers can extend `opencode.json` with project-specific
models, permissions, MCP servers, and references.
