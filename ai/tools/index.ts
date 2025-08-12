import type { InferUITools, UIMessage, UIMessageStreamWriter } from 'ai'

interface Params {
  modelId: string
  writer: UIMessageStreamWriter<UIMessage<never>>
}

export function tools({ modelId, writer }: Params) {
  return {
    // All sandbox-related tools have been removed
  }
}

export type ToolSet = InferUITools<ReturnType<typeof tools>>
