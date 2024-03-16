import { ChatAnthropic } from "@langchain/anthropic";

export default async function AnthropicLLMModifier(code, apiKey) {
  const anthropicModel = new ChatAnthropic({
    modelName: "claude-3-sonnet-20240229",
    anthropicApiKey: apiKey,
  });
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a senior javascript programmer with experience in unminifying and deobfuscating code. Understand given code and rename all Javascript variables and functions to have descriptive names based on their usage in the code.",
    ],
    ["user", "Rename this code :  {input}"],
  ]);
  const chain = prompt.pipe(anthropicModel);

  await chain.invoke({ input: code });

  const result = await anthropic.parse(code);
  return result;
}
