"use client";

import { useState, useMemo } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

export default function HomePage() {
  const [inputCode, setInputCode] = useState("test data");
  const [loading, setLoading] = useState(false);
  const [outputCode, setOutputCode] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [model, setModel] = useState(new Set(["Select Model"]));

  const selectedModel = useMemo(
    () => Array.from(model).join(", ").replaceAll("_", " "),
    [model],
  );

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/unminify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          code: inputCode,
          apiKey,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const code: { data: string } = await res.json();
      setOutputCode(code.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] ">
      <div className="flex flex-col items-center justify-center gap-8 py-8 md:gap-16 md:pb-16 xl:pb-24">
        <div className="mt-2 flex max-w-4xl items-center justify-between gap-x-5">
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  {selectedModel}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={model}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
                onSelectionChange={(keys: any) => setModel(new Set(keys))}
              >
                <DropdownItem key="openAI">OpenAI</DropdownItem>
                <DropdownItem key="claude">Claude</DropdownItem>
                <DropdownItem key="gemini">Gemini</DropdownItem>
                <DropdownItem key="local">Local</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <Input
            type="text"
            variant="flat"
            placeholder="Enter your api key"
            onValueChange={setApiKey}
            size="md"
          />

          <div>
            <Button
              variant="flat"
              onClick={handleTranslate}
              isLoading={loading}
            >
              {loading ? "UnMinifying" : "UnMinify"}
            </Button>
          </div>
        </div>

        <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">Input</div>

            <CodeBlock
              code={inputCode}
              editable={!loading}
              onChange={(value) => {
                setInputCode(value);
              }}
            />
          </div>
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">Output</div>

            <CodeBlock code={outputCode} />
          </div>
        </div>
      </div>
    </main>
  );
}
