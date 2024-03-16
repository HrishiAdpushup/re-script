"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const LLMs = [
  {
    value: "openAI",
    label: "Open AI",
  },
  {
    value: "claude",
    label: "Claude",
  },
  {
    value: "gemini",
    label: "Gemini",
  },
  {
    value: "local",
    label: "Local",
  },
];

type ComboboxProps = {
  onValueChange: (value: unknown) => void;
};

export function Combobox({ onValueChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? LLMs.find((LLM) => LLM.value === value)?.label
            : "Select AI Model..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search AI Models..." />
          <CommandEmpty>No AI Model found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {LLMs.map((llm) => (
                <CommandItem
                  key={llm.value}
                  value={llm.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === llm.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {llm.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
