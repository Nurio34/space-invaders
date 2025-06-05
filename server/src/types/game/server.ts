import { Alien } from "../../objects/alien";
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
};

export type GameStateType = RoomType;

export interface ServerToClientEvents {
  gameState: (state: GameStateType) => void;
}
