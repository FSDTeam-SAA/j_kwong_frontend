import { useEffect, useState } from "react";
import { NumberTicker } from "../magicui/number-ticker";
import axios from "axios";

export default function StatsBar() {
  const [stats, setStats] = useState({ blogs: 0, categories: 0, readers: 54 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`),
        ]);

        setStats({
          blogs: blogsRes.data.pagination.totalBlogs,
          categories: categoriesRes.data.data.length,
          readers: 54, // Keep it static for now
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-[770px] bg-white backdrop-blur-[70px] shadow-md py-8 px-4 rounded-[12px] w-[98%] lg:w-full mx-auto">
      <div className="grid grid-cols-3 gap-8 text-center">
        <div className="space-y-2">
          <NumberTicker
            value={stats.categories}
            className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold"
          />
          <div className="text-textPrimary text-lg md:text-xl lg:text-2xl font-semibold">
            Categories
            <br /> Explored
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
          </div>
        </div>
      </div>
    </div>
  );
}
