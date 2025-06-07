import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useDrawShips = () => {
  const { CtxRef, socketId, gameState, assets } = useGlobalContext();

  useEffect(() => {
    const ctx = CtxRef.current;
    const { shipImg } = assets;

    if (!socketId || !ctx || !gameState.id) return;

    const { players } = gameState;

    Object.values(players).forEach((player) => {
      const { size, x, y } = player;
      if (player.life <= 0) return;
      if (shipImg) {
        ctx.drawImage(shipImg.el, x, y, size, size);
      }
    });
  }, [CtxRef, socketId, gameState, assets]);
};
