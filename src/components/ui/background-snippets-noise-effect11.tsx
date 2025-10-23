import React, { useEffect, useRef } from "react";

interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

const CANVAS_BASE_SIZE = 1024;

const Noise: React.FC<NoiseProps> = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 18,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    const drawStaticNoise = () => {
      const imageData = context.createImageData(CANVAS_BASE_SIZE, CANVAS_BASE_SIZE);
      const { data } = imageData;

      for (let index = 0; index < data.length; index += 4) {
        const grayscaleValue = Math.random() * 255;
        data[index] = grayscaleValue;
        data[index + 1] = grayscaleValue;
        data[index + 2] = grayscaleValue;
        data[index + 3] = patternAlpha;
      }

      context.putImageData(imageData, 0, 0);
    };

    const applySizingAndDraw = () => {
      canvas.width = CANVAS_BASE_SIZE;
      canvas.height = CANVAS_BASE_SIZE;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      drawStaticNoise();
    };

    applySizingAndDraw();
    window.addEventListener("resize", applySizingAndDraw);

    return () => {
      window.removeEventListener("resize", applySizingAndDraw);
    };
  }, [patternAlpha, patternRefreshInterval, patternScaleX, patternScaleY, patternSize]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

export default function Component() {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_200px,#f97316,transparent)]" />
      <Noise patternAlpha={18} />
    </div>
  );
}
