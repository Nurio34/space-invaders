import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useDrawBullets = () => {
  const { CtxRef, socketId, gameState, assets } = useGlobalContext();

  useEffect(() => {
    const ctx = CtxRef.current;
    const { bulletImg } = assets;

    if (!socketId || !ctx || !gameState.id || !bulletImg) return;

    const { bullets } = gameState;

    bullets.forEach((bullet) => {
      if (bullet.id === socketId) return;
      const { x, y, width, height } = bullet;
      ctx.drawImage(bulletImg.el, x, y, width, height);
    });
  }, [CtxRef, socketId, gameState, assets]);
};
