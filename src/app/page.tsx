"use client";

import { useState } from "react";
import { Input } from "antd";
import { sendMessage } from "@/utils";
import PromptResponse from "@/components/Prompt/prompt-response";

const { Search } = Input;

export default function Home() {
  const [output, setOutput] = useState("");
  const [error, setError] = useState<{ message: string } | null>();
  const [loading, setLoading] = useState(false);

  const onSearch = async (
    value: string,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>
      | undefined
  ) => {
    if (!value) {
      setError({ message: "Please enter a prompt" });
      return;
    }
    try {
      setLoading(true);
      const output = await sendMessage(value);
      setOutput(output);
    } catch (error: unknown) {
      if (error instanceof Error) setError({ message: error.message });
      setError({ message: "Something went wrong, please try again!" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col p-8 gap-8">
      <span className="text-lg font-bold">Your Tech Mentor</span>
      <div className="flex flex-col gap-8 px-4">
        <div className="flex flex-col justify-center">
          <Search
            status={error ? "error" : undefined}
            name="prompt"
            placeholder="Ask me anything tech!"
            onSearch={onSearch}
            allowClear
            onChange={() => {
              if (error) setError(null);
            }}
          />
          {error && error.message ? (
            <span className="text-red-500 text-sm">{error.message}</span>
          ) : null}
        </div>
        <PromptResponse output={output} isLoading={loading} />
      </div>
    </main>
  );
}
