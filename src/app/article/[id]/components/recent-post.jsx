import ArticleGrid from "@/components/shared/articles-grid";
import React from "react";

const RecentPost = () => {
  return (
    <div className="container">
      <h1 className="text-4xl font-light text-textPrimary flex items-center justify-center my-[30px] lg:my-[50px]">
        <div className="h-8 w-2 bg-primary mr-2"></div>
        Recent Posts
      </h1>
      {/* <ArticleGrid articles={articles} /> */}
    </div>
  );
};

export default RecentPost;
