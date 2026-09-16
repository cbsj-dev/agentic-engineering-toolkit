---
name: git-publish
description: Creates a new branch, stages reviewed changes, commits an approved description, and safely pushes it.
---

# Git Publish

1. Collect a non-empty branch name, explicit repository-relative paths or
   `files: all`, a commit description or `message: auto`, and the destination
   remote. Confirm the current branch and remote before making changes.
2. Validate the requested branch name. Reject a default or protected branch and
   stop if the branch already exists locally or on the destination remote.
3. Inspect `git status --short --branch` and the working diff. If the index
   already contains changes, stop and ask the user how to handle them because a
   commit includes the entire index. Create the requested branch from the
   current branch with `git switch -c <branch>`.
4. Verify that every requested path is an intended working-tree change. When
   `files: all` is requested, list every candidate path and require confirmation
   before staging. Stage only the reviewed paths with `git add -- <paths>`;
   never use `git add .` or `git add -A`.
5. Review `git diff --cached --check` and `git diff --cached`. Confirm the
   staged diff contains only the requested paths and no secrets, credentials,
   private data, or unrelated changes.
6. Run the relevant validation for the staged changes and report its result. If
   `message: auto` was requested, derive a concise commit-message proposal from
   the reviewed diff and require the user's approval before committing.
7. Commit the staged changes with the approved description. Do not amend an
   existing commit or bypass hooks.
8. Push the new branch to the confirmed remote with upstream tracking. Do not
   force-push. If branch creation, commit, or push fails, report the exact
   repository state and do not use destructive recovery commands.
