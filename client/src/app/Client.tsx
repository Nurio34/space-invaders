"use client";

import AssetsLoader from "./components/AssetsLoader";
import Home from "./components/Home";
import Socket from "./components/Socket";
import { useGlobalContext } from "./Context";

export default function Client() {
  const {} = useGlobalContext();

  return (
    <div className="w-screen h-screen max-h-screen overflow-hidden">
      <AssetsLoader />
      <Socket />
      <Home />
    </div>
  );
}
