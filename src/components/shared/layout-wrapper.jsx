"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/shared/header";
import Newsletter from "@/components/shared/newsletter";
import Footer from "@/components/shared/footer";
import { Toaster } from "sonner";
import BackToTop from "./back-to-top";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHiddenRoute = pathname.startsWith("/manage") || pathname === "/login";

  return (
    <>
      {!isHiddenRoute && <Header />}
      {children}
      {!isHiddenRoute && (
        <>
          <BackToTop />
          <Newsletter />
          <Footer />
        </>
      )}
      <Toaster />
    </>
  );
}
