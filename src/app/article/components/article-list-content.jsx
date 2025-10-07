"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
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
const DOTS = "DOTS";

// Create a pagination range similar to many component libraries
function createPagination(
  totalPages,
  currentPage,
  siblingCount = 1,
  boundaryCount = 1
) {
  // returns an array like [1, DOTS, 4,5,6, DOTS, 20]
  const totalPageNumbers = boundaryCount * 2 + siblingCount * 2 + 3; // first, last, current + two possible DOTS
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 2;
  const shouldShowRightDots =
    rightSiblingIndex < totalPages - (boundaryCount + 1);

  const firstPages = Array.from({ length: boundaryCount }, (_, i) => i + 1);
  const lastPages = Array.from(
    { length: boundaryCount },
    (_, i) => totalPages - i
  ).reverse();

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );

  const pages = [];

  if (!shouldShowLeftDots && shouldShowRightDots) {
    // left continuous, right has dots
    const leftItemCount = boundaryCount + 2 * siblingCount + 2;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    pages.push(...leftRange);
    pages.push(DOTS);
    pages.push(...lastPages);
  } else if (shouldShowLeftDots && !shouldShowRightDots) {
    // right continuous, left has dots
    pages.push(...firstPages);
    pages.push(DOTS);
    const rightItemCount = boundaryCount + 2 * siblingCount + 2;
    const start = totalPages - rightItemCount + 1;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => start + i
    );
    pages.push(...rightRange);
  } else if (shouldShowLeftDots && shouldShowRightDots) {
    pages.push(...firstPages);
    pages.push(DOTS);
    pages.push(...middleRange);
    pages.push(DOTS);
    pages.push(...lastPages);
  } else {
    // fallback to full range
    pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
  }

  return pages;
}

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

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== debouncedSearchTerm) {
        setDebouncedSearchTerm(searchTerm);
        updateSearchParams(searchTerm);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const updateSearchParams = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("searchTerm", value);
    else params.delete("searchTerm");
    router.push(`?${params.toString()}`, undefined, { shallow: true });
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`
      );
      if (response.data.status) setCategories(response.data.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

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

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchClick = () => {
    setDebouncedSearchTerm(searchTerm);
    updateSearchParams(searchTerm);
  };

  const handlePageChange = (pageNumber) => {
    if (typeof pageNumber !== "number") return;
    if (pageNumber < 1 || pageNumber > totalPages) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(pageNumber);
  };

  // compute pagination range
  const pagination = useMemo(() => {
    // siblingCount controls how many pages around the active page are shown
    // boundaryCount controls how many pages are always shown at the start and end
    return createPagination(totalPages, currentPage, 1, 1);
  }, [totalPages, currentPage]);

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
            <div className="h-8 w-2 bg-primary mr-2" />
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

            {/* Pagination: simplified rendering (no duplicate first/last rendering). */}
            <nav aria-label="Pagination" className="flex justify-center mt-8">
              <ul className="inline-flex items-center space-x-2 list-none p-0 m-0">
                <li>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!hasPrevPage}
                    className="border-primary text-textPrimary"
                  >
                    Prev
                  </Button>
                </li>

                {pagination.map((p, idx) => {
                  if (p === DOTS) {
                    return (
                      <li
                        key={`dots-${idx}`}
                        className="px-2 text-gray-500"
                        aria-hidden
                      >
                        &hellip;
                      </li>
                    );
                  }

                  return (
                    <li key={p}>
                      <Button
                        onClick={() => handlePageChange(p)}
                        variant={currentPage === p ? "default" : "outline"}
                        aria-current={currentPage === p ? "page" : undefined}
                        className={
                          currentPage === p
                            ? "bg-primary text-white"
                            : "border-primary text-textPrimary"
                        }
                      >
                        {p}
                      </Button>
                    </li>
                  );
                })}

                <li>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    className="border-primary text-textPrimary"
                  >
                    Next
                  </Button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}
