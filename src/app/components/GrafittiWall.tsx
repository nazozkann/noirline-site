"use client";
import { useRef, useEffect, useState } from "react";

export default function GraffitiWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sprayingRef = useRef(false);
  const colorRef = useRef("#ff6200");
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const dwellTicks = useRef(0); // kaç ardışık frame aynı noktada?

  const [color, setColor] = useState("#2c2c2c");
  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const spray = (e: PointerEvent) => {
      if (!sprayingRef.current) {
        lastPos.current = null;
        dwellTicks.current = 0;
        return;
      }

      const { left, top } = canvas.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      if (lastPos.current) {
        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        const dist = Math.hypot(dx, dy);

        // ------------- DRIP LOGIC ----------------
        if (dist < 4) {
          // neredeyse sabit
          dwellTicks.current += 1;
          if (dwellTicks.current > 2) {
            // ~8 frame sonra akıt
            drawDrip(x, y, ctx);
            dwellTicks.current = 0;
          }
        } else {
          dwellTicks.current = 0;
        }
        // ----------------------------------------

        // boşluk doldurma (interpolasyon)
        const steps = Math.max(1, Math.floor(dist / 2));
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          drawSpraySpot(
            lastPos.current.x + dx * t,
            lastPos.current.y + dy * t,
            ctx
          );
        }
      } else {
        drawSpraySpot(x, y, ctx);
      }
      lastPos.current = { x, y };
    };

    canvas.addEventListener("pointermove", spray);
    return () => canvas.removeEventListener("pointermove", spray);
  }, []);

  // ---------- yardımcı fonksiyonlar ----------
  const drawSpraySpot = (
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D
  ) => {
    const particles = 200;
    for (let i = 0; i < particles; i++) {
      const angle = Math.random() * 100 * Math.PI;
      const d = Math.random() * 20;
      const ox = Math.cos(angle) * d;
      const oy = Math.sin(angle) * d;
      const alpha = (1 - d / 20) * (Math.random() * 0.3 + 0.2);
      ctx.fillStyle = hexWithAlpha(colorRef.current, alpha);
      const r = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawDrip = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
    const length = Math.random() * 60 + 40;
    const segments = Math.floor(length / 4);
    for (let i = 0; i < segments; i++) {
      const yy = y + i * 4;
      const alpha = Math.max(0, 1 - i / segments) * 0.5;
      ctx.fillStyle = hexWithAlpha(colorRef.current, alpha);
      const r = 2 + Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x + (Math.random() - 0.5) * 4, yy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const hexWithAlpha = (hex: string, alpha: number) =>
    hex +
    Math.floor(alpha * 255)
      .toString(16)
      .padStart(2, "0");

  const clearAll = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };
  // ---------- render ----------
  return (
    <div className="relative w-full h-full select-none">
      <div className="absolute inset-0 bg-[url('/images/graffiti-background-2.webp')] bg-cover bg-center opacity-99 -z-10 pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair touch-none opacity-80"
        onPointerDown={() => (sprayingRef.current = true)}
        onPointerUp={() => (sprayingRef.current = false)}
        onPointerLeave={() => (sprayingRef.current = false)}
      />
      <div className="absolute top-4 left-4 flex gap-3 bg-black/30 p-3 text-white">
        {["#2c2c2c", "#f5f5f5", "#722F37", "#B58E58"].map((c) => (
          <button
            key={c}
            className="w-6 h-6 rounded-full"
            style={{ background: c }}
            onClick={() => setColor(c)}
          />
        ))}
        <button
          onClick={clearAll}
          className="ml-2 px-3 py-1 text-sm uppercase font-archivo font-[800] tracking-widest bg-primary1 hover:bg-primary2 rounded shadow"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
