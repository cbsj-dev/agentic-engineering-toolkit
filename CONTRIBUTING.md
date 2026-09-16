# Contributing

## Adding Assets

- Add canonical agents at `agents/<name>/AGENT.md`.
- Add canonical skills at `skills/<name>/SKILL.md`; the folder and frontmatter name must match.
- Add canonical workflows at `workflows/<name>/WORKFLOW.md`.
- Reference shared rules from `policies/` instead of copying them.
- Add or update the OpenCode mapping in `framework/adapters/opencode.json` when
  the canonical asset is available through OpenCode.
- Keep adapter permissions least-privilege and document any required external tools.

## Validation

Run `npm test` before submitting a change. Add focused checks to
`harness/validate-assets.mjs` when introducing a new repository convention or
adapter mapping.

## License

No license has been selected yet. Do not contribute code requiring a specific
license grant until the project license is established.
