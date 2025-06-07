import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useDrawPlayerLife = () => {
  const { CtxRef, socketId, gameState } = useGlobalContext();

  useEffect(() => {
    const ctx = CtxRef.current;

    if (!socketId || !ctx || !gameState.id) return;

    const { players } = gameState;

    const player = players[socketId];
    if (player) {
      const margin = 10;
      const heartSize = 10;
      const spacing = 5;

      ctx.font = "14px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      const label = "You";
      const textX = margin;
      const textY = margin;

      ctx.fillStyle = "white";
      ctx.fillText(label, textX, textY);

      for (let i = 0; i < player.life; i++) {
        const heartX = textX + 50 + i * (heartSize + spacing);
        const heartY = textY;

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(heartX, heartY, heartSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [CtxRef, socketId, gameState]);
};
