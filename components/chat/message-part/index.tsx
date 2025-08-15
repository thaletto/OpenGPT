import type { Metadata } from "@/ai/messages/metadata";
import type { ToolSet } from "@/ai/tools";
import type { UIMessage } from "ai";

import { Reasoning } from "./reasoning";
import { Text } from "./text";
import {ToolChart } from "./chart-response";

interface Props {
  part: UIMessage<Metadata, ToolSet>["parts"][number];
}

export function MessagePart({ part }: Props) {
  console.log(part.type)
  if (part.type === "reasoning") {
    return <Reasoning part={part} />;
  } else if (part.type === "text") {
    return <Text part={part} />;
  } else if (part.type === "tool-barChartTool" || part.type === "tool-lineChartTool") {
    return <ToolChart toolCall={part} />;
  }
}
