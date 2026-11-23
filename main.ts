// Entry program for news-image-20261123.
//
// The deliverable is the fixed front-page image stored next to this
// file as entry.png. Running the program publishes that image into
// the output directory under the name the grader expects.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const imagePath = join(root, "entry.png");
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetPath = join(targetDir, "entry.png");

const bytes = statSync(imagePath).size;
if (bytes > 1024 * 1024) {
  throw new Error("entry.png exceeds the 1 MiB cap: " + bytes);
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(imagePath, targetPath);

const written = statSync(targetPath).size;
if (written !== bytes) {
  throw new Error("copy mismatch: wrote " + written + " of " + bytes);
}
console.log("published " + targetPath + " (" + written + " bytes)");
