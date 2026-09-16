# Agentic Engineering Toolkit

Reusable agents, skills, workflows, policies, prompts, templates, and platform
adapters for AI-assisted and agentic software engineering.

## Contents

- `agents/`: platform-neutral role definitions.
- `skills/`: platform-neutral, reusable engineering capabilities.
- `workflows/`: repeatable engineering procedures.
- `policies/`: security, coding, and architecture guardrails.
- `prompts/` and `templates/`: reusable request and asset authoring aids.
- `framework/`: contracts, schemas, and platform adapter manifests.
- `harness/`: deterministic structural and adapter validation.
- `tools/scripts/`: project installation utilities.
- `.opencode/`: native OpenCode agent, skill, and command adapters.

## Structure

See the complete [repository layout](docs/architecture.md#repository-layout)
and [OpenCode integration guide](docs/opencode-integration.md).

## Use

Start with the canonical assets, use `framework/` to understand their contract,
and validate them through `harness/`. The initial platform adapter is OpenCode
at `.opencode/`. See `docs/architecture.md` and
`examples/adapter-comparison.md` for the canonical-to-adapter relationship.

## Use In A Project

Install the full OpenCode adapter into a project with symlinks:

```bash
tools/scripts/install-opencode-adapter.sh /path/to/project
```

Install selected assets with typed selectors:

```bash
tools/scripts/install-opencode-adapter.sh /path/to/project \
  agent:code-reviewer skill:code-review workflow:bug-fixing
```

Use `--dry-run` to preview changes or `--list` to view available selectors. The
installer preserves a project's `opencode.json` and refuses to overwrite paths.
See `docs/opencode-integration.md` for details and agent metadata guidance.

## Validate

```bash
npm test
```

OpenCode loads configuration at startup. Restart OpenCode after changing
`opencode.json` or files under `.opencode/`.
