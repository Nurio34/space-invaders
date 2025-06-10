import { useGlobalContext } from "@/app/Context";
import { useEffect, useState } from "react";

type ShootTouchEventType = {
  radius: number;
  center: { x: number; y: number };
  isPressed: boolean;
};

export const useDrawShootController = () => {
  const { CtxRef, canvasSize, isGameStarted, setIsShooting, gameState } =
    useGlobalContext();

  const shootRadius = 40;
  const margin = 20;

  const [touchState, setTouchState] = useState<ShootTouchEventType>({
    radius: shootRadius,
    center: { x: 0, y: 0 },
    isPressed: false,
  });

  // Set position (right-bottom corner)
  useEffect(() => {
    setTouchState((prev) => ({
      ...prev,
      center: {
        x: canvasSize.width - shootRadius - margin,
        y: canvasSize.height - shootRadius - margin,
      },
    }));
  }, [canvasSize]);

  // Draw shoot button
  useEffect(() => {
    const ctx = CtxRef.current;
    if (!ctx) return;

    const draw = () => {
      const { center, radius, isPressed } = touchState;

      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = isPressed ? "red" : "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (isPressed) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
        ctx.fill();
      }
    };

    draw();
  }, [CtxRef, touchState, gameState]);

  // Touch handlers
  useEffect(() => {
    const ctx = CtxRef.current;
    if (!ctx || !isGameStarted) return;
    const canvas = ctx.canvas;
    const { center, radius } = touchState;

    const isInside = (x: number, y: number) => {
      const dx = x - center.x;
      const dy = y - center.y;
      return Math.sqrt(dx * dx + dy * dy) <= radius;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const secondTouch = e.touches[1];

      if (!secondTouch) return;

      const x = e.touches[1].clientX;
      const y = e.touches[1].clientY;
      if (isInside(x, y)) {
        setTouchState((prev) => ({ ...prev, isPressed: true }));
        setIsShooting(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const secondTouch = e.touches[1];

      if (!secondTouch) return;

      const x = e.touches[1].clientX;
      const y = e.touches[1].clientY;
      const inside = isInside(x, y);

      setTouchState((prev) => ({ ...prev, isPressed: inside }));
      setIsShooting(inside);
    };

    const handleTouchEnd = () => {
      setTouchState((prev) => ({ ...prev, isPressed: false }));
      setIsShooting(false);
    };

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [CtxRef, touchState, isGameStarted, setIsShooting]);
};
