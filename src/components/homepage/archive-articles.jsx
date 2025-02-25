"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import Link from "next/link";
import ArticleGrid from "../shared/articles-grid";

export default function ArchiveArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs`,
          {
            params: { limit: 6 },
          }
        );
        setArticles(response.data.data); // Fix: Access 'data' instead of 'blogs'
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="container px-4 py-5 md:py-10">
      <div className="flex justify-between items-center">
        <div />
        <div className="translate-x-[55px]">
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="w-2 h-8 bg-primary"></div>
            <h2 className="text-textPrimary text-[24px] md:text-[32px] font-semibold">
              All Articles
            </h2>
          </div>
        </div>
        <Link href="/article" className="mb-7 md:mb-10">
          <Button
            variant="custom"
            className="text-primary underline hover:text-primary/80 text-[16px]"
          >
            See more
          </Button>
        </Link>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading articles...</p>
      ) : (
        <ArticleGrid articles={articles} />
      )}
    </div>
  );
}
