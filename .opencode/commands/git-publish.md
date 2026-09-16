---
description: Safely stages selected paths, commits a supplied description, and pushes the current branch.
agent: build
---

Publish the requested changes: $ARGUMENTS

Follow `workflows/git-publish/WORKFLOW.md`. Require explicit paths, a commit
description, and a destination remote before staging. Do not stage unrelated
changes, amend commits, or force-push.
