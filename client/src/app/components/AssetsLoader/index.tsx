"use client";

import { useGlobalContext } from "@/app/Context";
import { useEffect, useState } from "react";

function AssetsLoader() {
  const { assets, setAssets } = useGlobalContext();

  useEffect(() => {
    const arrowImg = new Image();
    arrowImg.src = "/arrow.png";
    arrowImg.onload = () =>
      setAssets((prev) => ({ ...prev, arrowImg: arrowImg.src }));
  }, []);

  return <div />;
}
export default AssetsLoader;
