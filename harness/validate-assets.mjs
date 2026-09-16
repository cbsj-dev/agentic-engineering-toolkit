import { readFile, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assetPaths = {
  agent: (name) => `agents/${name}/AGENT.md`,
  skill: (name) => `skills/${name}/SKILL.md`,
  workflow: (name) => `workflows/${name}/WORKFLOW.md`,
};
const requiredFiles = [
  "AGENTS.md",
  "README.md",
  "CONTRIBUTING.md",
  "opencode.json",
  "docs/architecture.md",
  "docs/opencode-integration.md",
  "examples/adapter-comparison.md",
  "framework/CONTRACTS.md",
  "framework/adapters/opencode.json",
  "framework/schemas/agent.schema.json",
  "framework/schemas/skill.schema.json",
  "framework/schemas/workflow.schema.json",
  "framework/schemas/adapter-manifest.schema.json",
  "harness/fixtures/invalid-agent-metadata.md",
  "harness/test-install-opencode-adapter.mjs",
  "policies/coding/engineering.md",
  "policies/coding/code-review.md",
  "policies/security/security-review.md",
  "policies/architecture/architecture.md",
  "prompts/change-request.md",
  "templates/agent.md",
  "templates/skill.md",
  "templates/workflow.md",
  "tools/scripts/install-opencode-adapter.sh",
];

async function requireFile(path) {
  try {
    const info = await stat(resolve(root, path));
    if (!info.isFile()) throw new Error("not a file");
  } catch {
    throw new Error(`Required file is missing: ${path}`);
  }
}

async function readJson(path) {
  await requireFile(path);
  return JSON.parse(await readFile(resolve(root, path), "utf8"));
}

async function frontmatterKeys(path) {
  const content = await readFile(resolve(root, path), "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`Asset is missing frontmatter: ${path}`);

  return new Set(
    [...match[1].matchAll(/^([a-z][a-z-]*):/gm)].map((entry) => entry[1]),
  );
}

for (const path of requiredFiles) await requireFile(path);

const schemas = await Promise.all(
  ["agent", "skill", "workflow"].map(async (kind) => [
    kind,
    await readJson(`framework/schemas/${kind}.schema.json`),
  ]),
);
const contracts = new Map(schemas);
const manifestSchema = await readJson("framework/schemas/adapter-manifest.schema.json");
const manifest = await readJson("framework/adapters/opencode.json");

for (const field of manifestSchema.required) {
  if (!(field in manifest)) throw new Error(`OpenCode manifest is missing ${field}.`);
}
if (manifest.platform !== "opencode" || manifest.assetRoot !== ".opencode") {
  throw new Error("OpenCode manifest must identify the .opencode adapter root.");
}

const names = new Set();
for (const mapping of manifest.mappings) {
  for (const field of manifestSchema.properties.mappings.items.required) {
    if (!(field in mapping)) {
      throw new Error(`OpenCode mapping is missing ${field}.`);
    }
  }
  if (!assetPaths[mapping.kind]) throw new Error(`Unsupported asset kind: ${mapping.kind}`);
  if (mapping.canonical !== assetPaths[mapping.kind](mapping.name)) {
    throw new Error(`Canonical path does not match ${mapping.kind} ${mapping.name}.`);
  }
  if (names.has(`${mapping.kind}:${mapping.name}`)) {
    throw new Error(`Duplicate mapping for ${mapping.kind} ${mapping.name}.`);
  }
  names.add(`${mapping.kind}:${mapping.name}`);

  await requireFile(mapping.canonical);
  await requireFile(mapping.adapter);

  const keys = await frontmatterKeys(mapping.canonical);
  for (const field of contracts.get(mapping.kind).required) {
    if (!keys.has(field)) {
      throw new Error(`${mapping.canonical} is missing required ${field} metadata.`);
    }
  }

  const adapter = await readFile(resolve(root, mapping.adapter), "utf8");
  if (!adapter.includes(mapping.canonical)) {
    throw new Error(`${mapping.adapter} must reference ${mapping.canonical}.`);
  }

  const adapterKeys = await frontmatterKeys(mapping.adapter);
  const requiredAdapterField = mapping.kind === "skill" ? "name" : "description";
  if (!adapterKeys.has(requiredAdapterField)) {
    throw new Error(`${mapping.adapter} is missing ${requiredAdapterField} frontmatter.`);
  }

  if (!Array.isArray(mapping.dependencies)) {
    throw new Error(`${mapping.adapter} must declare a dependencies array.`);
  }
  for (const dependency of mapping.dependencies) {
    if (dependency.startsWith("/") || dependency.includes("..")) {
      throw new Error(`Adapter dependency must be a repository-relative path: ${dependency}`);
    }
    await requireFile(dependency);
  }
}

const config = await readJson("opencode.json");
if (config.$schema !== "https://opencode.ai/config.json") {
  throw new Error("opencode.json must declare the OpenCode schema URL.");
}

const shellCheck = spawnSync("bash", ["-n", "tools/scripts/install-opencode-adapter.sh"], {
  cwd: root,
  encoding: "utf8",
});
if (shellCheck.status !== 0) {
  throw new Error(`Installer shell syntax is invalid: ${shellCheck.stderr}`);
}

console.log("Framework contracts and OpenCode mappings are valid.");
