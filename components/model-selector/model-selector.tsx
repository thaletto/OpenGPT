"use client";

import { Loader2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { getSupportedModels } from "@/functions/models";

interface Props {
  modelId: string;
  onModelChange: (modelId: string) => void;
}

export const ModelSelector = memo(function ModelSelector({
  modelId,
  onModelChange,
}: Props) {
  type DisplayModel = { id: string; label: string };

  const [models, setModels] = useState<DisplayModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [selectedModelId, setSelectedModelId] = useState<string>(modelId);

  const MAX_RETRIES = 3;
  const RETRY_DELAY_MILLIS = 5000;

  // Keep local state in sync if parent-controlled value changes (e.g., URL param)
  useEffect(() => {
    setSelectedModelId(modelId);
  }, [modelId]);

  const fetchModels = useCallback(
    async (isRetry: boolean = false) => {
      if (!isRetry) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const data = await getSupportedModels();
        const newModels: DisplayModel[] = data.models.map(
          (model: { id: string; name: string }) => ({
            id: model.id,
            label: model.name,
          })
        );
        setModels(newModels);
        setError(null);
        setRetryCount(0);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch models")
        );
        if (retryCount < MAX_RETRIES) {
          setRetryCount((prev) => prev + 1);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [retryCount]
  );

  useEffect(() => {
    if (retryCount === 0) {
      fetchModels(false);
    } else if (retryCount > 0 && retryCount <= MAX_RETRIES) {
      const timerId = setTimeout(() => {
        fetchModels(true);
      }, RETRY_DELAY_MILLIS);
      return () => clearTimeout(timerId);
    }
  }, [retryCount, fetchModels]);

  const isDisabled = useMemo(
    () => isLoading || !!error || !models?.length,
    [isLoading, error, models]
  );
  return (
    <Select
      value={selectedModelId}
      onValueChange={(newValue) => {
        setSelectedModelId(newValue);
        onModelChange(newValue);
      }}
      disabled={isDisabled}
    >
      <SelectTrigger className="w-[180px] bg-background">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2Icon className="h-4 w-4 animate-spin" />
            <span>Loading</span>
          </div>
        ) : error ? (
          <span className="text-red-500">Error</span>
        ) : !models?.length ? (
          <span>No models</span>
        ) : (
          <SelectValue placeholder="Select a model" />
        )}
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Models</SelectLabel>
          {models
            ?.sort((a, b) => a.label.localeCompare(b.label))
            .map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.label}
              </SelectItem>
            )) || []}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});
