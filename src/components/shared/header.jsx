"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setIsTop(currentScrollY === 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const getLinkStyle = (path) => {
    // Check if current path is an article route
    const isArticlePath = pathname.startsWith("/article");

    const baseStyle =
      isArticlePath || !isTop
        ? "text-black hover:bg-gray-100"
        : "text-white hover:bg-white/10";

    const activeStyle = "text-primary";
    return pathname === path ? `${baseStyle} ${activeStyle}` : baseStyle;
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 z-50 w-full transition-all  ${
        isTop ? "bg-transparent" : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto flex h-[60px] items-center justify-between px-4">
        {/* Left section with logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="items-center space-x-2">
            <Image
              src="/assets/logo.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className="h-[45px] w-[250px] md:h-[55px] md:w-[290px]"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Button variant="ghost" className={getLinkStyle("/article")} asChild>
            <Link href="/article" className="!text-xl ">
              All Articles
            </Link>
          </Button>
          <Button variant="ghost" className={getLinkStyle("/about")} asChild>
            <Link href="/about" className="text-xl ">
              About Us
            </Link>
          </Button>
          <Button variant="ghost" className={getLinkStyle("/contact")} asChild>
            <Link href="/contact" className="text-xl ">
              Contact Us
            </Link>
          </Button>
        </nav>

        {/* Right section with search and trending */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`${
              pathname.startsWith("/article") || !isTop
                ? "text-black hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`${
                  pathname.startsWith("/article") || !isTop
                    ? "text-black hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                } md:hidden`}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] border-none bg-primary"
            >
              <SheetHeader>
                <div className="flex justify-end">
                  <SheetTrigger asChild>
                    {/* <Button
                      size="icon"
                      className="bg-[#9ECEC5] hover:bg-[#8BBDB4]"
                    >
                      <X className="h-5 w-5" />
                    </Button> */}
                  </SheetTrigger>
                </div>
              </SheetHeader>
              <nav className="mt-8 flex flex-col space-y-4">
                {/* Mobile Category Dropdown */}
                <Link
                  href="/about"
                  className={`text-lg ${getLinkStyle("/about")}`}
                >
                  All Articles
                </Link>

                <Link
                  href="/about"
                  className={`text-lg ${getLinkStyle("/about")}`}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className={`text-lg ${getLinkStyle("/contact")}`}
                >
                  Contact Us
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
