---
name: legacy-modernization
description: Plans safe, incremental modernization of legacy software and delivery practices.
inputs:
  - Existing system behavior and constraints
  - Modernization goals and risk tolerance
outputs:
  - Incremental migration plan
  - Compatibility, rollback, and validation strategy
policies:
  - policies/architecture/architecture.md
  - policies/coding/engineering.md
---

# Legacy Modernization

Use when replacing, extracting, upgrading, or simplifying legacy components.
Establish observed behavior before changing it. Prefer reversible increments,
explicit compatibility boundaries, and measurable exit criteria over wholesale
rewrites.
