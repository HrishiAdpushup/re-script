import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export default async function OpenAILLMModifier(code, apiKey) {
  // https://platform.openai.com/docs/guides/gpt/function-calling

  const modelForFunctionCalling = new ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0.5,
    openAIApiKey: apiKey,
  }).bind({
    response_format: {
      type: "json_object",
    },
  });

  const result = await modelForFunctionCalling.invoke(
    [
      new SystemMessage(
        "You are a senior javascript programmer with experience in unminifying and deobfuscating code. Understand given code and rename all Javascript variables and functions to have descriptive names based on their usage in the code."
      ),
      new HumanMessage(code),
    ],
    {
      functions: [
        {
          name: "rebuild_minified_script",
          description: "Rename variables and function names in Javascript code",
          parameters: {
            type: "object",
            properties: {
              variablesAndFunctionsToRename: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description:
                        "The name of the variable or function name to rename",
                    },
                    newName: {
                      type: "string",
                      description:
                        "The new name of the variable or function name based on the context of the code",
                    },
                  },
                  required: ["name", "newName"],
                },
              },
            },
            required: ["variablesToRename"],
          },
        },
      ],
      // You can set the `function_call` arg to force the model to use a function
      function_call: {
        name: "rebuild_minified_script",
      },
    }
  );

  return result;
}
