import assert from "node:assert/strict";
import { lstat, mkdtemp, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const script = resolve(root, "tools/scripts/install-opencode-adapter.sh");

function run(...args) {
  return spawnSync("bash", [script, ...args], { cwd: root, encoding: "utf8" });
}

async function assertSymlink(path) {
  assert((await lstat(path)).isSymbolicLink(), `${path} must be a symlink`);
}

const fullTarget = await mkdtemp(join(tmpdir(), "agentic-toolkit-full-"));
const selectiveTarget = await mkdtemp(join(tmpdir(), "agentic-toolkit-selective-"));

try {
  const list = run("--list");
  assert.equal(list.status, 0, list.stderr);
  assert.match(list.stdout, /^agent:code-reviewer$/m);
  assert.match(list.stdout, /^skill:code-review$/m);
  assert.match(list.stdout, /^workflow:bug-fixing$/m);

  const dryRun = run("--dry-run", selectiveTarget, "agent:code-reviewer");
  assert.equal(dryRun.status, 0, dryRun.stderr);
  assert.match(dryRun.stdout, /\.opencode\/agents\/code-reviewer\.md/);
  await assert.rejects(lstat(join(selectiveTarget, ".opencode")));

  const selective = run(selectiveTarget, "agent:code-reviewer");
  assert.equal(selective.status, 0, selective.stderr);
  await assertSymlink(join(selectiveTarget, ".opencode/agents/code-reviewer.md"));
  await assertSymlink(join(selectiveTarget, "agents/code-reviewer"));
  await assertSymlink(join(selectiveTarget, "policies/coding/code-review.md"));
  await assertSymlink(join(selectiveTarget, "policies/coding/engineering.md"));

  const conflict = run(selectiveTarget, "agent:code-reviewer");
  assert.notEqual(conflict.status, 0, "existing assets must not be overwritten");

  const full = run(fullTarget);
  assert.equal(full.status, 0, full.stderr);
  for (const path of [".opencode", "agents", "skills", "workflows", "policies"]) {
    await assertSymlink(join(fullTarget, path));
  }
} finally {
  await rm(fullTarget, { recursive: true, force: true });
  await rm(selectiveTarget, { recursive: true, force: true });
}

console.log("OpenCode adapter installer is valid.");
