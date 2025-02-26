import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="mt-[80px] w-screen h-[80vh]">
        <Image
          src="/assets/404.png"
          alt="not found"
          width={2000}
          height={2000}
          className="w-full h-full object-contain rounded-[12px] overflow-hidden"
        />
      </div>
      <Link href={"/"} className=" flex justify-center">
        <InteractiveHoverButton className="">
          Go Back to Home Page
        </InteractiveHoverButton>
      </Link>
    </>
  );
};

export default NotFound;
