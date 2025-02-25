import React from "react";
import AdminLayout from "../admin-layout";
import AdminArticlesList from "./components/admin-articles-list";

const page = () => {
  return (
    <AdminLayout>
      <div>
        <AdminArticlesList />
      </div>
    </AdminLayout>
  );
};

export default page;
