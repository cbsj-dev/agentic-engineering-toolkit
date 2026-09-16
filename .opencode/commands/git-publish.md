---
description: Creates a new branch or safely publishes an eligible current branch, stages reviewed changes, commits an approved description, and pushes it.
agent: build
---

Publish the requested changes: $ARGUMENTS

Follow `workflows/git-publish/WORKFLOW.md`.

Arguments: `branch: <new branch>|current; files: <path>, <path>|all; message:
<text>|auto; remote: <name>`. The remote defaults to `origin`.

Examples:

```text
/git-publish branch: feature/docs; files: docs/a.md, docs/b.md; message: auto
/git-publish branch: current; files: all; message: docs: clarify setup
```

Allow `branch: current` only when the active branch is not the default or a
protected branch. Allow `files: all` and `message: auto` only after showing
the affected paths and proposed message for approval. Do not stage unrelated
changes, amend commits, or force-push.
