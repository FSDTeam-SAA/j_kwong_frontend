"use client";
import ArchiveArticles from "@/components/homepage/archive-articles";
import Hero from "@/components/homepage/hero";
import PopularCarousel from "@/components/homepage/popular-carousel";
import GreenPopup from "@/components/shared/green-popup";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPopup &&
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const togglePopup = (e) => {
    e.stopPropagation();
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="mt-16">
      <div className="fixed bottom-5 left-5 z-50">
        <Button
          ref={buttonRef}
          onClick={togglePopup}
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
            <div className="text-white">
              <X className="h-5 w-5" />
            </div>
          )}
        </Button>
      </div>
      {showPopup && (
        <div ref={popupRef}>
          <GreenPopup
            energyConsumption={9.3198}
            co2Amount={3.57}
            ledMinutes={55}
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}
      <Hero />
      <PopularCarousel />
      <ArchiveArticles />
    </div>
  );
};

export default HomePage;
