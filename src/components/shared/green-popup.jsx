"use client";

import { useState } from "react";
import { Lightbulb, X, Zap } from "lucide-react";
import WaveGauge from "./wave-gauge";

export default function GreenPopup({
  energyConsumption = 9.3198,
  co2Amount = 3.57,
  ledMinutes = 55,
  onClose,
}) {
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
        {/* Circular gauge */}
        <div className="relative w-48 h-48 mb-4">
          <WaveGauge percentage={45} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 text-gray-700">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="font-bold">{energyConsumption} WH</span>
            </div>
            <div className="text-white font-bold mt-12">
              {co2Amount} G OF CO<sub>2</sub>
            </div>
          </div>
        </div>

        {/* LED light text */}
        <div className="text-center mt-2">
          <p className="text-primary">This Website Is Green</p>
          <p className="text-gray-600">Your visit here would have cost</p>
          <p className="text-xl font-bold text-gray-700 flex items-center justify-center gap-2">
            {ledMinutes} MINUTES OF LED LIGHT
            <Lightbulb className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </p>
        </div>
      </div>

      {/* Bottom section with teal background */}
      <div className="bg-[#7ed957] p-6 text-center text-white">
        <p className="font-medium mb-1">The Green Cloister</p>
        <p className="text-sm mb-4">
          uses renewable energy, so your stay here
          <br />
          is beneficial for the environment{" "}
          <span className="inline-block">🌍</span>
        </p>

        <p className="text-sm mb-6">
          Your presence on this website is covered with
          <br />
          <strong>renewable energy</strong> for carbon-neutral browsing.
        </p>
      </div>

      {/* Footer banner */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        <div className="flex items-center justify-between bg-white border-2 border-teal-400 rounded-full py-3 px-6 mx-auto w-64 mt-4">
          <span className="font-bold text-gray-700">
            THIS WEBSITE IS <span className="text-teal-500">GREEN</span>
          </span>
          <button
            onClick={handleClose}
            className="bg-teal-400 rounded-full p-1 text-white hover:bg-teal-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
