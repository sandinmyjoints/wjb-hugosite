#!/usr/bin/env node
// One-shot migration: copy Hexo posts into Hugo content/posts/,
// stripping vestigial frontmatter keys. Filenames stay as YYYY-MM-DD-slug.md
// so Hugo's slug-from-filename matches the old Hexo URL structure.

import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, basename, extname } from "node:path";

const SRC = "/Users/william/scm/sandinmyjoints/williamjohnbert.com-hexo/source/_posts";
const DST = "/Users/william/scm/sandinmyjoints/wjb-hugosite/content/posts";

// Frontmatter keys to drop. Single-line keys only — handled with a regex.
const DROP_KEYS = ["layout", "comments", "wordpress_id"];

mkdirSync(DST, { recursive: true });

let migrated = 0;
let skipped = 0;

for (const name of readdirSync(SRC)) {
  const full = join(SRC, name);
  if (!statSync(full).isFile()) continue;
  const ext = extname(name).toLowerCase();
  if (ext !== ".md" && ext !== ".markdown") {
    console.log(`skip (not markdown): ${name}`);
    skipped++;
    continue;
  }

  const raw = readFileSync(full, "utf8");
  // Hexo accepts two frontmatter styles:
  //   1. ---\nKEY: VAL...\n---\nBODY  (standard)
  //   2. KEY: VAL...\n---\nBODY        (no opening fence — used in newer posts)
  const standard = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const lax = raw.match(/^([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const m = standard || lax;
  if (!m) {
    console.log(`skip (no frontmatter): ${name}`);
    skipped++;
    continue;
  }
  const [, fm, body] = m;

  // Drop unwanted single-line keys. Line-based so we don't eat the
  // continuation lines under "tags:" / "categories:".
  // Also:
  //  - normalize "YYYY-MM-DD HH:MM" dates → "YYYY-MM-DD HH:MM:00" (Hugo needs seconds)
  //  - convert Hexo's space-separated "tags: a b c" → YAML inline list "tags: [a, b, c]"
  const cleanedFm = fm
    .split(/\r?\n/)
    .filter((line) => !DROP_KEYS.some((k) => new RegExp(`^${k}\\s*:`).test(line)))
    .map((line) =>
      line.replace(/^(date\s*:\s*\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})\s*$/, "$1:00"),
    )
    .map((line) => {
      const m = line.match(/^(tags|categories)\s*:\s*(\S.*)$/);
      if (!m) return line;
      const [, key, val] = m;
      // Skip if it's already a flow-list ([...]) or a single bare value with no spaces.
      if (val.startsWith("[")) return line;
      const items = val.split(/\s+/).filter(Boolean);
      if (items.length <= 1) return line;
      return `${key}: [${items.map((i) => JSON.stringify(i)).join(", ")}]`;
    })
    .join("\n");

  const outName = basename(name, ext) + ".md";
  const outPath = join(DST, outName);
  writeFileSync(outPath, `---\n${cleanedFm}\n---\n${body}`);
  migrated++;
}

console.log(`\nmigrated ${migrated} posts → ${DST}`);
console.log(`skipped ${skipped}`);
