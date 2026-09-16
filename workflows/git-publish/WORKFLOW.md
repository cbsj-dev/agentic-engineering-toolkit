---
name: git-publish
description: Stages selected paths, commits an approved description, and safely pushes the current branch.
---

# Git Publish

1. Collect explicit repository-relative paths, a non-empty commit description,
   and the destination remote. Confirm the current branch and remote before
   making changes; do not push a default or protected branch without explicit
   user approval.
2. Inspect `git status --short --branch` and the working diff. If the index
   already contains changes, stop and ask the user how to handle them because a
   commit includes the entire index.
3. Verify that every requested path is an intended working-tree change. Stage
   only those paths with `git add -- <paths>`; never use `git add .` or
   `git add -A`.
4. Review `git diff --cached --check` and `git diff --cached`. Confirm the
   staged diff contains only the requested paths and no secrets, credentials,
   private data, or unrelated changes.
5. Run the relevant validation for the staged changes and report its result.
6. Commit the staged changes with the supplied description. Do not amend an
   existing commit or bypass hooks.
7. Push the confirmed current branch to the confirmed remote. Do not
   force-push. If the commit or push fails, report the exact repository state
   and do not use destructive recovery commands.
