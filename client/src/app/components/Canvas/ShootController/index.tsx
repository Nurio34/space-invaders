import { useGlobalContext } from "@/app/Context";
import { useEffect, useState } from "react";

function ShootController() {
  const { SocketRef, roomId, socketId, isGameStarted } = useGlobalContext();

  const [isShooting, setIsShooting] = useState(false);

  useEffect(() => {
    const socket = SocketRef.current;

    if (!socket || !roomId || !socketId || !isGameStarted) return;

    if (isShooting)
      socket.emit("shoot", { isShooting: true, roomId, socketId });
    else socket.emit("shoot", { isShooting: false, roomId, socketId });
  }, [isShooting, SocketRef, roomId, socketId, isGameStarted]);

  return (
    <button
      type="button"
      className="fixed z-10 right-4 bottom-4 border border-base-100  w-20 aspect-square rounded-full"
      onTouchStart={() => setIsShooting(true)}
      onTouchEnd={() => setIsShooting(false)}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
export default ShootController;
