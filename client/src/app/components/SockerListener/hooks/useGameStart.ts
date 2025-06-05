import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useGameStart = () => {
  const { SocketRef, isGameStarted, setIsGameStarted, setGameState } =
    useGlobalContext();

  useEffect(() => {
    const socket = SocketRef.current;

    if (!socket) return;

    socket.on("gameState", (gameState) => {
      if (!isGameStarted) setIsGameStarted(true);
      else setGameState(gameState);
    });
  }, [isGameStarted]);
};
