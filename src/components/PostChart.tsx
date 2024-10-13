import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

type PostChartProps = {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
};

const PostChart = ({ chartData }: PostChartProps) => {
  return (
    <Bar
      data={chartData}
      options={{
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Actions",
            },
            ticks: {
              callback: (value) => (Number.isInteger(value) ? value : ""),
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
        },
      }}
    />
  );
};

export default PostChart;
