import { Player } from "@/../../server/src/objects/player";
import { Bullet } from "@/../../server/src/objects/bullet";
import { CanvasSizeType } from "@/app/Context";

export type RoomType = {
  id: string;
  maxPlayers: number;
  players: Record<string, Player>;
  bullets: Bullet[];
  canvasSize: CanvasSizeType;
};

export interface ServerToClientEvents {
  gameState: (state: RoomType) => void;
}
