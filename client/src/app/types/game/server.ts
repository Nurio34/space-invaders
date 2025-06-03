export type GameStateType = {
  players: Record<string, any>; // Define more detail if needed
};

export interface ServerToClientEvents {
  gameState: (state: GameStateType) => void;
}
