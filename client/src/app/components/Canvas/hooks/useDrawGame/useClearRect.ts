//

import { useGlobalContext } from "@/app/Context";
import { useEffect, useRef } from "react";

export const useClearRect = () => {
  const { CtxRef, socketId, gameState, canvasSize, assets } =
    useGlobalContext();

  const offsetYRef = useRef(0);

  useEffect(() => {
    const ctx = CtxRef.current;
    const { spaceImg } = assets;

    if (!ctx || !socketId || !gameState?.id || !spaceImg?.el) return;

    const { width, height } = canvasSize;
    const imgHeight = height; // Assuming background image matches canvas height

    // Scroll the background downward
    offsetYRef.current += 1; // scroll speed
    if (offsetYRef.current >= imgHeight) {
      offsetYRef.current = 0;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);
    offsetYRef.current += 1; // scroll speed

    if (offsetYRef.current >= imgHeight) {
      offsetYRef.current = 0;
    }
    // Draw the scrolling background
    ctx.drawImage(spaceImg.el, 0, offsetYRef.current, width, height);
    ctx.drawImage(
      spaceImg.el,
      0,
      offsetYRef.current - imgHeight,
      width,
      height
    );
  }, [CtxRef, socketId, gameState, canvasSize, assets]);
};
