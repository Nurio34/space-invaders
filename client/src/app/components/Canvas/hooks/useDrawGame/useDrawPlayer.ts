import { useGlobalContext } from "@/app/Context";
import { useEffect, useRef } from "react";

export const useDrawPlayer = () => {
  const {
    CtxRef,
    socketId,
    assets,
    moveArrayRef,
    velocityRef,
    gameState,
    isGameStarted,
  } = useGlobalContext();
  const xRef = useRef<number | null>(null); // starting X position
  const yRef = useRef<number | null>(null); // starting Y position

  useEffect(() => {
    const ctx = CtxRef.current;
    const { shipImg } = assets;

    if (!ctx || !shipImg || !socketId || !gameState.id) return;

    const { size } = gameState.players[socketId];
    const canvas = ctx.canvas;

    const draw = () => {
      // Clear canvas

      const moveArray = moveArrayRef.current;
      const velocity = velocityRef.current;

      if (!xRef.current || !yRef.current) return;

      if (moveArray.includes("right")) xRef.current += (velocity.x * size) / 8;
      if (moveArray.includes("left")) xRef.current -= (velocity.x * size) / 8;
      if (moveArray.includes("down")) yRef.current += (velocity.y * size) / 8;
      if (moveArray.includes("up")) yRef.current -= (velocity.y * size) / 8;

      // Clamp player inside canvas
      xRef.current = Math.max(1, Math.min(canvas.width - size, xRef.current)); // assuming 40px ship width
      yRef.current = Math.max(1, Math.min(canvas.height - size, yRef.current)); // assuming 40px ship height

      // Draw player
      ctx.drawImage(shipImg.el, xRef.current, yRef.current, size, size);
    };

    draw();

    return () => {
      // Cleanup if needed
    };
  }, [CtxRef, assets, moveArrayRef, velocityRef, gameState, socketId]);

  useEffect(() => {
    if (
      isGameStarted &&
      xRef.current === null &&
      yRef.current === null &&
      gameState.id &&
      socketId
    ) {
      const { canvasSize } = gameState;
      const { size: playerSize } = gameState.players[socketId];
      xRef.current = canvasSize.width / 2 - playerSize / 2;
      yRef.current = canvasSize.height - playerSize * 2;
    }
  }, [gameState, isGameStarted, socketId, xRef, yRef]);
};
