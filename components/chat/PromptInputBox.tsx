import {
  PromptInput,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ai-elements/prompt-input";
import { cn } from "@/lib/utils";
import { AvailableModel } from "@/types/models";
import type { ChatStatus } from "ai";

interface Props {
    handleSubmit: () => void;
    className?: string;
    input: string;
    setInput: (value: string) => void;
    modelId: string;
    setModelId: (value: string) => void;
    models: AvailableModel[];
    DEFAULT_MODEL: string;
    status: ChatStatus;
  }
  

export function PromptInputBox({
  handleSubmit,
  className,
  input,
  setInput,
  modelId,
  setModelId,
  models,
  DEFAULT_MODEL,
  status
}: Props) {
  return (
    <PromptInput
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={cn(className, "relative")}
    >
      <PromptInputTextarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <PromptInputToolbar className="border-t border-border">
        <PromptInputModelSelect
          value={modelId}
          onValueChange={(value) => setModelId(value)}
        >
          <PromptInputModelSelectTrigger>
            <PromptInputModelSelectValue defaultValue={DEFAULT_MODEL} />
          </PromptInputModelSelectTrigger>
          <PromptInputModelSelectContent>
            {models.map((model) => (
              <PromptInputModelSelectItem key={model.id} value={model.id}>
                {model.name}
              </PromptInputModelSelectItem>
            ))}
          </PromptInputModelSelectContent>
        </PromptInputModelSelect>
        <PromptInputSubmit className="absolute right-1 bottom-1" disabled={false} status={status}/>
      </PromptInputToolbar>
    </PromptInput>
  );
}
