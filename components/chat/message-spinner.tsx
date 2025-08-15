import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'

export function MessageSpinner({ className }: { className?: string }) {
  return <Loader className={cn('opacity-60 animate-spin', className)} size={5} />
}
