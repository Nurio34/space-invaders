"use client";

import { AssetsLoader } from "./components/AssetsLoader";
import { SocketInitilizer } from "./components/Socket";
import { Home } from "./components/Home";
import { Canvas } from "./components/Canvas";
import { SockerListener } from "./components/SockerListener";
import PlayerDead from "./components/PlayerDead";
import MoveController from "./components/Canvas/MoveController";
import ShootController from "./components/Canvas/ShootController";
import { useEffect } from "react";

export default function Client() {
  useEffect(() => {
    const preventGesture = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    document.addEventListener("touchmove", preventGesture, { passive: false });
    return () => {
      document.removeEventListener("touchmove", preventGesture);
    };
  }, []);

  return (
    <div className="w-screen h-screen max-h-screen overflow-hidden">
      <AssetsLoader />
      <SocketInitilizer />
      <Home />
      <Canvas />
      <SockerListener />
      <PlayerDead />
      <MoveController />
      <ShootController />
    </div>
  );
}
