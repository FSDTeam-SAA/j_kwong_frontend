import React from "react";

const TopSection = () => {
  return (
    <div className="relative bg-[url('/assets/group.jpg')] bg-cover bg-center h-[700px] flex justify-center items-center">
      <div className="absolute inset-0 bg-black/20"></div> {/* Dark overlay */}
      <h2 className="relative text-[64px] font-bold text-white">About Us</h2>
    </div>
  );
};

export default TopSection;
