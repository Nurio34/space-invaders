import { Alien } from "../../objects/alien";
import { AlienBullet } from "../../objects/alienBullet";
import { Bullet } from "../../objects/bullet";
import { Player } from "../../objects/player";
import { CanvasSizeType } from "./client";

export type RoomType = {
  id: string;
  maxPlayers: number;
  canvasSize: CanvasSizeType;
  players: Record<string, Player>;
  bullets: Bullet[];
  aliens: Alien[];
  alienBullets: AlienBullet[];
};

export type GameStateType = RoomType;

export interface ServerToClientEvents {
  gameState: (state: GameStateType) => void;
  leave: () => void;
}
