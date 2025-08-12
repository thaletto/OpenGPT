import type { DataPart } from '@/ai/messages/data-parts'
import type { DataUIPart } from 'ai'
import { create } from 'zustand'

export function useDataStateMapper() {
  return (data: DataUIPart<DataPart>) => {
    // No sandbox-related data handling needed anymore - function kept for compatibility
    return
  }
}
