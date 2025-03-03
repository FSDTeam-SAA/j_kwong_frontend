"use client";
import ArticleForm from "@/components/article/article-form";
import AdminLayout from "@/app/manage/admin-layout";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const params = useParams();
  const slug = params.id;
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${slug}`
        );
        setInitialData(response.data.data); 
      } catch (error) {
        setError("Error fetching blog data");
        console.error("Error fetching blog data:", error);
      }
    };

    fetchData();
  }, [slug]); // This will run once when the slug changes

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
        {initialData && <ArticleForm mode="edit" initialData={initialData} />}
      </div>
    </AdminLayout>
  );
}
