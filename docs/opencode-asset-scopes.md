# OpenCode Asset Scopes

OpenCode provides built-in agents and loads custom assets from user-level and
project-level configuration. Project definitions override user-level
definitions with the same name.

## Core and Built-In Assets

Built-in assets ship with OpenCode; they do not have Markdown files in the
project.

| Asset name | Type | Short use case description | Example |
| --- | --- | --- | --- |
| `build` | Agent | Implements and changes code in the active project. | Use `build` to add a validated feature. |
| `plan` | Agent | Investigates a task and proposes an implementation plan; edits and shell commands require confirmation. | Use `plan` to scope a migration before making changes. |
| `general` | Agent | Handles a general-purpose delegated task that does not need a specialist. | Delegate repository investigation to `general`. |
| `explore` | Agent | Performs focused, read-only codebase exploration. | Delegate a search for authentication entry points to `explore`. |
| `scout` | Agent | Researches external documentation and dependencies. | Delegate package API research to `scout`. |

## User-Level Assets

User-level assets are custom definitions available in every local project.

| Asset name | Type | Short use case description | Example |
| --- | --- | --- | --- |
| User-defined, for example `my-reviewer` | Agent | Applies a personal or organization-wide workflow across projects. | Define `~/.config/opencode/agents/my-reviewer.md`. |
| User-defined, for example `my-checklist` | Skill | Supplies reusable, task-specific instructions across projects. | Define `~/.config/opencode/skills/my-checklist/SKILL.md`. |
| User-defined, for example `deploy` | Command | Runs a reusable prompt or workflow from the command palette. | Define `~/.config/opencode/commands/deploy.md`. |
| User-defined, for example `my-plugin` | Plugin | Extends OpenCode when agents, skills, and commands cannot express the behavior. | Register `my-plugin` in `~/.config/opencode/opencode.json`. |
| `opencode.json` | Configuration | Defines user-level defaults and can define inline agents and commands. | Set a reusable model or inline `agent` entry in `~/.config/opencode/opencode.json`. |

## Project Assets

Project assets apply only to this repository. The project agents are defined
under `.opencode/agents/` and are delegable subagents.

| Asset name | Type | Short use case description | Example |
| --- | --- | --- | --- |
| `code-reviewer` | Agent | Reviews changes for correctness, regressions, security risks, and missing tests. | Delegate a pull request review to `code-reviewer`. |
| `legacy-modernization` | Agent | Plans safe, incremental modernization of legacy software and delivery practices. | Delegate a legacy framework migration assessment to `legacy-modernization`. |
| `product-owner` | Agent | Clarifies product intent, scope, acceptance criteria, and delivery priorities. | Delegate a vague feature request to `product-owner`. |
| `security-reviewer` | Agent | Evaluates changes for exploitable weaknesses and unsafe data handling. | Delegate threat analysis for an authentication change to `security-reviewer`. |
| `software-architect` | Agent | Defines technical architecture for significant product and platform changes. | Delegate a proposed service boundary change to `software-architect`. |
| `requirements-analysis` | Skill | Clarifies ambiguous feature requests and defines acceptance criteria. | Use for an underspecified feature request. |
| `architecture-analysis` | Skill | Evaluates cross-cutting design, integration, and scalability decisions. | Use before recommending a significant design change. |
| `code-review` | Skill | Reviews code changes, pull requests, and diffs for defects and missing verification. | Use when reviewing a pull request. |
| `refactoring` | Skill | Improves code structure while preserving observable behavior. | Use before restructuring a stable component. |
| `testing` | Skill | Selects or adds focused verification for changed behavior. | Use after implementing a bug fix. |
| `feature-development` | Command | Delivers a scoped feature using the canonical feature-development workflow. | Run `/feature-development add audit logging`. |
| `bug-fixing` | Command | Diagnoses and fixes a defect using the canonical bug-fixing workflow. | Run `/bug-fixing correct duplicate invoices`. |
| `legacy-analysis` | Command | Analyzes legacy behavior and risks before a change. | Run `/legacy-analysis assess the billing importer`. |
| `modernization` | Command | Plans or implements an incremental legacy modernization step. | Run `/modernization migrate the cache client`. |
| No module currently defined | Plugin | Reserves `.opencode/plugins/` for focused project-owned plugin modules. | Add a `.ts` or `.js` module to `.opencode/plugins/` when an extension is necessary. |
| `opencode.json` | Configuration | Defines project-level configuration and currently loads `AGENTS.md` instructions. | Add a project-specific model, permission, or inline agent definition. |
