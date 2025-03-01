"use client";
import ArticleGrid from "@/components/shared/articles-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

const RecentPost = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs`,
          {
            params: { limit: 3, publish: true },
          }
        );
        setArticles(response.data.data); // Fix: Access 'data' instead of 'blogs'
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);
  return (
    <div className="container">
      <h1 className="text-4xl font-light text-textPrimary flex items-center justify-center my-[30px] lg:my-[50px]">
        <div className="h-8 w-2 bg-primary mr-2"></div>
        Recent Posts
      </h1>
      <ArticleGrid articles={articles} />
    </div>
  );
};

export default RecentPost;
