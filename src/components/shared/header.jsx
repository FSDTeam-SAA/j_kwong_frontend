"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Input } from "../ui/input";

const logoText = ["the", "green", "cloister"];
export function Header() {
  const [isTop, setIsTop] = useState(true);
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(
        `/article?searchTerm=${encodeURIComponent(searchTerm.trim())}`
      );
      setOpen(false);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div
      className={`fixed top-0 z-50 w-full transition-all ${
        isTop ? "!bg-transparent" : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto flex h-[60px] items-center justify-between px-4">
        {/* Left section with logo */}
        <div className="flex items-center justify-center gap-6">
          <Link href="/" className="items-center space-x-2">
            <Image
              src="/assets/logo.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className="h-[35px] w-[170px] md:h-[40px] md:w-[210px]"
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
          {/* search drawer--------------------------------------------- */}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
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
                <span className="sr-only">Search articles</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-screen">
              <div className="mx-auto w-full max-w-2xl p-6">
                <div className="flex flex-col items-center justify-center gap-4 h-[50vh]">
                  <div className="text-center space-y-2 mb-4">
                    <h2 className="text-2xl font-bold text-primary">
                      Search Articles
                    </h2>
                    <p className="text-muted-foreground">
                      Enter your search term below
                    </p>
                  </div>
                  <div className="flex w-full max-w-lg gap-2">
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search articles..."
                      className="flex-1"
                    />
                    <Button onClick={handleSearch}>Search</Button>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          {/* search drawer end -------------------------------------------------- */}
          {/* Mobile Menu */}
          <Sheet open={openMobile} onOpenChange={setOpenMobile}>
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
              className="w-[50%] border-none bg-primary"
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
              <nav className="mt-14 flex flex-col space-y-4">
                {/* Mobile Category Dropdown */}
                <Link
                  href="/article"
                  className={`text-lg text-white `}
                  onClick={() => setOpenMobile(false)}
                >
                  All Articles
                </Link>

                <Link
                  href="/about"
                  className={`text-lg text-white `}
                  onClick={() => setOpenMobile(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className={`text-lg text-white `}
                  onClick={() => setOpenMobile(false)}
                >
                  Contact Us
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
