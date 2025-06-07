import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useDrawAliens = () => {
  const { CtxRef, socketId, gameState, assets } = useGlobalContext();

  useEffect(() => {
    const ctx = CtxRef.current;
    const { ordinaryAlien } = assets;
    if (!socketId || !ctx || !gameState.id || !ordinaryAlien) return;

    const { aliens } = gameState;

    aliens.forEach((alien) => {
      const { width, height, x, y } = alien;

      ctx.drawImage(ordinaryAlien.el, x, y, width, height);
    });
  }, [CtxRef, socketId, gameState, assets]);
};
