import { useGlobalContext } from "@/app/Context";
import { useEffect, useRef } from "react";

export const useResetCanvas = () => {
  const { CtxRef, isGameStarted, canvasSize, assets } = useGlobalContext();
  const offsetYRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const ctx = CtxRef.current;
    const { spaceImg } = assets;
    const { width, height } = canvasSize;

    if (!ctx || !spaceImg || isGameStarted) return;

    const draw = () => {
      const imgHeight = height;

      offsetYRef.current += 1; // scroll speed

      if (offsetYRef.current >= imgHeight) {
        offsetYRef.current = 0;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(spaceImg.el, 0, offsetYRef.current, width, height);
      ctx.drawImage(
        spaceImg.el,
        0,
        offsetYRef.current - imgHeight,
        width,
        height
      );

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [CtxRef, isGameStarted, canvasSize, assets]);
};
