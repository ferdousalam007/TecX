/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

type PaymentChartProps = {
  paymentChartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
};

const PaymentSummery = ({ paymentChartData }: PaymentChartProps) => {

  const chartData = paymentChartData?.labels?.map((label, index) => ({
    date: label,
    totalAmount: paymentChartData.datasets[0].data[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={chartData} 
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
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
        <Bar dataKey="totalAmount" fill="#ff7f0e">
          {chartData?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index % 2 === 0 ? "#ff7f0e" : "#82ca9d"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PaymentSummery;
