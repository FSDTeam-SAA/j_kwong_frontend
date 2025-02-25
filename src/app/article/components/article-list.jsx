"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ArticleGrid from "@/components/shared/articles-grid";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 9;

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`
      );
      if (response.data.status) {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

  // Fetch articles
  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const categoryParam =
        selectedCategory === "all" ? "" : `&category=${selectedCategory}`;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs?page=${currentPage}&limit=${ITEMS_PER_PAGE}${categoryParam}`
      );

      if (response.data.status) {
        setArticles(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setHasNextPage(response.data.pagination.hasNextPage);
        setHasPrevPage(response.data.pagination.hasPrevPage);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch articles");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, selectedCategory]);

  // Initial fetch of categories and articles
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(pageNumber);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-[150px]">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div />
          <h1 className="text-4xl font-light text-textPrimary flex items-center">
            <div className="h-8 w-2 bg-primary mr-2"></div>
            All Articles
          </h1>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white ">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <ArticleGrid articles={articles} />

            <div className="flex justify-center items-center space-x-2 mt-8">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPrevPage}
                className="border-primary text-textPrimary"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    variant={currentPage === page ? "default" : "outline"}
                    className={`${
                      currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : "border-primary text-textPrimary"
                    }`}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNextPage}
                className="border-primary text-textPrimary"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
