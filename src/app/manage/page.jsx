import React from "react";
import AdminLayout from "./admin-layout";

const page = () => {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your blog admin panel. Here you can manage your blog posts,
          view analytics, and more.
        </p>
      </div>
    </AdminLayout>
  );
};

export default page;
