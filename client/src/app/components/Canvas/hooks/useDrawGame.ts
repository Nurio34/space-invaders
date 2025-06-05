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

    //! *** draw ship ***
    const { players } = gameState;
    const player = players[socketId];
    const { size, x, y } = player;

    ctx.fillStyle = "black";
    if (shipImg) {
      ctx.drawImage(shipImg.el, x, y, size, size);
    }
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
  }, [gameState]);
};
