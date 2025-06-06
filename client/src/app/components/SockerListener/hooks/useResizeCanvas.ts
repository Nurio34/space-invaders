import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useResizeCanvas = () => {
  const { SocketRef, roomId, socketId, canvasSize } = useGlobalContext();

  useEffect(() => {
    const socket = SocketRef.current;

    if (!socket || !roomId || !socketId) return;

    const { width, height } = canvasSize;

    socket.emit("resetCanvas", { roomId, socketId, width, height });
  }, [canvasSize, roomId, socketId, SocketRef]);
};
