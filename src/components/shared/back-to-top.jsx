"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn button (optional)
import { ArrowUp } from "lucide-react"; // Icon

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300); // Show when scrolled 300px
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <Button
        onClick={scrollToTop}
        className="w-10 h-10 z-50 fixed bottom-5 right-5 p-3 bg-[#7ed957] text-white rounded-lg shadow-lg hover:bg-primary transition"
      >
        <ArrowUp className="w-8 h-8" />
      </Button>
    )
  );
}
