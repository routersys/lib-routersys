import assert from "node:assert/strict";
import worker from "./index.js";

const request = (url, init) => worker.fetch(new Request(url, init));

const robots = await request("https://lib.routersys.com/robots.txt");
assert.equal(robots.status, 200);
const robotsText = await robots.text();
assert.match(robotsText, /Sitemap: https:\/\/lib\.routersys\.com\/WorldNet\/sitemap\.xml/);
assert.match(robotsText, /Sitemap: https:\/\/lib\.routersys\.com\/R128Net\/sitemap\.xml/);

const home = await request("https://lib.routersys.com/");
assert.equal(home.status, 302);
assert.equal(home.headers.get("location"), "https://lib.routersys.com/WorldNet/");

for (const name of ["WorldNet", "R128Net"]) {
  const bare = await request(`https://lib.routersys.com/${name}`);
  assert.equal(bare.status, 301);
  assert.equal(bare.headers.get("location"), `https://lib.routersys.com/${name}/`);
}

const insecure = await request("http://lib.routersys.com/R128Net/demo/");
assert.equal(insecure.status, 301);
assert.equal(insecure.headers.get("location"), "https://lib.routersys.com/R128Net/demo/");

const unknown = await request("https://lib.routersys.com/Other/");
assert.equal(unknown.status, 404);

const post = await request("https://lib.routersys.com/R128Net/", { method: "POST" });
assert.equal(post.status, 405);

console.log("worker routing: ok");
