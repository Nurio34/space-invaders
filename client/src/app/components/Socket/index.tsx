import { SocketType, useGlobalContext } from "@/app/Context";
import { useEffect } from "react";
import { io } from "socket.io-client";

export function SocketInitilizer() {
  const { SocketRef, setSocketId, isGameStarted } = useGlobalContext();

  useEffect(() => {
    const socket: SocketType = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"], // Avoid polling fallback
    });

    socket.on("connect", () => {
      console.log("🔌 Socket Connected:", socket?.id);
      setSocketId(socket?.id);
    });
    socket.on("disconnect", () => console.log("❌ Socket Disconnected"));

    SocketRef.current = socket;
  }, [SocketRef, setSocketId]);

  return <div hidden />;
}
