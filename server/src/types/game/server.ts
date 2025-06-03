import { Bullet } from "../../objects/bullet";
import { Player } from "../../objects/player";
import { CanvasSizeType } from "./client";

export type RoomType = {
  id: string;
  maxPlayers: number;
  players: Record<string, Player>;
  bullets: Bullet[];
  canvasSize: { width: number; height: number };
};

export type GameStateType = RoomType;

export interface ServerToClientEvents {
  gameState: (state: GameStateType) => void;
}
