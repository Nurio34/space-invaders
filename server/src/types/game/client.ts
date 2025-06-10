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
  shoot: (action: {
    roomId: string;
    socketId: string;
    isShooting: boolean;
  }) => void;
  continue: (action: {
    roomId: string;
    socketId: string;
    canvasSize: CanvasSizeType;
  }) => void;
  leaveRequest: (action: { roomId: string; socketId: string }) => void;
}
