# lib-routersys

English | [日本語](README.ja.md)

The Cloudflare Worker behind `lib.routersys.com`. The site of each library is published on GitHub Pages, and this Worker returns the content of `https://ymm4.routersys.com/<Project>/` as `https://lib.routersys.com/<Project>/`. It redirects http to https and serves a `robots.txt` that lists the sitemap of every project. The projects it serves are listed in `worker/projects.js`.

## Layout

| File | Contents |
|---|---|
| `worker/index.js` | The routing |
| `worker/projects.js` | The list of projects the routing serves |
| `worker/test.mjs` | Tests of the routing, which need no network |
| `worker/wrangler.toml` | The name and the route of the Worker |
| `scripts/register.mjs` | Adds a project to the list or removes one |
| `.github/workflows/deploy.yml` | The workflow that deploys the Worker. It runs by hand, and a project name entered in its input is added to the list first |

## License

MIT License. See [LICENSE.txt](LICENSE.txt).
