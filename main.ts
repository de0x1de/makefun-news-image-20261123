// news-image-20261123 entry program.
// Copies the bundled front-page image to the output location.
// The image bytes are fixed in the repository, so repeated runs
// always write exactly the same file, byte for byte.
import { copyFileSync, statSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dst = join(outDir, "entry.png");

const LIMIT = 1024 * 1024;
const size = statSync(src).size;
if (size > LIMIT) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
console.log(`wrote ${dst} (${size} bytes)`);
