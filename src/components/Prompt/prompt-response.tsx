"use client";

import { Skeleton } from "antd";
import Markdown from "react-markdown";
import "./styles.css";

interface PromptResponseProps {
  output: string;
  isLoading: boolean;
}
export default function PromptResponse({
  output,
  isLoading,
}: PromptResponseProps) {
  if (isLoading)
    return (
      <div>
        <Skeleton />
      </div>
    );
  return (
    <div
      className={`markdown-body overflow-auto max-h-[75vh] p-4 ${
        output ? "border" : ""
      }`}
    >
      <Markdown>{`${output}`}</Markdown>
    </div>
  );
}
