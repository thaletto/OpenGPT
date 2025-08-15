import type { InferUITools } from "ai";
import { chartTools } from "./chart";

export function tools() {
  return {
    ...chartTools,
  };
}

export type ToolSet = InferUITools<ReturnType<typeof tools>>;
