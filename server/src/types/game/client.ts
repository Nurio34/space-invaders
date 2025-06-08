export type CanvasSizeType = { width: number; height: number };

export type MoveArrayType = ("right" | "left" | "up" | "down")[];
export type VelocityType = { x: number; y: number };

export interface ClientToServerEvents {
  resetCanvas: (action: {
    roomId: string;
    socketId: string;
    width: number;
    height: number;
  }) => void;
  gameStart: (action: {
    roomId: string;
    socketId: string;
    name: string;
    maxPlayers: number;
    canvasSize: CanvasSizeType;
  }) => void;
  move: (action: {
    roomId: string;
    socketId: string;
    moveArray: MoveArrayType;
    velocity: VelocityType;
  }) => void;
  shot: (action: { roomId: string; socketId: string }) => void;
  continue: (action: { roomId: string; socketId: string }) => void;
  leaveRequest: (action: { roomId: string; socketId: string }) => void;
}
