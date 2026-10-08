# lib-routersys

English | [日本語](README.ja.md)

The Cloudflare Worker behind `lib.routersys.com`. The site of each library is published on GitHub Pages, and this Worker returns the content of `https://ymm4.routersys.com/<Project>/` as `https://lib.routersys.com/<Project>/`. It redirects http to https and serves a `robots.txt` that lists the sitemap of every project.

| Project | Site |
|---|---|
| [WorldNet](https://github.com/routersys/WorldNet) | https://lib.routersys.com/WorldNet/ |
| [R128Net](https://github.com/routersys/R128Net) | https://lib.routersys.com/R128Net/ |

## Layout

| File | Contents |
|---|---|
| `worker/index.js` | The routing. The projects it serves are listed in `PROJECTS` |
| `worker/test.mjs` | Tests of the routing, which need no network |
| `worker/wrangler.toml` | The name and the route of the Worker |
| `.github/workflows/deploy.yml` | The workflow that deploys the Worker, started by hand |

## License

MIT License. See [LICENSE.txt](LICENSE.txt).
