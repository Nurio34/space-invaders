"use client";

import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";

export function AssetsLoader() {
  const { setAssets } = useGlobalContext();

  useEffect(() => {
    const arrowImg = new Image();
    arrowImg.src = "/arrow.webp";
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

    const spaceImg = new Image();
    spaceImg.src = "/space.webp";
    spaceImg.onload = () =>
      setAssets((prev) => ({
        ...prev,
        spaceImg: { el: spaceImg, src: spaceImg.src },
      }));

    const bulletImg = new Image();
    bulletImg.src = "/bullet.webp";
    bulletImg.onload = () =>
      setAssets((prev) => ({
        ...prev,
        bulletImg: { el: bulletImg, src: bulletImg.src },
      }));

    const ordinaryAlien = new Image();
    ordinaryAlien.src = "/aliens/ordinary.webp";
    ordinaryAlien.onload = () =>
      setAssets((prev) => ({
        ...prev,
        ordinaryAlien: { el: ordinaryAlien, src: ordinaryAlien.src },
      }));
  }, [setAssets]);

  return <div hidden />;
}
