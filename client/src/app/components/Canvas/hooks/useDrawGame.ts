import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useDrawGame = () => {
  const { CtxRef, socketId, gameState, canvasSize, assets } =
    useGlobalContext();
  const { shipImg } = assets;

  useEffect(() => {
    const ctx = CtxRef.current;

    if (!socketId || !ctx || !gameState.id) return;

    const { width, height } = canvasSize;
    ctx.clearRect(0, 0, width, height);

    //! *** draw ships ***
    const { players } = gameState;

    Object.values(players).forEach((player) => {
      const { size, x, y } = player;
      if (player.life <= 0) return;
      if (shipImg) {
        ctx.drawImage(shipImg.el, x, y, size, size);
      }
    });
    //! ******************

    //! *** draw bullets ***
    const { bullets } = gameState;

    bullets.forEach((bullet) => {
      const { x, y, width, height } = bullet;
      ctx.fillStyle = "red";
      ctx.fillRect(x, y, width, height);
    });
    //! ********************

    //! *** drawAliens ***
    const { aliens } = gameState;

    aliens.forEach((alien) => {
      const { width, height, x, y } = alien;
      ctx.fillStyle = "green";
      ctx.fillRect(x, y, width, height);
    });
    //! ******************

    //! *** draw alien bullets ***

    const { alienBullets } = gameState;

    alienBullets.forEach((alienBullet) => {
      const { x, y, width, height } = alienBullet;
      ctx.fillStyle = "blue";
      ctx.fillRect(x, y, width, height);
    });

    //! ***************************

    //! *** draw player lives ***
    // Draw current player's lives at top-left corner
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

    //! *************************
  }, [gameState]);
};
