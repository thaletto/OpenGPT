import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Bar, CartesianGrid, Line, LineChart, XAxis, BarChart } from "recharts";

import type { UIMessage } from "ai";
import type { ToolSet } from "@/ai/tools";
import { lineChartSchema, barChartSchema } from "@/ai/tools/chart";
import { z } from "zod";

interface ToolCardProps {
  toolCall: UIMessage<any, ToolSet>["parts"][number];
}

const chartConfig = {
  default: {
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ToolChart({ toolCall }: ToolCardProps) {
  // Type guard to ensure toolCall has the 'output' property and is a chart tool
  if (
    (toolCall.type !== "tool-lineChartTool" &&
      toolCall.type !== "tool-barChartTool") ||
    toolCall.state !== "output-available"
  ) {
    return null;
  }

  // Refine the type of toolCall after the type guard
  const typedToolCall = toolCall as typeof toolCall & {
    output: z.infer<typeof lineChartSchema> | z.infer<typeof barChartSchema>;
  };

  const toolName = typedToolCall.type.replace("tool-", "");
  console.log(typedToolCall);

  return (
    <Card>
      <CardHeader className="flex-row items-center space-x-2">
        <CardTitle>{typedToolCall.output.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {toolName === "lineChartTool" && (
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px] w-full max-w-xl max-h-[400px]"
          >
            <LineChart
              accessibilityLayer
              data={typedToolCall.output.data}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="value"
                type="linear"
                stroke="var(--color-default)"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        )}
        {toolName === "barChartTool" && (
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px] w-full max-w-xl max-h-[400px]"
          >
            <BarChart accessibilityLayer data={typedToolCall.output.data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="value" fill="var(--color-default)" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
