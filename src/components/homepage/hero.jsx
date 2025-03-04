"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAnimation, motion } from "framer-motion";
import StatsBar from "./stats-bar";
import StaggeredText from "../animation/staggered-text";
import FadeB from "../animation/fadeB";
import Image from "next/image";
import FadeR from "../animation/fadeR";

export default function Hero() {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start({ x: 5 });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start({ x: 0 });
  };

  return (
    <div className="relative h-[800px] mt-[-64px]">
      {/* Background Image with Gradient Overlay and Blur */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/drdztqgcx/image/upload/v1741070215/j_kowng/mcd0kxea9tmkrkqjiyes.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent " /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full w-[97%] mx-auto md:w-auto">
        <div className="container">
          <div
            className="max-w-[1050px] max-h-[440px] flex-col items-center"
            gradientcolor="#00800066"
          >
            <div className="">
              <div className="space-y-4">
                <div className="overflow-hidden">
                  <FadeR delay={0.1} className="flex gap-3">
                    <Image
                      src="/assets/logo.png"
                      width={800}
                      height={500}
                      alt="Logo"
                      className="h-[85px] w-[370px] md:h-[120px] md:w-[600px]"
                    />
                  </FadeR>

                  <StaggeredText
                    text="Student-run environmental publication, with roots at Winchester College"
                    delay={0.2}
                    className="text-[#7ed957] text-xl md:text-2xl font-bold"
                    asWords="true"
                  />
                  <FadeR delay={1}>
                    <blockquote className="border-l-4 border-[#7ed957] pl-4">
                      <p className="text-lg md:text-xl text-white/90 italic">
                        "What you do makes a difference, and you have to decide
                        what kind of difference you want to make."
                      </p>
                      <footer className="mt-2 text-[#7ed957]">
                        - Jane Goodall
                      </footer>
                    </blockquote>
                  </FadeR>
                </div>
              </div>
              <div className="overflow-hidden">
                <FadeR delay={1.2}>
                  <Link href="/article">
                    <Button
                      className="bg-[#66b843] text-white hover:bg-primary/90 text-lg px-6 py-6 h-[52px] rounded-md mt-6"
                      onMouseEnter={handleHoverStart}
                      onMouseLeave={handleHoverEnd}
                    >
                      <span>Read Latest Articles</span>
                      <motion.div
                        className="inline-block ml-2"
                        animate={controls}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </Button>
                  </Link>
                </FadeR>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <FadeB className="max-w-[770px] mx-auto mt-[-70px]">
        <StatsBar />
      </FadeB>
    </div>
  );
}
