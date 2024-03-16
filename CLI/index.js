import { input, select, password } from "@inquirer/prompts";
import ora from "ora";
import fs from "fs";
import chalk from "chalk";
import rescript from "./lib/rescript.js";

const log = console.log;

async function main() {
  log(chalk.hex("#DEADED").bgWhite.bold("re-Script CLI"));
  log(
    chalk.hex("#DEADED").gray("A CLI to unminify your JS code using AI models.")
  );

  const fileLocation = await input({
    type: "input",
    name: "file location",
    message: "Enter your minified JS file location",
  });

  const model = await select({
    type: "select",
    name: "model",
    message: "Select the AI model to use",
    choices: ["claude", "openAI"],
  });

  const apiKey = await password({
    type: "password",
    name: "apiKey",
    message: "Enter your model API key",
  });

  if (!fs.existsSync(fileLocation)) {
    log(chalk.red.bold("File not found at the specified location"));
    return;
  }

  ora("Re-minifying code...").start();
  const code = fs.readFileSync(fileLocation, "utf8");
  const result = await rescript(code, model, apiKey);
  const outFileLocation = fileLocation.replace(
    ".js",
    `_reScript${Date.now().toPrecision(4)}.js`
  );
  fs.writeFileSync(outFileLocation, result);
  ora("Re-minifying code...").succeed();
}
