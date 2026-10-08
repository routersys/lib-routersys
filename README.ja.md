# lib-routersys

[English](README.md) | 日本語

`lib.routersys.com`の入口として動くCloudflare Workerです。各ライブラリのサイトはGitHub Pagesで公開しており、このWorkerが`https://ymm4.routersys.com/<プロジェクト>/`の内容を`https://lib.routersys.com/<プロジェクト>/`として返します。httpはhttpsへ転送し、`robots.txt`には全プロジェクトのサイトマップを載せます。

| プロジェクト | サイト |
|---|---|
| [WorldNet](https://github.com/routersys/WorldNet) | https://lib.routersys.com/WorldNet/ |
| [R128Net](https://github.com/routersys/R128Net) | https://lib.routersys.com/R128Net/ |

## 構成

| ファイル | 内容 |
|---|---|
| `worker/index.js` | 振り分けの処理。対象のプロジェクトは`PROJECTS`に並べています |
| `worker/test.mjs` | 振り分けの試験。ネットワークは使いません |
| `worker/wrangler.toml` | Workerの名前とルートの設定 |
| `.github/workflows/deploy.yml` | Workerをデプロイするワークフロー。手動で実行します |

## ライセンス

MITライセンスです。[LICENSE.txt](LICENSE.txt)を参照してください。
