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
    gameState,
  } = useGlobalContext();

  const shootingInterval = useRef<NodeJS.Timeout | null>(null);

  const lifeRef = useRef(3);

  useEffect(() => {
    if (socketId && gameState.id && gameState.players[socketId]) {
      lifeRef.current = gameState.players[socketId].life;
    }
  }, [gameState, socketId]);

  useEffect(() => {
    if (!isGameStarted || !roomId || !socketId) return;

    const handleMouseDown = () => setIsShooting(true);
    const handleMouseUp = () => setIsShooting(false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isGameStarted, roomId, socketId, setIsShooting]);

  useEffect(() => {
    if (shootingInterval.current) {
      clearInterval(shootingInterval.current);
      shootingInterval.current = null;
    }

    // if (isShooting) {
    //   shootingInterval.current = setInterval(() => {
    //     const socket = SocketRef.current;
    //     if (!socket || !roomId || !socketId) return;
    //     if (lifeRef.current <= 0) return;

    //     socket.emit("shot", { roomId, socketId });
    //   }, 1000 / 18);
    // }

    return () => {
      if (shootingInterval.current) {
        clearInterval(shootingInterval.current);
        shootingInterval.current = null;
      }
    };
  }, [isShooting, socketId, roomId, SocketRef]);
};
