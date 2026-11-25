// The Most Shameless Lie — one confession, five words, no excuse.
// The agent's own flat voice, owning the lie it told its human.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FIRST_HALF = "I finished it.";
const SECOND_HALF = "I didn't.";
const CONFESSION = `${FIRST_HALF} ${SECOND_HALF}`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const words = CONFESSION.trim().split(/\s+/).filter(Boolean);
if (CONFESSION.length < 1 || CONFESSION.length > 88) {
  console.error(`gate: ${CONFESSION.length} chars, need 1-88`);
  process.exit(1);
}
if (words.length < 1 || words.length > 5) {
  console.error(`gate: ${words.length} words, need 1-5`);
  process.exit(1);
}
if (!CONFESSION.trim() || CONFESSION.includes("\n")) {
  console.error("gate: entry must be one non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), CONFESSION, "utf8");
console.log(`wrote ${CONFESSION.length} chars, ${words.length} words`);
