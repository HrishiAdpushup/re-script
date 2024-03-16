"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
export default function HomePage() {
  const [inputCode, setInputCode] = useState("test data");
  const [loading, setLoading] = useState(false);
  const [hasTranslated, setHasTranslated] = useState(false);
  const [outputCode, setOutputCode] = useState("");

  const [model, setModel] = useState("base");
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
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const code: { data: string } = await res.json();
      setOutputCode(code.data);
      setHasTranslated(true);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] ">
      <div className="flex flex-col items-center justify-center gap-8 py-8 md:gap-16 md:pb-16 xl:pb-24">
        <div className="mt-2 flex items-center space-x-2">
          {/* <ModelSelect model={model} onChange={(value) => setModel(value)} /> */}

          <button
            className="w-[140px] cursor-pointer rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700"
            onClick={() => handleTranslate()}
            disabled={loading}
          >
            {loading ? "Automagically rebuilding script..." : "UnMinify"}
          </button>
        </div>

        <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">Input</div>

            <CodeBlock
              code={inputCode}
              editable={!loading}
              onChange={(value) => {
                setInputCode(value);
                setHasTranslated(false);
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
