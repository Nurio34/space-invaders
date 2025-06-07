import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export const useLeaveRoom = () => {
  const { SocketRef, setIsGameStarted, setIsPlayerDead } = useGlobalContext();

  useEffect(() => {
    const socket = SocketRef.current;

    if (!socket) return;

    socket.on("leave", () => {
      setIsGameStarted(false);
      setIsPlayerDead(false);
    });
  }, [SocketRef, setIsGameStarted, setIsPlayerDead]);
};
