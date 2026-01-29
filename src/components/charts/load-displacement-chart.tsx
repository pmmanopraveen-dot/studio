"use client"

import type { ValidationDataPoint } from "@/types";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface LoadDisplacementChartProps {
    labData: ValidationDataPoint[];
    feaData: ValidationDataPoint[];
}

const chartConfig = {
    lab: {
      label: "Lab Results",
      color: "hsl(var(--primary))",
    },
    fea: {
      label: "FEA Simulation",
      color: "hsl(var(--accent))",
    },
};

const LoadDisplacementChart = ({ labData, feaData }: LoadDisplacementChartProps) => {
    const combinedData = labData.map((labPoint, index) => ({
        displacement: labPoint.displacement,
        lab: labPoint.load,
        fea: feaData[index]?.load ?? null,
    })).sort((a, b) => a.displacement - b.displacement);

    return (
        <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer>
                <LineChart data={combinedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="displacement"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={(value) => value.toFixed(1)}
                        label={{ value: "Displacement (mm)", position: "insideBottom", offset: -5 }}
                        stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                        tickFormatter={(value) => value.toFixed(1)}
                        label={{ value: "Load (kN)", angle: -90, position: "insideLeft", offset: 10 }}
                        stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip
                        content={<ChartTooltipContent
                            indicator="dot"
                            labelFormatter={(label, payload) => `Disp: ${label} mm`}
                        />}
                    />
                    <Legend />
                    <Line
                        dataKey="lab"
                        type="monotone"
                        stroke="var(--color-lab)"
                        strokeWidth={2}
                        dot={false}
                        name="Lab Results"
                    />
                    <Line
                        dataKey="fea"
                        type="monotone"
                        stroke="var(--color-fea)"
                        strokeWidth={2}
                        dot={false}
                        name="FEA Simulation"
                        strokeDasharray="5 5"
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default LoadDisplacementChart;
