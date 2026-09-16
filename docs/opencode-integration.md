# OpenCode Integration

## Install the Toolkit

OpenCode discovers project assets under `.opencode/`. Install the complete
adapter and its canonical assets with the repository script:

```bash
tools/scripts/install-opencode-adapter.sh /path/to/project
```

Do not replace a project's existing `opencode.json` merely to install this
toolkit. Keep project-specific models, permissions, MCP servers, and other
configuration in that file. Link or copy `AGENTS.md` only when its repository
instructions are also appropriate for the project.

## Select Assets

If a project already has `.opencode/`, select only the needed assets. Use
typed selectors to distinguish agents, skills, and workflows:

```bash
tools/scripts/install-opencode-adapter.sh /path/to/project \
  agent:code-reviewer skill:code-review workflow:bug-fixing
```

List selectable assets:

```bash
tools/scripts/install-opencode-adapter.sh --list
```

Preview paths before creating links:

```bash
tools/scripts/install-opencode-adapter.sh --dry-run /path/to/project \
  agent:code-reviewer
```

Selective installation links the OpenCode adapter file, its canonical asset
directory, and policy dependencies declared in
`framework/adapters/opencode.json`. The script creates missing parent
directories, never changes `opencode.json`, and refuses to overwrite a path.

Restart OpenCode after adding or changing `opencode.json` or files under
`.opencode/`; configuration and asset files are loaded at startup.

## Agent Metadata

An OpenCode agent is a Markdown file in `.opencode/agents/`. Its YAML
frontmatter configures runtime behavior; the Markdown body is the prompt that
OpenCode gives the agent.

```md
---
description: Reviews code changes for correctness and regressions.
mode: subagent
permission:
  edit: deny
  bash: ask
---

Apply the canonical instructions in `agents/code-reviewer/AGENT.md`.
```

- The filename determines the agent name. For example,
  `.opencode/agents/code-reviewer.md` defines `code-reviewer`.
- `description` tells OpenCode and other agents when the specialist is relevant.
- `mode` controls where the agent can run. `subagent` makes it a delegable
  specialist; `primary` makes it available as a main agent; `all` supports both.
- `permission` limits tool access for that agent. The toolkit's reviewer agents
  cannot edit files and must request shell access.
- Optional fields such as `model` and `temperature` can override project-level
  defaults when a role needs them.

The metadata in `.opencode/agents/*.md` is intentionally runtime-specific.
The canonical `agents/<name>/AGENT.md` metadata instead describes reusable
intent: role, inputs, outputs, and applicable policies. Change the canonical
asset to alter the role's behavior; change the OpenCode adapter only to alter
how OpenCode discovers, runs, or restricts that role.
