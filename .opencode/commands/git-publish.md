---
description: Creates a new branch, stages reviewed changes, commits an approved description, and safely pushes it.
agent: build
---

Publish the requested changes: $ARGUMENTS

Follow `workflows/git-publish/WORKFLOW.md`. Require explicit paths, a commit
description, a destination remote, and a new branch before staging. Allow
`files: all` and `message: auto` only after showing the affected paths and
proposed message for approval. Do not stage unrelated changes, amend commits,
or force-push.
