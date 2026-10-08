import { appendFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import current from "../worker/projects.js";

const NAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/;
const RESERVED = ["robots.txt"];
const ADD = new Set(["add", "追加"]);
const REMOVE = new Set(["remove", "削除"]);

export function update(projects, name, operation) {
  if (!NAME.test(name) || RESERVED.includes(name)) {
    throw new Error(`プロジェクト名に使えない文字列です: ${name}`);
  }

  const present = projects.includes(name);
  if (ADD.has(operation)) {
    return present ? { projects, changed: false } : { projects: [...projects, name], changed: true };
  }

  if (REMOVE.has(operation)) {
    return present ? { projects: projects.filter((item) => item !== name), changed: true } : { projects, changed: false };
  }

  throw new Error(`未対応の操作です: ${operation}`);
}

export function render(projects) {
  return `export default [\n${projects.map((name) => `  ${JSON.stringify(name)},\n`).join("")}];\n`;
}

const report = (changed) => {
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
  }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [name = "", operation = "追加"] = process.argv.slice(2);
  if (name.trim() === "") {
    console.log("登録するプロジェクト名の入力はありません。");
    report(false);
  } else {
    const result = update(current, name.trim(), operation);
    if (result.changed) {
      writeFileSync(new URL("../worker/projects.js", import.meta.url), render(result.projects));
    }

    console.log(result.changed ? `一覧を更新しました: ${result.projects.join(", ")}` : "一覧は変わりません。");
    report(result.changed);
  }
}
