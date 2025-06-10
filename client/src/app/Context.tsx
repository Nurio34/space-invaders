"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { Socket } from "socket.io-client";
import { RoomType, ServerToClientEvents } from "./types/game/server";
import {
  ClientToServerEvents,
  MoveArrayType,
  VelocityType,
} from "./types/game/client";

interface AssetsType {
  arrowImg: { el: HTMLImageElement; src: string } | null;
  shipImg: { el: HTMLImageElement; src: string } | null;
  spaceImg: { el: HTMLImageElement; src: string } | null;
  bulletImg: { el: HTMLImageElement; src: string } | null;
  ordinaryAlien: { el: HTMLImageElement; src: string } | null;
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

export type RoomIdType = string | null;

export type CanvasSizeType = { width: number; height: number };

interface ContextType {
  assets: AssetsType;
  setAssets: Dispatch<SetStateAction<AssetsType>>;
  isAllAssetsLoaded: boolean;
  SocketRef: RefObject<SocketType | null>;
  roomId: RoomIdType;
  setRoomId: Dispatch<SetStateAction<RoomIdType>>;
  isGameStarted: boolean;
  setIsGameStarted: Dispatch<SetStateAction<boolean>>;
  CanvasRef: RefObject<HTMLCanvasElement | null>;
  CtxRef: RefObject<CanvasRenderingContext2D | null>;
  canvasSize: CanvasSizeType;
  setCanvasSize: Dispatch<SetStateAction<CanvasSizeType>>;
  socketId: string | undefined;
  setSocketId: Dispatch<SetStateAction<string | undefined>>;
  gameState: RoomType;
  setGameState: Dispatch<SetStateAction<RoomType>>;
  isShooting: boolean;
  setIsShooting: Dispatch<SetStateAction<boolean>>;
  isPlayerDead: boolean;
  setIsPlayerDead: Dispatch<SetStateAction<boolean>>;
  moveArrayRef: RefObject<MoveArrayType>;
  velocityRef: RefObject<VelocityType>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [assets, setAssets] = useState<AssetsType>({
    arrowImg: null,
    shipImg: null,
    spaceImg: null,
    bulletImg: null,
    ordinaryAlien: null,
  });
  const isAllAssetsLoaded = Object.values(assets).every((asset) => asset);

  const SocketRef = useRef<SocketType>(null);

  const [roomId, setRoomId] = useState<RoomIdType>(null);

  const [isGameStarted, setIsGameStarted] = useState(false);
  console.log({ isGameStarted });

  const CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const CtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSizeType>({
    width: 0,
    height: 0,
  });

  const [socketId, setSocketId] = useState<string | undefined>(undefined);

  const [gameState, setGameState] = useState<RoomType>({} as RoomType);

  const [isShooting, setIsShooting] = useState(false);

  const [isPlayerDead, setIsPlayerDead] = useState(false);

  const moveArrayRef = useRef<MoveArrayType>([]);
  const velocityRef = useRef<VelocityType>({ x: 1, y: 1 });

  return (
    <Context.Provider
      value={{
        assets,
        setAssets,
        isAllAssetsLoaded,
        SocketRef,
        roomId,
        setRoomId,
        isGameStarted,
        setIsGameStarted,
        CanvasRef,
        CtxRef,
        canvasSize,
        setCanvasSize,
        socketId,
        setSocketId,
        gameState,
        setGameState,
        isShooting,
        setIsShooting,
        isPlayerDead,
        setIsPlayerDead,
        moveArrayRef,
        velocityRef,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useGlobalContext must be used within a Provider");
  return context;
};
