"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ArticleCard = ({ article, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  function stripHtmlTags(html) {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.3,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom easing for smooth animation
      }}
      className="relative flex h-[670px] w-full flex-col"
    >
      <Link href={`/article/${article.slug}`} className="block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative h-[450px] rounded-lg overflow-hidden border-2 border-primary"
        >
          {article.category && (
            <Badge
              variant="secondary"
              className="absolute right-3 top-3 z-10 rounded-[6px] bg-primary px-2 py-1 text-[11px] font-normal text-white hover:bg-primary/80"
            >
              {article.category.title}
            </Badge>
          )}
          <Image
            src={`${article.image}`}
            alt={article.title}
            fill
            className="object-cover h-full w-full  duration-200 hover:scale-105"
            priority
          />
        </motion.div>
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.5,
          delay: index * 0.2 + 0.1, // Additional delay for content
          ease: "easeOut",
        }}
        className="flex flex-1 flex-col pt-5"
      >
        <Link
          href={`/article/${article.slug}`}
          className="group relative block w-fit"
        >
          <h2 className="mb-3 text-[18px] lg:text-[21px] font-semibold leading-tight text-textPrimary hover:text-primary relative transition-all duration-300 line-clamp-2">
            {article.title}
          </h2>
        </Link>

        <p className="line-clamp-3 text-sm leading-snug text-textPrimary">
          {stripHtmlTags(article.description)}
        </p>
        <div className="mt-3">
          <Link href={`/article/${article.slug}`}>
            <InteractiveHoverButton>Read More</InteractiveHoverButton>
          </Link>
        </div>
      </motion.div>
    </motion.article>
  );
};

const ArticleGrid = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 gap:2 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard key={article.slug} article={article} index={index} />
      ))}
    </div>
  );
};

export default ArticleGrid;
