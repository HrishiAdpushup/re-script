import babelTransform from "./modifiers/bableTransform.js";
import prettier from "./modifiers/prettier.js";
import webcrack from "./modifiers/webcrack.js";

const Modifiers = [babelTransform, prettier];
export default async function rescript(code) {
  const crackedCodeInstance = await webcrack(code);
  const crackedCode = crackedCodeInstance.code;

  console.log("====================================");
  console.log(crackedCode);
  console.log("====================================");

  const formattedCode = await Modifiers.reduce(
    (codeModifier, next) => codeModifier.then(next),
    Promise.resolve(crackedCode)
  );
  return formattedCode;
}
