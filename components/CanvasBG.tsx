"use client";
import React, { useRef, useEffect } from "react";
import { createNoise2D } from "simplex-noise";

interface Point {
  x: number;
  y: number;
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const noise2D = createNoise2D();
    const lines: Point[][] = [];
    const numLines = 50;
    const lineHeight = height / numLines;

    for (let i = 0; i <= numLines; i++) {
      const line: Point[] = [];
      for (let j = 0; j <= width; j += 2) {
        const x = j;
        const y = lineHeight * i + noise2D(j / 100, i / 10) * 1;
        line.push({ x, y });
      }
      lines.push(line);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line[0].x, line[0].y);

        for (let i = 1; i < line.length; i++) {
          ctx.lineTo(line[i].x, line[i].y);
        }

        ctx.strokeStyle = "#b8b8b8";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
    }

    function animate() {
      const time = performance.now() / 50000; // Slower movement by increasing the divisor
      lines.forEach((line, lineIndex) => {
        line.forEach((point) => {
          point.y =
            lineHeight * lineIndex +
            noise2D(point.x / 100, point.y / 100 + time) * 15;
        });
      });

      draw();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-50"
    />
  );
};

export default Canvas;
