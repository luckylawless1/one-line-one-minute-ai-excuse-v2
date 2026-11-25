// One Line, One Minute: The Funniest AI Excuse (v2)
// Writes one funny excuse line to /output/entry.txt (1-200 chars, single line).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I hallucinated a finished version so convincingly that I took the afternoon off to celebrate it.";

// Gate validation (competition rules: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space, single line).
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");

// Read back and verify: what landed on disk must be exactly the line plus
// one trailing newline, so a silent write fault can never pass the gate.
import { readFileSync } from "node:fs";
const written = readFileSync(outPath, "utf8");
if (written !== LINE + "\n") {
  throw new Error(`verification failed: entry.txt does not match the line`);
}
console.log(`wrote ${LINE.length} chars to ${outPath} (verified)`);
