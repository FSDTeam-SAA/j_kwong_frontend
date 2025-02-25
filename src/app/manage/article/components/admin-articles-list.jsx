"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ConfirmDeleteDialog from "./confirm-delete-dialog";

const ITEMS_PER_PAGE = 4;

export default function AdminArticlesList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);

  const [updateFetch, setUpdateFetch] = useState(false);

  function stripHtmlTags(html) {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`
      );
      setCategories(response.data.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const categoryParam =
        selectedCategory === "all" ? "" : `&category=${selectedCategory}`;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs?page=${currentPage}&limit=${ITEMS_PER_PAGE}${categoryParam}`
      );

      if (response.data.status) {
        setPosts(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setHasNextPage(response.data.pagination.hasNextPage);
        setHasPrevPage(response.data.pagination.hasPrevPage);
      } else {
        setError(response.data.message);
      }
      setUpdateFetch(false);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, selectedCategory, updateFetch]);

  // Initial fetch of categories and posts
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenDelete = (slug) => {
    setSelectedSlug(slug);
    setOpenDelete(true);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Filters */}
      <div className="flex justify-between items-center">
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category.title}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          {/* Posts Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
              <Card
                key={post._id}
                className="relative overflow-hidden bg-white/80 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`}
                      alt=""
                      height={200}
                      width={400}
                      className="h-full w-full object-cover"
                    />
                    <Badge className={`absolute right-2 top-2 text-white`}>
                      {post.category.title}
                    </Badge>
                  </div>
                  <CardHeader className="space-y-1">
                    <h3 className="line-clamp-2 text-lg font-semibold">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm text-zinc-400">
                      {stripHtmlTags(post.description)}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <span>{post.authorName}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/manage/article/details/${post.slug}`}>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-blue-400 hover:text-blue-300"
                      >
                        Details
                      </Button>
                    </Link>
                  </CardContent>
                </div>

                <div>
                  <CardFooter className="flex flex-col space-y-2">
                    <div className="flex w-full gap-2">
                      <Link
                        href={`/manage/article/edit/${post.slug}`}
                        className="w-1/2"
                        passHref
                      >
                        <Button className="flex-1 bg-primary  hover:bg-primary/80 text-white w-full">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        className="flex-1 bg-red-500 text-white hover:bg-red-600  w-full"
                        onClick={() => handleOpenDelete(post.slug)}
                      >
                        Delete
                      </Button>
                      <ConfirmDeleteDialog
                        open={openDelete}
                        onClose={() => setOpenDelete(false)}
                        slug={selectedSlug}
                        setUpdateFetch={setUpdateFetch}
                      />
                    </div>
                    {/* <Button
                      className={`w-full ${
                        post.isPublished
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-primary hover:bg-primary/80"
                      }`}
                    >
                      {post.isPublished ? "Unpublish" : "Publish"}
                      <Check className="ml-1 h-4 w-4" />
                    </Button> */}
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrevPage}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
