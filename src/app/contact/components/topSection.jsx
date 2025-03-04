import React from "react";

const TopSection = () => {
  return (
    <div className="relative h-[700px] flex justify-center items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/drdztqgcx/image/upload/v1741070036/j_kowng/efpwler6ivpvwjvrkn6e.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/20"></div> {/* Dark overlay */}
      {/* Text Content */}
      <h2 className="relative text-[64px] font-bold text-white">Contact Us</h2>
    </div>
  );
};

export default TopSection;
