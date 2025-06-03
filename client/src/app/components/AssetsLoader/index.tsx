"use client";

import { useGlobalContext } from "@/app/Context";
import { useEffect, useState } from "react";

export function AssetsLoader() {
  const { assets, setAssets } = useGlobalContext();

  useEffect(() => {
    const arrowImg = new Image();
    arrowImg.src = "/arrow.png";
    arrowImg.onload = () =>
      setAssets((prev) => ({
        ...prev,
        arrowImg: { el: arrowImg, src: arrowImg.src },
      }));

    const shipImg = new Image();
    shipImg.src = "/ship.webp";
    shipImg.onload = () =>
      setAssets((prev) => ({
        ...prev,
        shipImg: { el: shipImg, src: shipImg.src },
      }));
  }, []);

  return <div hidden />;
}
