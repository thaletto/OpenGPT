import type { Metadata } from '@/ai/messages/metadata'
import type { DataPart } from '@/ai/messages/data-parts'
import type { ToolSet } from '@/ai/tools'
import type { UIMessage } from 'ai'

import { Reasoning } from './reasoning'
import { Text } from './text'

interface Props {
  part: UIMessage<Metadata, DataPart, ToolSet>['parts'][number]
}

export function MessagePart({ part }: Props) {
  if (part.type === 'reasoning') {
    return <Reasoning part={part} />
  } else if (part.type === 'text') {
    return <Text part={part} />
  } else if (part.type) {
    // console.log(JSON.stringify(part, undefined, 4));
  }
}
