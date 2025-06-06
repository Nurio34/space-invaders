import { useGlobalContext } from "@/app/Context";
import { useEffect, useRef } from "react";

export const useShooting = () => {
  const {
    setIsShooting,
    isGameStarted,
    roomId,
    socketId,
    isShooting,
    SocketRef,
  } = useGlobalContext();

  const shootingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isGameStarted || !roomId || !socketId) return;

    const handleMouseDown = () => setIsShooting(true);
    window.addEventListener("mousedown", handleMouseDown);

    const handleMouseUp = () => setIsShooting(false);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isGameStarted, roomId, socketId, setIsShooting]);

  useEffect(() => {
    if (!isShooting && shootingInterval.current) {
      shootingInterval.current = null;
      return;
    } else {
      shootingInterval.current = setInterval(() => {
        const socket = SocketRef.current;
        if (!socket || !roomId || !socketId) return;
        socket.emit("shot", { roomId, socketId });
      }, 1000 / 18);
    }

    return () => {
      if (shootingInterval.current) clearInterval(shootingInterval.current);
    };
  }, [isShooting, SocketRef, socketId]);
};
