import assert from "node:assert/strict";
import worker from "./index.js";
import projects from "./projects.js";
import { render, update } from "../scripts/register.mjs";

const request = (url, init) => worker.fetch(new Request(url, init));

assert.ok(projects.length > 0, "プロジェクトの一覧が空です");

const robots = await request("https://lib.routersys.com/robots.txt");
assert.equal(robots.status, 200);
const robotsText = await robots.text();
for (const name of projects) {
  assert.ok(robotsText.includes(`Sitemap: https://lib.routersys.com/${name}/sitemap.xml\n`), `robots.txt に ${name} がありません`);
}

const home = await request("https://lib.routersys.com/");
assert.equal(home.status, 302);
assert.equal(home.headers.get("location"), `https://lib.routersys.com/${projects[0]}/`);

for (const name of projects) {
  const bare = await request(`https://lib.routersys.com/${name}`);
  assert.equal(bare.status, 301);
  assert.equal(bare.headers.get("location"), `https://lib.routersys.com/${name}/`);

  const insecure = await request(`http://lib.routersys.com/${name}/demo/`);
  assert.equal(insecure.status, 301);
  assert.equal(insecure.headers.get("location"), `https://lib.routersys.com/${name}/demo/`);
}

const unknown = await request("https://lib.routersys.com/NotListed/");
assert.equal(unknown.status, 404);

const post = await request(`https://lib.routersys.com/${projects[0]}/`, { method: "POST" });
assert.equal(post.status, 405);

assert.deepEqual(update(["A"], "B", "追加"), { projects: ["A", "B"], changed: true });
assert.deepEqual(update(["A", "B"], "B", "追加"), { projects: ["A", "B"], changed: false });
assert.deepEqual(update(["A", "B"], "A", "削除"), { projects: ["B"], changed: true });
assert.deepEqual(update(["A"], "B", "削除"), { projects: ["A"], changed: false });
assert.throws(() => update(["A"], "../x", "追加"));
assert.throws(() => update(["A"], "robots.txt", "追加"));
assert.throws(() => update(["A"], "B", "変更"));
assert.equal(render(["A", "B"]), 'export default [\n  "A",\n  "B",\n];\n');

console.log("worker routing: ok");
