import { useGlobalContext } from "@/app/Context";
import { MoveArrayType } from "@/app/types/game/client";
import { useEffect, useState } from "react";

type TouchEventType = {
  innerCircleRadius: number;
  outerCircleRadius: number;
  isDragStart: boolean;
  center: { x: number; y: number };
  offSet: { x: number; y: number };
  position: { x: number; y: number };
};

export const useDrawMoveController = () => {
  const {
    CtxRef,
    canvasSize,
    gameState,
    isGameStarted,
    moveArrayRef,
    velocityRef,
  } = useGlobalContext();

  const centerParameter = 75;
  const fingerRadius = 25;

  const [touchEvent, setTouchEvent] = useState<TouchEventType>({
    innerCircleRadius: 25,
    outerCircleRadius: 50,
    isDragStart: false,
    center: { x: 0, y: 0 },
    offSet: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
  });

  // Set center position
  useEffect(() => {
    setTouchEvent((prev) => ({
      ...prev,
      center: {
        x: centerParameter,
        y: canvasSize.height - centerParameter,
      },
      offSet: {
        x: centerParameter,
        y: canvasSize.height - centerParameter,
      },
    }));
  }, [canvasSize]);

  // Draw joystick with animation frame
  useEffect(() => {
    const ctx = CtxRef.current;
    if (!ctx) return;

    const draw = () => {
      const { outerCircleRadius, innerCircleRadius, center, offSet } =
        touchEvent;

      // Outer circle
      ctx.beginPath();
      ctx.arc(center.x, center.y, outerCircleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner circle
      ctx.beginPath();
      ctx.arc(offSet.x, offSet.y, innerCircleRadius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    };

    draw();
  }, [CtxRef, touchEvent, gameState]);

  // Touch handlers
  useEffect(() => {
    const ctx = CtxRef.current;
    if (!ctx || !isGameStarted) return;

    const canvas = ctx.canvas;
    const { outerCircleRadius, center } = touchEvent;

    const handleTouchStart = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const inBounds =
        x >= center.x - outerCircleRadius - fingerRadius &&
        x <= center.x + outerCircleRadius + fingerRadius &&
        y >= center.y - outerCircleRadius - fingerRadius &&
        y <= center.y + outerCircleRadius + fingerRadius;

      if (inBounds) {
        setTouchEvent((prev) => ({ ...prev, isDragStart: true }));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // if (!touchEvent.isDragStart) return;

      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      const deltaX = x - center.x;
      const deltaY = y - center.y;

      // Calculate normalized velocities
      const vX = Math.min(1, Math.abs(deltaX / outerCircleRadius));
      const vY = Math.min(1, Math.abs(deltaY / outerCircleRadius));
      velocityRef.current = { x: vX, y: vY };

      // Determine direction(s)
      const newDirections: MoveArrayType = [];
      if (deltaX > 10) newDirections.push("right");
      if (deltaX < -10) newDirections.push("left");
      if (deltaY > 10) newDirections.push("down");
      if (deltaY < -10) newDirections.push("up");
      moveArrayRef.current = newDirections;

      // Restrict offset inside joystick area
      const limit = outerCircleRadius;
      const clamp = (val: number, min: number, max: number) =>
        Math.max(min, Math.min(max, val));

      const clampedX = clamp(deltaX, -limit, limit);
      const clampedY = clamp(deltaY, -limit, limit);

      setTouchEvent((prev) => ({
        ...prev,
        offSet: { x: center.x + clampedX, y: center.y + clampedY },
      }));
    };

    const handleTouchEnd = () => {
      setTouchEvent((prev) => ({
        ...prev,
        isDragStart: false,
        offSet: { x: prev.center.x, y: prev.center.y },
      }));
      moveArrayRef.current = [];
      velocityRef.current = { x: 0, y: 0 };
    };

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);
    console.log("ok");

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [CtxRef, touchEvent, isGameStarted, moveArrayRef, velocityRef]);
};
