"use client";
import { useEffect, useState } from "react";
import { NumberTicker } from "../magicui/number-ticker";
import axios from "axios";

export default function StatsBar() {
  const [stats, setStats] = useState({ blogs: 0, categories: 0, readers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats`
        );

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs?publish=true`
        );

        setStats({
          blogs: res.data.pagination.totalBlogs,
          categories: response.data.data.totalCategory,
          readers: response.data.data.totalViews,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="max-w-[770px] bg-white backdrop-blur-[70px] shadow-md py-8 px-4 rounded-[12px] w-[95%] lg:w-full mx-auto">
      <div className="grid grid-cols-3 gap-8 text-center">
        <div className="space-y-2">
          <NumberTicker
            value={stats.categories}
            className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold"
          />
          <div className="text-textPrimary text-lg md:text-xl lg:text-2xl font-semibold">
            Topics
            <br /> Covered
          </div>
        </div>
        <div className="space-y-2">
          <NumberTicker
            value={stats.blogs}
            className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold"
          />
          <div className="text-textPrimary text-lg md:text-xl lg:text-2xl font-semibold">
            Blogs
            <br />
            Published
          </div>
        </div>
        <div className="space-y-2">
          <NumberTicker
            value={stats.readers}
            className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold"
          />
          <div className="text-textPrimary text-lg md:text-xl lg:text-2xl font-semibold">
            Readers
            <br />
            Engaged
          </div>
        </div>
      </div>
    </div>
  );
}
