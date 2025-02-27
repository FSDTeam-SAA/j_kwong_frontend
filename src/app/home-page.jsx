"use client";
import ArchiveArticles from "@/components/homepage/archive-articles";
import Hero from "@/components/homepage/hero";
import PopularCarousel from "@/components/homepage/popular-carousel";
import WhoAreWe from "@/components/homepage/who-are-we";
import GreenPopup from "@/components/shared/green-popup";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="mt-16">
      <div className="fixed bottom-5 left-5 z-50">
        <Button
          onClick={() => setShowPopup((prev) => !prev)}
          className="bg-[#7ed957] hover:bg-primary text-white rounded-full w-[50px] h-[50px]"
        >
          {!showPopup ? (
            <Image
              src="/assets/leaf-ani.svg"
              alt="Who are we Image"
              width={50}
              height={50}
              className="w-[20px] h-[20px]"
            />
          ) : (
            <div className="text-white">X</div>
          )}
        </Button>
      </div>
      {showPopup && (
        <GreenPopup
          energyConsumption={9.3198}
          co2Amount={3.57}
          ledMinutes={55}
          onClose={() => setShowPopup(false)}
        />
      )}
      <Hero />
      <PopularCarousel />
      <ArchiveArticles />
      <WhoAreWe />
    </div>
  );
};

export default HomePage;
