import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useDrawShips = () => {
  const { CtxRef, socketId, gameState, assets, moveArrayRef, velocityRef } =
    useGlobalContext();

  useEffect(() => {
    const ctx = CtxRef.current;
    const { shipImg } = assets;

    if (!socketId || !ctx || !gameState.id || !shipImg) return;

    const { players } = gameState;

    Object.values(players).forEach((player) => {
      // if (player.id === socketId) return;
      const { size, x, y } = player;
      if (player.life <= 0) return;
      ctx.drawImage(shipImg.el, x, y, size, size);
    });
  }, [CtxRef, socketId, gameState, assets, moveArrayRef, velocityRef]);
};
