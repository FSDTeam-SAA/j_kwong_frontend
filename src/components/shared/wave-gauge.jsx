"use client";

import { useEffect, useRef } from "react";

export default function WaveGauge({ percentage = 50, color = "#7ed957" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Normalize dimensions for drawing
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;

    // Calculate wave height based on percentage
    const waveHeight = height * (1 - percentage / 100);

    const drawCircle = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw outer circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "#E6F7F7";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Create clipping path for the wave
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 2, 0, Math.PI * 2);
      ctx.clip();

      // Draw wave
      const time = Date.now() / 1000;
      const amplitude = 5;
      const frequency = 0.05;

      ctx.beginPath();
      ctx.moveTo(0, waveHeight);

      for (let x = 0; x <= width; x += 5) {
        const y = waveHeight + Math.sin(x * frequency + time) * amplitude;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    let animationId;
    const animate = () => {
      drawCircle();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [percentage, color]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
}
