"use client";

import { useGameStart } from "./hooks/useGameStart";
import { useResizeCanvas } from "./hooks/useResizeCanvas";
import { usePlayerMove } from "./hooks/usePlayerMove";
import { useShooting } from "./hooks/useShooting";

export function SockerListener() {
  useGameStart();
  useResizeCanvas();
  usePlayerMove();
  useShooting();

  return <div hidden />;
}
