import { RoomType } from "../types/game/server";

export const detectAlienPassBorder = (room: RoomType) => {
  const canvasHeight = room.canvasSize.height;

  for (const alien of room.aliens) {
    if (alien.y + alien.height >= canvasHeight) {
      if (alien.isPassBorder) continue;

      Object.values(room.players).forEach((player) => {
        if (!player.isPlayerDead()) {
          player.decreaseLife();
        }
      });

      alien.isPassBorder = true;
    }
  }
};
