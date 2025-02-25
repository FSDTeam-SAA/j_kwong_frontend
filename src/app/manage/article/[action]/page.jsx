import ArticleForm from "@/components/article/article-form";
import { notFound } from "next/navigation";
import AdminLayout from "../../admin-layout";

export default function BlogPage({ params }) {
  if (!["add", "edit"].includes(params.action)) {
    notFound();
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-primary">
          {params.action === "add" ? "Add New Article" : "Edit Article"}
        </h1>
        <ArticleForm mode={params.action} />
      </div>
    </AdminLayout>
  );
}
