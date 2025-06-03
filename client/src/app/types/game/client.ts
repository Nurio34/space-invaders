import { CanvasSizeType } from "@/app/Context";

export interface ClientToServerEvents {
  resetCanvas: (action: { width: number; height: number }) => void;
  gameStart: (action: {
    roomId: string;
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
}
