"use client";

import { Suspense } from "react";
import ArticleListContent from "./article-list-content";

export default function ArticleList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleListContent />
    </Suspense>
  );
}
