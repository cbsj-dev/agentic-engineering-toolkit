# Adapter Comparison

Canonical assets define reusable engineering intent. The OpenCode adapter makes
that intent available in OpenCode without becoming a second source of truth.

| Concern | Canonical | OpenCode Adapter |
| --- | --- | --- |
| Code review role | `agents/code-reviewer/AGENT.md` | `.opencode/agents/code-reviewer.md` |
| Code review capability | `skills/code-review/SKILL.md` | `.opencode/skills/code-review/SKILL.md` |
| Bug-fix procedure | `workflows/bug-fixing/WORKFLOW.md` | `.opencode/commands/bug-fixing.md` |

The OpenCode adapter uses OpenCode frontmatter, subagent modes, permissions,
and slash commands. Its complete mapping inventory is maintained in
`framework/adapters/opencode.json` and validated by `harness/`.
