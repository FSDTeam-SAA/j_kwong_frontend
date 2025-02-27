import React from "react";
import AdminLayout from "./admin-layout";
import Stats from "./stats";
import BlogStatsChart from "./components/stats-chart";

const page = () => {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <div>
          <div className="mb-10">
            <BlogStatsChart />
          </div>
          <Stats />
        </div>
      </div>
    </AdminLayout>
  );
};

export default page;
