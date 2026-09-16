# Engineering Policy

## Scope

Apply this policy to every implementation, refactor, and maintenance change.

## Requirements

- Inspect affected code and existing conventions before editing.
- Prefer the smallest correct change and avoid speculative abstractions.
- Preserve unrelated worktree changes.
- Do not add compatibility behavior without a concrete consumer or requirement.
- Keep secrets, credentials, and private data out of source control and output.
- Run the most relevant available validation after editing.
- Report changed files, validation performed, and any remaining limitations.
