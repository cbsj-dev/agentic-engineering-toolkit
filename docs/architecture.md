# Architecture

## Purpose

This repository distributes reusable, platform-neutral assets for AI-assisted
software engineering. The framework defines their contracts, the harness
validates them, and platform adapters express them in host-specific formats.

## Repository Layout

```text
agentic-engineering-toolkit/
├── agents/
│   ├── software-architect/AGENT.md
│   ├── product-owner/AGENT.md
│   ├── code-reviewer/AGENT.md
│   ├── security-reviewer/AGENT.md
│   └── legacy-modernization/AGENT.md
├── skills/
│   ├── requirements-analysis/SKILL.md
│   ├── architecture-analysis/SKILL.md
│   ├── code-review/SKILL.md
│   ├── refactoring/SKILL.md
│   └── testing/SKILL.md
├── workflows/
│   ├── feature-development/WORKFLOW.md
│   ├── bug-fixing/WORKFLOW.md
│   ├── legacy-analysis/WORKFLOW.md
│   └── modernization/WORKFLOW.md
├── policies/
│   ├── architecture/
│   ├── coding/
│   └── security/
├── prompts/
├── templates/
├── framework/
│   ├── adapters/opencode.json
│   ├── schemas/
│   └── CONTRACTS.md
├── harness/
│   ├── fixtures/
│   └── validate-assets.mjs
├── tools/
│   └── scripts/install-opencode-adapter.sh
├── .opencode/
│   ├── agents/
│   ├── commands/
│   ├── plugins/
│   └── skills/
├── docs/
├── examples/
├── AGENTS.md
├── opencode.json
└── README.md
```

## Asset Boundaries

| Path | Responsibility |
| --- | --- |
| `agents/` | Canonical role definitions and responsibilities. |
| `skills/` | Canonical focused engineering capabilities. |
| `workflows/` | Canonical repeatable procedures. |
| `policies/` | Composable security, coding, and architecture rules. |
| `prompts/` | Reusable task prompts and request formats. |
| `templates/` | Starting points for canonical assets. |
| `framework/` | Asset contracts, JSON schemas, and adapter manifests. |
| `harness/` | Structural validation, fixtures, and future evaluations. |
| `.opencode/` | Native OpenCode agents, skills, commands, and plugins. |
| `examples/` | Minimal integration and adapter references. |

## Conventions

Canonical agents, skills, and workflows use Markdown frontmatter with a stable
name and purpose. `framework/schemas/` defines required metadata, and
`framework/adapters/opencode.json` records each adapter mapping. Canonical
definitions contain durable intent; adapters contain only runtime-specific
loading, permissions, or invocation details.

OpenCode skills must live at `.opencode/skills/<name>/SKILL.md` and use
OpenCode frontmatter. OpenCode commands delegate durable procedure to canonical
workflows. The harness confirms that each adapter definition explicitly links
to the canonical asset it represents.

No generic runtime is included yet. Add `runtime/` only when the toolkit owns
actual agent execution behavior such as lifecycle, state, or tool dispatch.

Run `npm test` to validate framework contracts, canonical assets, adapter
mappings, and OpenCode configuration syntax.
