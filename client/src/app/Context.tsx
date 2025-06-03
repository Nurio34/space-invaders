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
import { ServerToClientEvents } from "./types/game/server";
import { ClientToServerEvents } from "./types/game/client";

interface AssetsType {
  arrowImg: string | null;
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

export type RoomIdType = string | null;

interface ContextType {
  assets: AssetsType;
  setAssets: Dispatch<SetStateAction<AssetsType>>;
  isAllAssetsLoaded: boolean;
  SocketRef: RefObject<SocketType | null>;
  roomId: RoomIdType;
  setRoomId: Dispatch<SetStateAction<RoomIdType>>;
  isGameStarted: boolean;
  setIsGameStarted: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [assets, setAssets] = useState<AssetsType>({
    arrowImg: null,
  });
  const isAllAssetsLoaded = Object.values(assets).every((asset) => asset);

  const SocketRef = useRef<SocketType>(null);

  const [roomId, setRoomId] = useState<RoomIdType>(null);

  const [isGameStarted, setIsGameStarted] = useState(false);

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
