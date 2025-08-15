import { VercelDashed } from '@/components/icons/vercel-dashed'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export async function Header({ className }: Props) {
  return (
    <header className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center">
        <VercelDashed className="ml-1 md:ml-2.5 mr-1.5" />
        <span className="hidden md:inline text-sm uppercase font-bold tracking-wide">
          mathGPT
        </span>
      </div>
    </header>
  )
}
