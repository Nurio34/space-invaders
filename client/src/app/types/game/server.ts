import { Player } from "@/../../server/src/objects/player";
import { Bullet } from "@/../../server/src/objects/bullet";
import { Alien } from "@/../../server/src/objects/alien";
import { CanvasSizeType } from "@/app/Context";

export type RoomType = {
  id: string;
  maxPlayers: number;
  canvasSize: CanvasSizeType;
  players: Record<string, Player>;
  bullets: Bullet[];
  aliens: Alien[];
};

export type GameStateType = RoomType;

export interface ServerToClientEvents {
  gameState: (state: GameStateType) => void;
}
