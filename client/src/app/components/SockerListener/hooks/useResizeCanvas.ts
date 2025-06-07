import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useResizeCanvas = () => {
  const { SocketRef, roomId, socketId, canvasSize, isGameStarted } =
    useGlobalContext();

  useEffect(() => {
    const socket = SocketRef.current;

    if (!socket || !roomId || !socketId || !isGameStarted) return;

    const { width, height } = canvasSize;

    socket.emit("resetCanvas", { roomId, socketId, width, height });
  }, [canvasSize, roomId, socketId, SocketRef, isGameStarted]);
};
