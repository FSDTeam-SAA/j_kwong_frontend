"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function MagicCard({
  children,
  className,
  gradientSize = 400,
  gradientOpacity = 0.8,
  gradientFrom = "#4ADE80", // Light green
  gradientTo = "#16A34A", // Dark green
  hoverRange = 100, // Range outside the card where the effect is active
}) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (cardRef.current) {
        const { left, top, width, height } =
          cardRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = Math.abs(e.clientX - centerX);
        const distanceY = Math.abs(e.clientY - centerY);

        // Check if the mouse is within the hover range
        if (
          distanceX <= width / 2 + hoverRange &&
          distanceY <= height / 2 + hoverRange
        ) {
          mouseX.set(e.clientX - left);
          mouseY.set(e.clientY - top);
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      }
    },
    [mouseX, mouseY, hoverRange]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const gradientStyle = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom},
      ${gradientTo},
      transparent 80%
    )
  `;

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex rounded-lg overflow-hidden",
        className
      )}
    >
      {/* Gradient container */}
      <motion.div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: gradientStyle,
          opacity: isHovering ? gradientOpacity : 0,
        }}
      />

      {/* Background container */}
      <div className="absolute inset-[1px] rounded-lg bg-background z-10" />

      {/* Content container */}
      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
}
