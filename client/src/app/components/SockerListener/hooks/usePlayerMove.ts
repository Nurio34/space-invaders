import { useGlobalContext } from "@/app/Context";
import { useEffect, useRef, useState } from "react";
import { MoveArrayType } from "@/app/types/game/client";

export const usePlayerMove = () => {
  const {
    isGameStarted,
    roomId,
    socketId,
    SocketRef,
    gameState,
    moveArrayRef,
    velocityRef,
  } = useGlobalContext();

  const lifeRef = useRef(3);

  // Optional: store moveArray in state for UI or dev debugging
  const [, setMoveArray] = useState<MoveArrayType>([]);

  useEffect(() => {
    if (socketId && gameState.id && gameState.players[socketId]) {
      lifeRef.current = gameState.players[socketId].life;
    }
  }, [gameState, socketId]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      setMoveArray((prev) => {
        let updated = [...prev];

        switch (key) {
          case "w":
            if (!updated.includes("up")) {
              updated = updated.filter((d) => d !== "down");
              updated.push("up");
            }
            break;
          case "s":
            if (!updated.includes("down")) {
              updated = updated.filter((d) => d !== "up");
              updated.push("down");
            }
            break;
          case "d":
            if (!updated.includes("right")) {
              updated = updated.filter((d) => d !== "left");
              updated.push("right");
            }
            break;
          case "a":
            if (!updated.includes("left")) {
              updated = updated.filter((d) => d !== "right");
              updated.push("left");
            }
            break;
          default:
            return prev;
        }

        moveArrayRef.current = updated;
        return updated;
      });
    };

    const handleKeyup = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      setMoveArray((prev) => {
        const updated = prev.filter((dir) => {
          if (key === "w") return dir !== "up";
          if (key === "s") return dir !== "down";
          if (key === "d") return dir !== "right";
          if (key === "a") return dir !== "left";
          return true;
        });
        moveArrayRef.current = updated;
        return updated;
      });
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [moveArrayRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameStarted || !roomId || !socketId) return;
      if (lifeRef.current <= 0) return;

      const socket = SocketRef.current;
      if (!socket) return;

      socket.emit("move", {
        roomId,
        socketId,
        moveArray: moveArrayRef.current,
        velocity: velocityRef.current,
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isGameStarted, roomId, socketId, SocketRef, moveArrayRef, velocityRef]);
};
