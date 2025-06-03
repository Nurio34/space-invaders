import { Player } from "../../objects/player";

export type RoomType = {
  id: string;
  players: Record<string, Player>;
  maxPlayers: number;
};

export type GameStateType = {
  rooms: Record<string, RoomType>;
};

export interface ServerToClientEvents {
  gameState: (state: GameStateType) => void;
}
