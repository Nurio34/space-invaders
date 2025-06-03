import { useGlobalContext } from "@/app/Context";
import { useEffect } from "react";
import { io } from "socket.io-client";

function Socket() {
  const { SocketRef } = useGlobalContext();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"], // Avoid polling fallback
    });

    socket.on("connect", () => console.log("🔌 Socket Connected:", socket?.id));
    socket.on("disconnect", () => console.log("❌ Socket Disconnected"));

    SocketRef.current = socket;
  }, []);

  return <div hidden />;
}

export default Socket;
