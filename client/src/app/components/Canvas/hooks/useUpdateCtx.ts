import { useGlobalContext } from "@/app/Context";
import { useCallback, useEffect } from "react";

export const useUpdateCtx = () => {
  const { CanvasRef, CtxRef, isAllAssetsLoaded, setCanvasSize } =
    useGlobalContext();

  const updateCtx = useCallback(() => {
    if (!CanvasRef.current || !isAllAssetsLoaded) return;

    const canvas = CanvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    CtxRef.current = ctx;
    setCanvasSize({ width: canvas.width, height: canvas.height });
  }, [CanvasRef, CtxRef, isAllAssetsLoaded]);

  useEffect(() => {
    updateCtx();

    window.addEventListener("resize", updateCtx);

    return () => window.removeEventListener("resize", updateCtx);
  }, [updateCtx]);
};
