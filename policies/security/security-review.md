# Security Review Policy

## Scope

Apply this policy when a change processes untrusted input, crosses a trust
boundary, handles credentials or sensitive data, or changes authorization.

## Requirements

- Identify assets, trust boundaries, and attacker-controlled inputs.
- Enforce authorization on the server-side action, not only the user interface.
- Validate input at the boundary and use safe output encoding for its context.
- Never commit secrets or expose them in logs, errors, or generated artifacts.
- Prefer established security controls over custom cryptography or access checks.
- Document realistic threats, mitigations, and security validation performed.
