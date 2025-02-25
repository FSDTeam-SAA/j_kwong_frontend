import React from "react";
import { CategoryManagement } from "./components/category-management";
import AdminLayout from "../admin-layout";

const page = () => {
  return (
    <AdminLayout>
      <CategoryManagement />
    </AdminLayout>
  );
};

export default page;
