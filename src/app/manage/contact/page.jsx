import React from "react";
import ContactAdmin from "./components/manage-contact";
import AdminLayout from "../admin-layout";

const page = () => {
  return (
    <AdminLayout>
      <ContactAdmin />
    </AdminLayout>
  );
};

export default page;
