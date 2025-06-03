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

    if (!socket) return;

    const { width, height } = canvasSize;

    socket.emit("resetCanvas", { width, height });
  }, [canvasSize]);

  return <div hidden />;
}
