import { useClearRect } from "./useClearRect";
import { useDrawShips } from "./useDrawShips";
import { useDrawBullets } from "./useDrawBullets";
import { useDrawAliens } from "./useDrawAliens";
import { useDrawPlayerLife } from "./useDrawPlayerLife";
import { useResetCanvas } from "./useResetCanvas";
import { useDrawAlienBullets } from "./useDrawAlienBullets";
import { useDrawScore } from "./useDrawScore";

export const useDrawGame = () => {
  useClearRect();

  useDrawShips();
  useDrawBullets();
  useDrawAliens();
  useDrawAlienBullets();
  useDrawPlayerLife();
  useDrawScore();

  // useDrawMoveController();

  useResetCanvas();
};
