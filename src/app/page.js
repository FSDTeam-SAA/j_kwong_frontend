import ArchiveArticles from "@/components/homepage/archive-articles";
import Hero from "@/components/homepage/hero";
import PopularCarousel from "@/components/homepage/popular-carousel";
import WhoAreWe from "@/components/homepage/who-are-we";
import React from "react";

export default function Home() {
  return (
    <div>
      <div className="mt-16">
        <Hero />
        <PopularCarousel />
        <ArchiveArticles />
        <WhoAreWe />
      </div>
    </div>
  );
}
