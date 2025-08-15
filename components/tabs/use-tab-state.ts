import { useState } from 'react'

export function useTabState() {
  const [tabId, setTabId] = useState('chat')
  return [tabId, setTabId] as const
}
