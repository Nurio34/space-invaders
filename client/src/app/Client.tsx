"use client";

import { AssetsLoader } from "./components/AssetsLoader";
import { SocketInitilizer } from "./components/Socket";
import { Home } from "./components/Home";
import { Canvas } from "./components/Canvas";
import { SockerListener } from "./components/SockerListener";
import { useGlobalContext } from "./Context";

export default function Client() {
  return (
    <div className="w-screen h-screen max-h-screen overflow-hidden">
      <AssetsLoader />
      <SocketInitilizer />
      <Home />
      <Canvas />
      <SockerListener />
    </div>
  );
}
