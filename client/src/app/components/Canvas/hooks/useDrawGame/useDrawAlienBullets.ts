import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useDrawAlienBullets = () => {
  const { CtxRef, socketId, gameState } = useGlobalContext();

  useEffect(() => {
    const ctx = CtxRef.current;

    if (!socketId || !ctx || !gameState.id) return;

    const { alienBullets } = gameState;

    alienBullets.forEach((alienBullet) => {
      const { x, y, width, height, alien } = alienBullet;
      ctx.fillStyle = `rgb(${alien.color})`;
      ctx.fillRect(x, y, width, height);
    });
  }, [CtxRef, socketId, gameState]);
};
