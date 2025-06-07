"use client";

import { useGlobalContext } from "@/app/Context";
import { useDrawGame } from "./hooks/useDrawGame";
import { useUpdateCtx } from "./hooks/useUpdateCtx";
import { useEffect, useRef } from "react";

export function Canvas() {
  const { CanvasRef, isGameStarted, socketId, gameState } = useGlobalContext();

  //! *** when game starts, hide cursor ***
  const PlayerLife = useRef<number>(3);

  useEffect(() => {
    if (!gameState.id || !socketId) return;
    const playerLife = gameState.players[socketId].life;
    PlayerLife.current = playerLife;
  }, [gameState, socketId]);
  //! *************************************

  useUpdateCtx();
  useDrawGame();

  return (
    <canvas
      ref={CanvasRef}
      className={`fixed w-screen h-screen ${
        isGameStarted && PlayerLife.current > 0 ? "cursor-none" : ""
      }`}
    />
  );
}
