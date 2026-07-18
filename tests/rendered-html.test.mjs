import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("ships the complete Kazakh doula experience", async () => {
  const [page, layout, css] = await Promise.all([read("app/page.tsx"), read("app/layout.tsx"), read("app/globals.css")]);
  assert.match(layout, /<html lang="kk">/);
  assert.match(layout, /ProfessionalService/);
  assert.match(page, /Босануға сеніммен және тыныштықпен дайындалыңыз/);
  assert.match(page, /77013684924/);
  assert.match(page, /Доула медициналық маманды алмастырмайды/);
  assert.match(page, /hero-zhanar\.jpg/);
  assert.match(page, /images\.pexels\.com/);
  assert.match(page, /doula-support\.webp/);
  assert.doesNotMatch(page, /api\/content|overrides/);
  assert.match(css, /@media\(max-width:620px\)/);
  assert.match(css, /prefers-reduced-motion/);
});

test("keeps contact data out of a database", async () => {
  const contact = await read("app/api/contact/route.ts");
  assert.match(contact, /wa\.me/);
  assert.match(contact, /encodeURIComponent/);
});
