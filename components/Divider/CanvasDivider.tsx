"use client";

import { useRef, useEffect } from "react";

const CanvasDivider = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "red";
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.lineTo(90, 50);
    ctx.lineTo(50, 90);
    ctx.stroke();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>;
};

export default CanvasDivider;
