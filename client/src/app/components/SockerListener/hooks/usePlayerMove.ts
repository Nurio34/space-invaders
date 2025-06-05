import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const usePlayerMove = () => {
  const { isGameStarted, roomId, socketId, SocketRef } = useGlobalContext();

  useEffect(() => {
    if (!isGameStarted || !roomId || !socketId) return;

    const handleMouseMove = (e: MouseEvent) => {
      const socket = SocketRef.current;
      if (!socket) return;

      socket.emit("move", { roomId, socketId, x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isGameStarted, roomId, socketId]);
};
