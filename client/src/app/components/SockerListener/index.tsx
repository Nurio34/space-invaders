"use client";

import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export function SockerListener() {
  const {
    SocketRef,
    isGameStarted,
    setIsGameStarted,
    canvasSize,
    setGameState,
    roomId,
    socketId,
  } = useGlobalContext();

  useEffect(() => {
    const socket = SocketRef.current;

    if (!socket) return;

    socket.on("gameState", (gameState) => {
      if (!isGameStarted) setIsGameStarted(true);
      else setGameState(gameState);
    });
  }, [isGameStarted]);

  useEffect(() => {
    const socket = SocketRef.current;

    if (!socket || !roomId || !socketId) return;

    const { width, height } = canvasSize;

    socket.emit("resetCanvas", { roomId, socketId, width, height });
  }, [canvasSize, roomId, socketId]);

  return <div hidden />;
}
