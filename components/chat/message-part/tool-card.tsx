import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart as BarChartIcon, LineChart } from "lucide-react";
import {
  Bar,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  BarChart as RechartsBarChart,
} from "recharts";

import type { UIMessage } from "ai";
import type { ToolSet } from "@/ai/tools";
import { lineChartSchema, barChartSchema } from "@/ai/tools/chart";
import { z } from "zod";

interface ToolCardProps {
  toolCall: UIMessage<any, ToolSet>["parts"][number];
}

export function ToolCard({ toolCall }: ToolCardProps) {
  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  };

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
        {toolName === "lineChartTool" && <LineChart className="h-4 w-4" />}
        {toolName === "barChartTool" && <BarChartIcon className="h-4 w-4" />}
        <CardTitle>{typedToolCall.output.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {toolName === "lineChartTool" && (
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px] w-full max-w-xl max-h-[400px]"
          >
            <RechartsLineChart
              accessibilityLayer
              data={typedToolCall.output.data}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                type="category"
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
                type="natural"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-value)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </RechartsLineChart>
          </ChartContainer>
        )}
        {toolName === "barChartTool" && (
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px] w-full max-w-xl max-h-[400px]"
          >
            <RechartsBarChart
              accessibilityLayer
              data={typedToolCall.output.data}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={8} />
            </RechartsBarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
