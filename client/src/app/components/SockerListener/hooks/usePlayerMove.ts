import { useGlobalContext } from "@/app/Context";
import { useEffect, useRef } from "react";
import throttle from "lodash/throttle";

export const usePlayerMove = () => {
  const { isGameStarted, roomId, socketId, SocketRef, gameState } =
    useGlobalContext();

  const lifeRef = useRef(3);

  useEffect(() => {
    if (socketId && gameState.id && gameState.players[socketId]) {
      lifeRef.current = gameState.players[socketId].life;
    }
  }, [gameState, socketId]);

  useEffect(() => {
    if (!isGameStarted || !roomId || !socketId) return;

    const throttledMove = throttle((e: MouseEvent) => {
      if (lifeRef.current <= 0) return;

      const socket = SocketRef.current;
      if (!socket) return;

      socket.emit("move", {
        roomId,
        socketId,
        x: e.clientX,
        y: e.clientY,
      });
    }, 1000 / 60);

    window.addEventListener("mousemove", throttledMove);

    return () => {
      window.removeEventListener("mousemove", throttledMove);
      throttledMove.cancel();
    };
  }, [isGameStarted, roomId, socketId, SocketRef]);
};
