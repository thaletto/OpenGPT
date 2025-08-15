import type { Metadata } from "@/ai/messages/metadata";
import type { UIMessage } from "ai";
import type { ToolSet } from "@/ai/tools";

export type ChatUIMessage = UIMessage<Metadata, ToolSet>;
