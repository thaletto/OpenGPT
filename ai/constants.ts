import { type GatewayModelId } from '@ai-sdk/gateway'

export const DEFAULT_MODEL: GatewayModelId[number] = 'google/gemini-2.5-flash'

export const SUPPORTED_MODELS: GatewayModelId[] = [
  'amazon/nova-pro',
  'anthropic/claude-4-sonnet',
  'google/gemini-2.5-flash',
  'moonshotai/kimi-k2',
  'openai/gpt-4o',
  'openai/gpt-5',
  'openai/o4-mini',
  'xai/grok-3-fast',
]

export const TEST_PROMPTS = [
  'Create a bar chart of top 5 most populated countries',
  `Create a line chart of Ronaldo's goals in last 8 matches`,
]
