# Framework

The framework defines platform-neutral contracts for the toolkit's declarative
assets. It does not execute agents, manage model state, or provide a runtime.

- `schemas/` defines required metadata for canonical assets and adapter manifests.
- `adapters/` records how a platform-specific adapter maps to canonical assets.

Canonical assets remain the source of engineering intent. Platform adapters may
add only loading, invocation, or permission details required by their host.
