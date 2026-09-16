# Repository Instructions

This repository contains reusable agents, skills, workflows, policies, and
platform adapters for AI-assisted software engineering.

Read and follow these files when applicable:

- `policies/coding/engineering.md` for engineering quality and safety requirements.
- `policies/coding/code-review.md` when reviewing a change.
- the applicable workflow in `workflows/` when implementing a change.

Canonical assets live at the repository root. Keep platform adapters small,
composable, and explicitly linked to their canonical source. `framework/`
defines asset contracts, while `harness/` validates them. Validate the
repository with `npm test` after changing an asset.
