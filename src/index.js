#!/usr/bin/env node
import inquirer from "inquirer";
import gitPullOrClone from "git-pull-or-clone";
import * as path from "node:path";
import * as os from "node:os";

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}

async function main() {
  const HOMEDIR = os.homedir();
  const GITHUBDIR = path.resolve(HOMEDIR, "github");

  const res = await inquirer.prompt({
    type: "input",
    name: "repo",
    message: `Enter the user/repo`,
    validate: (val) => {
      const parts = val.split("/");
      if (parts.length === 2) {
        return true;
      }
      if (parts.length === 1) {
        return "Missing repo name !";
      }
      return `Invalis string`;
    },
  });

  const [user, repo] = res.repo.split("/");

  const url = `git@github.com:${user}/${repo}.git`;
  const repoPath = path.resolve(GITHUBDIR, user, repo);

  console.log(`Clonning ${url}\n    into ${repoPath}`);
  await gitPullOrCloneAsync(url, repoPath);
  console.log(`Repo cloned in ${repoPath}`);

  process.exit();
}

function gitPullOrCloneAsync(url, path) {
  return new Promise((resolve, reject) => {
    gitPullOrClone(url, path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
