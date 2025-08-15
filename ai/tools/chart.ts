import z from "zod";
import { tool } from "ai";

export const lineChartSchema = z.object({
  title: z.string().describe("The title of the line chart"),
  data: z
    .array(
      z.object({
        label: z
          .string()
          .describe("The label for the data point on the X-axis"),
        value: z
          .number()
          .describe("The value for the data point on the Y-axis"),
      })
    )
    .describe("An array of data points for the line chart"),
});

export const barChartSchema = z.object({
  title: z.string().describe("The title of the bar chart"),
  data: z
    .array(
      z.object({
        category: z.string().describe("The category for the bar"),
        value: z.number().describe("The value for the bar"),
      })
    )
    .describe("An array of data points for the bar chart"),
});

const lineChartTool = tool({
  description: "Generates a line chart based on the provided data.",
  inputSchema: lineChartSchema,
  outputSchema: lineChartSchema,
  execute: async (input) => {
    return input;
  },
});

const barChartTool = tool({
  description: "Generates a bar chart based on the provided data.",
  inputSchema: barChartSchema,
  outputSchema: barChartSchema,
  execute: async (input) => {
    return input;
  },
});

export const chartTools = {
  lineChartTool,
  barChartTool,
};
