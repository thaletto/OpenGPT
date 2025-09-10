import { type GatewayModelId } from "@ai-sdk/gateway";

export const DEFAULT_MODEL: GatewayModelId[number] = "openai/gpt-5-mini";

export const SUPPORTED_MODELS: GatewayModelId[] = [
  "google/gemini-2.5-flash",
  "openai/gpt-5-mini",
  "openai/gpt-5-nano",
  "openai/gpt-oss-120b",
  "openai/o4-mini",
  "openai/o3",
  "openai/o3-mini",
  "moonshotai/kimi-k2",
  "deepseek/deepseek-r1",
  "zai/glm-4.5",
  "perplexity/sonar",
  "alibaba/qwen-3-235b",
  "alibaba/qwen3-coder"
];

export const SUGGESTIONS = [
  "Help me draft an email.",
  "Suggest a diet plan for bodybuilding",
  "Plan a short weekend activity.",
];
