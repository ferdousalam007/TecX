/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type PostSummeryChartProps = {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
};


const getBarColor = (label: string) => {
  const colorMap: { [key: string]: string } = {
    Posts: "#1f77b4", 
    Views: "#ff7f0e", 
    Comments: "#2ca02c", 
    Upvotes: "#d62728", 
  };
  return colorMap[label] || "#8b5cf6"; 
};


const transformChartData = (chartData: PostSummeryChartProps["chartData"]) => {
  return chartData.labels.map((label, index) => {
    const row: any = { label };
    chartData.datasets.forEach((dataset) => {
      row[dataset.label] = dataset.data[index];
    });
    return row;
  });
};

const PostSummeryChart = ({ chartData }: PostSummeryChartProps) => {
  const transformedData = transformChartData(chartData); 

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={transformedData}
        margin={{
          right: 30,
        }}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "8px",
            padding: "10px",
          }}
        />
        <Legend />
        {chartData.datasets.map((dataset) => (
          <Bar
            key={dataset.label}
            dataKey={dataset.label}
            fill={getBarColor(dataset.label)}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PostSummeryChart;
