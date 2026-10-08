# lib-routersys

[English](README.md) | 日本語

`lib.routersys.com`の入口として動くCloudflare Workerです。各ライブラリのサイトはGitHub Pagesで公開しており、このWorkerが`https://ymm4.routersys.com/<プロジェクト>/`の内容を`https://lib.routersys.com/<プロジェクト>/`として返します。httpはhttpsへ転送し、`robots.txt`には全プロジェクトのサイトマップを載せます。対象のプロジェクトは、`worker/projects.js`の一覧のとおりです。

## 構成

| ファイル | 内容 |
|---|---|
| `worker/index.js` | 振り分けの処理 |
| `worker/projects.js` | 振り分けの対象にするプロジェクトの一覧 |
| `worker/test.mjs` | 振り分けの試験。ネットワークは使いません |
| `worker/wrangler.toml` | Workerの名前とルートの設定 |
| `scripts/register.mjs` | 一覧へプロジェクトを追加し、または削除する処理 |
| `.github/workflows/deploy.yml` | Workerをデプロイするワークフロー。手動で実行し、入力欄にプロジェクト名を書くと、先に一覧へ追加します |

## ライセンス

MITライセンスです。[LICENSE.txt](LICENSE.txt)を参照してください。
