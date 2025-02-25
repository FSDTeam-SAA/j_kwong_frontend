import React from "react";
import AdminArticleDetails from "./components/admin-article-details";
import AdminLayout from "../../../admin-layout";

const page = () => {
  return (
    <AdminLayout>
      <AdminArticleDetails />
    </AdminLayout>
  );
};

export default page;
