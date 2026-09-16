# Asset Contracts

Canonical asset metadata is Markdown frontmatter validated against the matching
schema in `schemas/`.

| Asset | Path | Required Metadata |
| --- | --- | --- |
| Agent | `agents/<name>/AGENT.md` | `name`, `description`, `inputs`, `outputs`, `policies` |
| Skill | `skills/<name>/SKILL.md` | `name`, `description`, `triggers`, `outputs` |
| Workflow | `workflows/<name>/WORKFLOW.md` | `name`, `description` |

Adapter manifests list every platform-specific representation. A mapping must
identify the canonical file, adapter file, and canonical dependencies required
for a selective installation. The adapter must explicitly reference its
canonical source. This keeps adapter behavior reviewable without duplicating
the source asset's intent.
