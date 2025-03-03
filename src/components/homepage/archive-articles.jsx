"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import Link from "next/link";
import ArticleGrid from "../shared/articles-grid";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ArchiveArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start({ x: 5 });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start({ x: 0 });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs`,
          {
            params: { limit: 12, publish: true },
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
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-2 h-8 bg-primary"></div>
          <h2 className="text-textPrimary text-[24px] md:text-[32px] font-semibold ">
            All Articles
          </h2>
        </div>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading articles...</p>
      ) : (
        <ArticleGrid articles={articles} />
      )}
      <div className="flex justify-center">
        <Link href="/article">
          <Button
            className="bg-primary text-white hover:bg-primary/90 text-[19px] px-6 py-5  rounded-md mt-6"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
          >
            <span>Browse More Articles</span>
            <motion.div
              className="inline-block ml-2"
              animate={controls}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </Button>
        </Link>
      </div>
    </div>
  );
}
