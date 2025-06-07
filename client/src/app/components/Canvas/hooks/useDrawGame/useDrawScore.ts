import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useDrawScore = () => {
  const { CtxRef, socketId, gameState, canvasSize } = useGlobalContext();

  useEffect(() => {
    const ctx = CtxRef.current;

    if (!socketId || !ctx || !gameState.id) return;

    const { width } = canvasSize;

    const player = gameState.players[socketId];

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";

    // Draw the score in the top-right corner with some padding
    ctx.fillText(`Score: ${player.score || 0}`, width - 20, 10);
  }, [CtxRef, socketId, gameState, canvasSize]);
};
