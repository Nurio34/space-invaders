"use client";

import { useGlobalContext } from "@/app/Context";
import { useDrawGame } from "./hooks/useDrawGame";
import { useUpdateCtx } from "./hooks/useUpdateCtx";

export function Canvas() {
  const { CanvasRef, isGameStarted } = useGlobalContext();

  useUpdateCtx();
  useDrawGame();

  return (
    <canvas
      ref={CanvasRef}
      className={`fixed w-screen h-screen ${
        isGameStarted ? "cursor-none" : ""
      }`}
    />
  );
}
