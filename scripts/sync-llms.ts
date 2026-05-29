import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildLlmsFullTxt, buildLlmsTxt } from "../lib/llms-corpus";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

writeFileSync(resolve(root, "public/llms.txt"), buildLlmsTxt(), "utf8");
writeFileSync(resolve(root, "public/llms-full.txt"), buildLlmsFullTxt(), "utf8");

console.log("Synced public/llms.txt and public/llms-full.txt");
