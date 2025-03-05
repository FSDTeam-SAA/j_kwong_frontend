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
import { Loader2, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 9;

export default function ArticleListContent() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const term = searchParams.get("searchTerm") || "";
    setSearchTerm(term);
    setDebouncedSearchTerm(term);
  }, [searchParams]);

  // Debounce effect for search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== debouncedSearchTerm) {
        setDebouncedSearchTerm(searchTerm);
        updateSearchParams(searchTerm);
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const updateSearchParams = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("searchTerm", value);
    } else {
      params.delete("searchTerm");
    }
    router.push(`?${params.toString()}`, undefined, { shallow: true });
  };

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
    if (debouncedSearchTerm === null) return;

    setIsLoading(true);
    setError("");
    try {
      const categoryParam =
        selectedCategory === "all" ? "" : `&category=${selectedCategory}`;
      const search = debouncedSearchTerm
        ? `&search=${debouncedSearchTerm}`
        : "";
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs?page=${currentPage}&limit=${ITEMS_PER_PAGE}${categoryParam}${search}&publish=true`
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
  }, [currentPage, selectedCategory, debouncedSearchTerm]);

  // Initial fetch of categories and articles
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles, debouncedSearchTerm]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when category changes
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setDebouncedSearchTerm(searchTerm); // Immediately update debounced term
    updateSearchParams(searchTerm); // Trigger search immediately
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
          <h1 className="text-textPrimary text-[24px] md:text-[34px] font-semibold flex items-center w-full md:w-1/3">
            <div className="h-8 w-2 bg-primary mr-2"></div>
            All Articles
          </h1>
          <div className="flex gap-2">
            <div className="max-w-md w-full mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-4 pr-12"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={handleSearchClick}
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-[40px] rounded-none rounded-r-md"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              className="w-full md:w-1/3"
            >
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
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : articles.length < 1 ? (
          <div className="flex justify-center items-center min-h-[400px] text-gray-500">
            No article found
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
                        ? "bg-primary text-white"
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
