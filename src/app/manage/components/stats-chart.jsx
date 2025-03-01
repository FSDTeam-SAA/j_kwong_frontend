"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Format date from "YYYY-MM" to "MMM YYYY"
const formatDate = (dateStr) => {
  const [year, month] = dateStr.split("-");
  const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Transform API data to chart format
const transformData = (apiData) => {
  return Object.entries(apiData)
    .map(([date, count]) => ({
      date: formatDate(date),
      count,
    }))
    .sort((a, b) => {
      // Sort by date
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
};

export default function BlogStatsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats/blogs-by-month`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        if (result.status && result.data) {
          setData(transformData(result.data));
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Error fetching blog stats:", err);
        setError("Could not load blog statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Blog Posts</CardTitle>
          <CardDescription>Loading statistics...</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="animate-pulse">Loading chart data...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Blog Posts</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-destructive">
          {error}
        </CardContent>
      </Card>
    );
  }

  // If we have no data points, show a message
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Blog Posts</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          No blog statistics available for the selected period.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Blog Posts</CardTitle>
        <CardDescription>
          Number of blog posts published each month
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer
          config={{
            blogCount: {
              label: "Article Posts",
              color: "#3DBC12", // Green color
            },
          }}
          className="h-[400px]  w-full "
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              domain={[0, "dataMax + 2"]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="count"
              name="blogCount"
              fill="var(--color-blogCount)"
              radius={[4, 4, 0, 0]} // Rounded top corners
              barSize={40}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
