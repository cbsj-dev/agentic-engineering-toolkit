# OpenCode Asset Scopes

OpenCode provides built-in agents and loads custom assets from user-level and
project-level configuration. Project definitions override user-level
definitions with the same name.

## Core and Built-In Assets

Built-in assets ship with OpenCode; they do not have Markdown files in the
project.

| Asset name | Type | Domain | Short use case description | Example |
| --- | --- | --- | --- | --- |
| `build` | Agent | Built-in | Implements and changes code in the active project. | Use `build` to add a validated feature. |
| `plan` | Agent | Built-in | Investigates a task and proposes an implementation plan; edits and shell commands require confirmation. | Use `plan` to scope a migration before making changes. |
| `general` | Agent | Built-in | Handles a general-purpose delegated task that does not need a specialist. | Delegate repository investigation to `general`. |
| `explore` | Agent | Built-in | Performs focused, read-only codebase exploration. | Delegate a search for authentication entry points to `explore`. |
| `scout` | Agent | Built-in | Researches external documentation and dependencies. | Delegate package API research to `scout`. |

## User-Level Assets

User-level assets are custom definitions available in every local project.

| Asset name | Type | Domain | Short use case description | Example |
| --- | --- | --- | --- | --- |
| User-defined, for example `my-reviewer` | Agent | User-level | Applies a personal or organization-wide workflow across projects. | Define `~/.config/opencode/agents/my-reviewer.md`. |
| User-defined, for example `my-checklist` | Skill | User-level | Supplies reusable, task-specific instructions across projects. | Define `~/.config/opencode/skills/my-checklist/SKILL.md`. |
| User-defined, for example `deploy` | Command | User-level | Runs a reusable prompt or workflow from the command palette. | Define `~/.config/opencode/commands/deploy.md`. |
| User-defined, for example `my-plugin` | Plugin | User-level | Extends OpenCode when agents, skills, and commands cannot express the behavior. | Register `my-plugin` in `~/.config/opencode/opencode.json`. |
| `opencode.json` | Configuration | User-level | Defines user-level defaults and can define inline agents and commands. | Set a reusable model or inline `agent` entry in `~/.config/opencode/opencode.json`. |

## Project Assets

Project assets apply only to this repository. The project agents are defined
under `.opencode/agents/` and are delegable subagents.

| Asset name | Type | Domain | Short use case description | Example |
| --- | --- | --- | --- | --- |
| `code-reviewer` | Agent | Project | Reviews changes for correctness, regressions, security risks, and missing tests. | Delegate a pull request review to `code-reviewer`. |
| `legacy-modernization` | Agent | Project | Plans safe, incremental modernization of legacy software and delivery practices. | Delegate a legacy framework migration assessment to `legacy-modernization`. |
| `product-owner` | Agent | Project | Clarifies product intent, scope, acceptance criteria, and delivery priorities. | Delegate a vague feature request to `product-owner`. |
| `security-reviewer` | Agent | Project | Evaluates changes for exploitable weaknesses and unsafe data handling. | Delegate threat analysis for an authentication change to `security-reviewer`. |
| `software-architect` | Agent | Project | Defines technical architecture for significant product and platform changes. | Delegate a proposed service boundary change to `software-architect`. |
| `requirements-analysis` | Skill | Project | Clarifies ambiguous feature requests and defines acceptance criteria. | Use for an underspecified feature request. |
| `architecture-analysis` | Skill | Project | Evaluates cross-cutting design, integration, and scalability decisions. | Use before recommending a significant design change. |
| `code-review` | Skill | Project | Reviews code changes, pull requests, and diffs for defects and missing verification. | Use when reviewing a pull request. |
| `refactoring` | Skill | Project | Improves code structure while preserving observable behavior. | Use before restructuring a stable component. |
| `testing` | Skill | Project | Selects or adds focused verification for changed behavior. | Use after implementing a bug fix. |
| `feature-development` | Command | Project | Delivers a scoped feature using the canonical feature-development workflow. | Run `/feature-development add audit logging`. |
| `bug-fixing` | Command | Project | Diagnoses and fixes a defect using the canonical bug-fixing workflow. | Run `/bug-fixing correct duplicate invoices`. |
| `legacy-analysis` | Command | Project | Analyzes legacy behavior and risks before a change. | Run `/legacy-analysis assess the billing importer`. |
| `modernization` | Command | Project | Plans or implements an incremental legacy modernization step. | Run `/modernization migrate the cache client`. |
| `git-publish` | Command | Project | Stages selected paths, commits a supplied description, and pushes the current branch safely. | Run `/git-publish files: docs/a.md; message: docs: clarify setup; remote: origin`. |
| No module currently defined | Plugin | Project | Reserves `.opencode/plugins/` for focused project-owned plugin modules. | Add a `.ts` or `.js` module to `.opencode/plugins/` when an extension is necessary. |
| `opencode.json` | Configuration | Project | Defines project-level configuration and currently loads `AGENTS.md` instructions. | Add a project-specific model, permission, or inline agent definition. |
