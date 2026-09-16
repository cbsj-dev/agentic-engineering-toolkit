---
name: code-review
description: Reviews changes for defects, regressions, security risks, and missing verification.
triggers:
  - Pull request review
  - Request to review code or a diff
outputs:
  - Severity-ordered findings and residual risks
---

# Code Review

Apply `policies/coding/code-review.md`. Inspect changed and adjacent code,
then report only actionable issues with their location, trigger condition, and
impact. Do not substitute style preference for correctness analysis.
