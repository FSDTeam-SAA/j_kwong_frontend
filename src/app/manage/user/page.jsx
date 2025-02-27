import React from "react";
import UserManagement from "./components/user-management";
import AdminLayout from "../admin-layout";

const page = () => {
  return (
    <AdminLayout>
      <UserManagement />
    </AdminLayout>
  );
};

export default page;
