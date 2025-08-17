import { Action, Actions } from "@/components/ai-elements/actions";
import { RefreshCcw, Copy } from "lucide-react";

interface Props {
  className?: string;
  regenerate?: () => Promise<void>;
  copyContent?: string;
  size?: number;
}

export function ActionBar({
  className,
  regenerate,
  copyContent,
  size = 3,
}: Props) {
  return (
    <Actions className={className}>
      {regenerate && (
        <Action label="Retry" onClick={() => regenerate}>
          <RefreshCcw size={size} />
        </Action>
      )}
      {copyContent && (
        <Action
          label="Copy"
          onClick={() => navigator.clipboard.writeText(copyContent)}
        >
          <Copy size={size} />
        </Action>
      )}
    </Actions>
  );
}
