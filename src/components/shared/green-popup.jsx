"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function GreenPopup({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-5 max-w-sm w-full shadow-lg border rounded-3xl overflow-hidden z-50 font-sans">
      {/* Top section with white background */}
      <div className="bg-white p-6 pt-8 rounded-t-3xl relative flex flex-col items-center">
        {/* Replace the circular gauge with the lightbulb city illustration */}
        <div className="relative w-64 h-64 mb-4">
          <Image
            src="https://res.cloudinary.com/drdztqgcx/image/upload/v1741070215/j_kowng/pjgagw3je990we0snuwi.png"
            alt="Green energy concept with city inside a lightbulb"
            className="w-full h-full object-contain"
            width={500}
            height={500}
          />
        </div>

        {/* Text content below image */}
        <div className="text-center mt-2">
          <p className="text-primary font-bold text-xl">thegreencloister.com</p>
          <p className="text-gray-700 mt-2">
            Our website is designed with efficiency in mind, minimizing data
            usage and reducing energy consumption.
          </p>
        </div>
      </div>

      {/* Bottom section with green background */}
      <div className="bg-[#7ed957] p-6 text-center text-white">
        <p className="text-base mb-4">
          This helps to lower the environmental impact
          <br />
          of your browsing experience.
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-1 text-gray-500 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
