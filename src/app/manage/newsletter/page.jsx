import React from "react";
import NewsletterDashboard from "./components/newsletter-management";
import AdminLayout from "../admin-layout";

const page = () => {
  return (
    <AdminLayout>
      <NewsletterDashboard />
    </AdminLayout>
  );
};

export default page;
