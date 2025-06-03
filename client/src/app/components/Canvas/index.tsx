"use client";

import { useGlobalContext } from "@/app/Context";
import { useEffect, useCallback } from "react";

export function Canvas() {
  const {
    assets,
    isAllAssetsLoaded,
    CanvasRef,
    CtxRef,
    setCanvasSize,
    gameState,
    socketId,
    canvasSize,
    isGameStarted,
    SocketRef,
    roomId,
  } = useGlobalContext();

  const { shipImg } = assets;

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
    return () => window.removeEventListener("resize", updateCtx); // clean up
  }, [updateCtx]);

  useEffect(() => {
    const ctx = CtxRef.current;

    if (!socketId || !ctx || !gameState.id) return;
    console.log(gameState);

    const { width, height } = canvasSize;
    ctx.clearRect(0, 0, width, height);

    //! *** draw bullets ***
    const { bullets } = gameState;
    bullets.forEach((bullet) => {
      const { x, y, width, height } = bullet;
      ctx.fillStyle = "red";
      ctx.fillRect(x, y, width, height);
    });
    //! ********************

    //! *** draw ship ***
    const { players } = gameState;
    const player = players[socketId];
    const { size, x, y } = player;
    console.log(size);

    ctx.fillStyle = "black";
    if (shipImg) {
      ctx.drawImage(shipImg.el, x, y, size, size);
    }
    //! ******************
  }, [gameState]);

  useEffect(() => {
    if (!isGameStarted || !roomId || !socketId) return;

    const handleMouseMove = (e: MouseEvent) => {
      const socket = SocketRef.current;
      if (!socket) return;

      socket.emit("move", { roomId, socketId, x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isGameStarted, roomId, socketId]);

  useEffect(() => {
    if (!isGameStarted || !roomId || !socketId) return;

    const handleClick = (e: MouseEvent) => {
      const socket = SocketRef.current;
      if (!socket) return;

      socket.emit("shot", { roomId, socketId });
    };
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [isGameStarted, roomId, socketId]);

  return (
    <canvas
      ref={CanvasRef}
      className={`fixed w-screen h-screen ${
        isGameStarted ? "cursor-none" : ""
      }`}
    />
  );
}
