import { AvailableModel, ModelOptions } from "@/types/models";
import { createGatewayProvider } from "@ai-sdk/gateway";

const gateway = createGatewayProvider();

export async function getAvailableModels(): Promise<AvailableModel[]> {
  const response = await gateway.getAvailableModels();
  return [...response.models.map(({ id, name }) => ({ id, name }))];
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
