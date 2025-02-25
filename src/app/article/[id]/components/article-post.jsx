"use client";

import Image from "next/image";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ArticlePost() {
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${params.id}`
        );
        setArticle(response.data.data);
      } catch (err) {
        setError("Failed to load article");
        console.error("Error fetching article:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || "Article not found"}</p>
      </div>
    );
  }

  // Format the date to be more readable
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="min-h-screen text-textPrimary">
      <div className="container mx-auto px-4 py-8">
        {/* Header Meta */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <span>Written by</span>
            <span className="text-primary hover:text-blue-300">
              <a href="#">{article.authorName}</a>
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {formattedDate}
            </span>
            <Badge variant="secondary" className="ml-2 bg-primary text-white">
              {article.category}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Featured Image */}
        {article.image && (
          <div className="relative aspect-[16/9] mb-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${article.image}`}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <div
            className="text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        </div>
        {/* references */}
        <div className="my-4 md:my-8">
          <h3 className="my-4 md:my-8 font-bold">References:</h3>
          <ol>
            {article.referenceUrl.map((url, index) => (
              <li key={index} className="mr-2">
                <a
                  href={url.startsWith("http") ? url : `https://${url}`}
                  className="text-primary hover:bg-primary hover:text-white p-1 duration-300 rounded-sm underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}
