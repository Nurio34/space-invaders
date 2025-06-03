export interface ClientToServerEvents {
  gameStart: (action: {
    roomId: string;
    name: string;
    maxPlayers: number;
  }) => void;
  move: (action: {
    directionArray: ("right" | "left" | "up" | "down")[];
  }) => void;
  shot: (action: { isShooting: boolean }) => void;
}
