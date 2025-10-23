import { useEffect, useMemo, useRef } from "react";

export type NoiseOverlayProps = {
  alpha?: number;
  color?: string;
  tintStrength?: number;
};

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

const DEFAULT_COLOR: RgbColor = { r: 30, g: 64, b: 175 };

const clamp = (value: number, minimum: number, maximum: number) => {
  if (value < minimum) {
    return minimum;
  }

  if (value > maximum) {
    return maximum;
  }

  return value;
};

const hexToRgb = (color: string): RgbColor | null => {
  if (!color) {
    return null;
  }

  const hexValue = color.replace("#", "");
  if (hexValue.length === 3) {
    const [red, green, blue] = hexValue.split("");
    return {
      r: parseInt(red.repeat(2), 16),
      g: parseInt(green.repeat(2), 16),
      b: parseInt(blue.repeat(2), 16),
    };
  }

  if (hexValue.length === 6) {
    return {
      r: parseInt(hexValue.slice(0, 2), 16),
      g: parseInt(hexValue.slice(2, 4), 16),
      b: parseInt(hexValue.slice(4, 6), 16),
    };
  }

  return null;
};

export function NoiseOverlay({
  alpha = 56,
  color = "#1E3A8A",
  tintStrength = 0.55,
}: NoiseOverlayProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const resolvedColor = useMemo<RgbColor>(() => {
    const rgb = hexToRgb(color);
    if (rgb) {
      return rgb;
    }

    return DEFAULT_COLOR;
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    const drawNoise = () => {
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }

      const { width, height } = parent.getBoundingClientRect();
      const canvasWidth = Math.max(1, Math.floor(width));
      const canvasHeight = Math.max(1, Math.floor(height));

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      const imageData = context.createImageData(canvasWidth, canvasHeight);
      const { data } = imageData;
      const tintRatio = clamp(tintStrength, 0, 1);

      for (let index = 0; index < data.length; index += 4) {
        const noiseValue = Math.random() * 255;
        data[index] = noiseValue * tintRatio + resolvedColor.r * (1 - tintRatio);
        data[index + 1] = noiseValue * tintRatio + resolvedColor.g * (1 - tintRatio);
        data[index + 2] = noiseValue * tintRatio + resolvedColor.b * (1 - tintRatio);
        data[index + 3] = alpha;
      }

      context.putImageData(imageData, 0, 0);
    };

    drawNoise();

    const parent = canvas.parentElement;
    if (!parent || typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(() => drawNoise());
    resizeObserver.observe(parent);

    return () => resizeObserver.disconnect();
  }, [alpha, resolvedColor, tintStrength]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-soft-light"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
