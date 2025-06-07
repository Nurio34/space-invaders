export type CanvasSizeType = { width: number; height: number };

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
    x: number;
    y: number;
  }) => void;
  shot: (action: { roomId: string; socketId: string }) => void;
  continue: (action: { roomId: string; socketId: string }) => void;
  leaveRequest: (action: { roomId: string; socketId: string }) => void;
}
