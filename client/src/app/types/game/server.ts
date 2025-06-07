import { Player } from "@/../../server/src/objects/player";
import { Bullet } from "@/../../server/src/objects/bullet";
import { Alien } from "@/../../server/src/objects/alien";
import { AlienBullet } from "@/../../server/src/objects/alienBullet";
import { CanvasSizeType } from "@/app/Context";

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
