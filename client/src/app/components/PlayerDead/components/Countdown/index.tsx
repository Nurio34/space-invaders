import { useGlobalContext } from "@/app/Context";
import { useEffect, useRef, useState } from "react";

function Countdown() {
  const { SocketRef, roomId, socketId } = useGlobalContext();

  const [count, setCount] = useState(9);
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!interval.current)
      interval.current = setInterval(() => {
        setCount((prev) => {
          if (prev < 0 && interval.current) {
            clearInterval(interval.current);
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
  }, []);

  useEffect(() => {
    const socket = SocketRef.current;

    if (!socket || !roomId || !socketId) return;

    if (count === -1) socket.emit("leaveRequest", { roomId, socketId });
  }, [count, SocketRef, roomId, socketId]);

  return (
    <div className="text-6xl font-bold text-base-100">
      {count >= 0 ? count : 0}
    </div>
  );
}
export default Countdown;
