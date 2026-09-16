# OpenCode Asset Scopes

OpenCode provides built-in agents and loads custom assets from user-level and
project-level configuration. Project definitions override user-level
definitions with the same name.

## Asset Taxonomy

Assets are grouped by responsibility level and ordered from strategy through
coordination to operation. Scope identifies where an asset is available.

| Asset name | Type | Scope | Domain | Level | Short use case description | Example |
| --- | --- | --- | --- | --- | --- | --- |
| `architecture-analysis` | Skill | Project | Architecture | Strategy | Evaluates cross-cutting design, integration, and scalability decisions. | Use before recommending a significant design change. |
| `software-architect` | Agent | Project | Architecture | Strategy | Defines technical architecture for significant product and platform changes. | Delegate a proposed service boundary change to `software-architect`. |
| `legacy-analysis` | Command | Project | Modernization | Strategy | Analyzes legacy behavior and risks before a change. | Run `/legacy-analysis assess the billing importer`. |
| `legacy-modernization` | Agent | Project | Modernization | Strategy | Plans safe, incremental modernization of legacy software and delivery practices. | Delegate a legacy framework migration assessment to `legacy-modernization`. |
| `modernization` | Command | Project | Modernization | Strategy | Plans or implements an incremental legacy modernization step. | Run `/modernization migrate the cache client`. |
| `product-owner` | Agent | Project | Product management | Strategy | Clarifies product intent, scope, acceptance criteria, and delivery priorities. | Delegate a vague feature request to `product-owner`. |
| `requirements-analysis` | Skill | Project | Product management | Strategy | Clarifies ambiguous feature requests and defines acceptance criteria. | Use for an underspecified feature request. |
| `feature-development` | Command | Project | Development | Coordination | Delivers a scoped feature using the canonical feature-development workflow. | Run `/feature-development add audit logging`. |
| User-defined, for example `my-checklist` | Skill | User-level | Engineering process | Coordination | Supplies reusable, task-specific instructions across projects. | Define `~/.config/opencode/skills/my-checklist/SKILL.md`. |
| `general` | Agent | Built-in | General-purpose | Coordination | Handles a general-purpose delegated task that does not need a specialist. | Delegate repository investigation to `general`. |
| `plan` | Agent | Built-in | Planning | Coordination | Investigates a task and proposes an implementation plan; edits and shell commands require confirmation. | Use `plan` to scope a migration before making changes. |
| `opencode.json` | Configuration | Project | Platform configuration | Coordination | Defines project-level configuration and currently loads `AGENTS.md` instructions. | Add a project-specific model, permission, or inline agent definition. |
| `opencode.json` | Configuration | User-level | Platform configuration | Coordination | Defines user-level defaults and can define inline agents and commands. | Set a reusable model or inline `agent` entry in `~/.config/opencode/opencode.json`. |
| `code-review` | Skill | Project | Quality | Coordination | Reviews code changes, pull requests, and diffs for defects and missing verification. | Use when reviewing a pull request. |
| `code-reviewer` | Agent | Project | Quality | Coordination | Reviews changes for correctness, regressions, security risks, and missing tests. | Delegate a pull request review to `code-reviewer`. |
| User-defined, for example `my-reviewer` | Agent | User-level | Quality | Coordination | Applies a personal or organization-wide workflow across projects. | Define `~/.config/opencode/agents/my-reviewer.md`. |
| `security-reviewer` | Agent | Project | Security | Coordination | Evaluates changes for exploitable weaknesses and unsafe data handling. | Delegate threat analysis for an authentication change to `security-reviewer`. |
| User-defined, for example `deploy` | Command | User-level | CI/CD | Operation | Runs a reusable prompt or workflow from the command palette. | Define `~/.config/opencode/commands/deploy.md`. |
| `build` | Agent | Built-in | Development | Operation | Implements and changes code in the active project. | Use `build` to add a validated feature. |
| `explore` | Agent | Built-in | Exploration | Operation | Performs focused, read-only codebase exploration. | Delegate a search for authentication entry points to `explore`. |
| No module currently defined | Plugin | Project | Extensibility | Operation | Reserves `.opencode/plugins/` for focused project-owned plugin modules. | Add a `.ts` or `.js` module to `.opencode/plugins/` when an extension is necessary. |
| User-defined, for example `my-plugin` | Plugin | User-level | Extensibility | Operation | Extends OpenCode when agents, skills, and commands cannot express the behavior. | Register `my-plugin` in `~/.config/opencode/opencode.json`. |
| `bug-fixing` | Command | Project | Maintenance | Operation | Diagnoses and fixes a defect using the canonical bug-fixing workflow. | Run `/bug-fixing correct duplicate invoices`. |
| `refactoring` | Skill | Project | Quality | Operation | Improves code structure while preserving observable behavior. | Use before restructuring a stable component. |
| `testing` | Skill | Project | Quality | Operation | Selects or adds focused verification for changed behavior. | Use after implementing a bug fix. |
| `git-publish` | Command | Project | Repository management | Operation | Stages selected paths, commits a supplied description, and pushes the current branch safely. | Run `/git-publish files: docs/a.md; message: docs: clarify setup; remote: origin`. |
| `scout` | Agent | Built-in | Research | Operation | Researches external documentation and dependencies. | Delegate package API research to `scout`. |
