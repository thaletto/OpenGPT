import type { OpenAIResponsesProviderOptions } from "@ai-sdk/openai";
import type { GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import type { AnthropicProviderOptions } from "@ai-sdk/anthropic";
import { createGatewayProvider, type GatewayModelId } from "@ai-sdk/gateway";
import type { LanguageModel } from "ai";

const gateway = createGatewayProvider();

interface AvailableModel {
  id: GatewayModelId | "openai/gpt-5";
  name: string;
}

export async function getAvailableModels(): Promise<AvailableModel[]> {
  const response = await gateway.getAvailableModels();
  return [...response.models.map(({ id, name }) => ({ id, name }))];
}

interface ModelOptions {
  model: LanguageModel;
  headers?: Record<string, string>;
  openAIProviderOptions?: OpenAIResponsesProviderOptions;
  googleProviderOptions?: GoogleGenerativeAIProviderOptions;
  anthropicProviderOptions?: AnthropicProviderOptions;
}

export function getModelOptions(modelId: string): ModelOptions {
  if (modelId === "openai/o4-mini") {
    return {
      model: modelId,
      openAIProviderOptions: {
        reasoningEffort: "low",
        reasoningSummary: "detailed",
      },
    };
  }

  if (modelId === "openai/gpt-5") {
    return {
      model: modelId,
      openAIProviderOptions: {
        include: ["reasoning.encrypted_content"],
        reasoningEffort: "low",
        reasoningSummary: "detailed",
      },
    };
  }

  return {
    model: modelId,
  };
}
