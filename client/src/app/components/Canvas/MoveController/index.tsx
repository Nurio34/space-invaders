import { useGlobalContext } from "@/app/Context";
import { useEffect, useState } from "react";

function MoveController() {
  const {
    canvasSize,
    moveArrayRef,
    velocityRef,
    SocketRef,
    roomId,
    socketId,
    isGameStarted,
  } = useGlobalContext();

  const buttonSize = 120;
  const buttonOffset = 20;
  const centerX = buttonOffset + buttonSize / 2;
  const centerY = canvasSize.height - buttonOffset - buttonSize / 2;

  const inneSize = buttonSize / 3;
  const innerCenter = buttonSize / 2;

  const [touchEvent, setTouchEvent] = useState({
    x: centerX,
    y: centerY,
    isDragging: false,
  });

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const { x, y } = touchEvent;
    const xDiff = x - centerX;
    const yDiff = centerY - y;
    setPosition({ x: xDiff, y: yDiff });
  }, [touchEvent]);

  useEffect(() => {
    if (position.x > buttonSize / 2)
      setPosition((prev) => ({ ...prev, x: buttonSize / 2 }));
    if (position.x < -buttonSize / 2)
      setPosition((prev) => ({ ...prev, x: -buttonSize / 2 }));
    if (position.y > buttonSize / 2)
      setPosition((prev) => ({ ...prev, y: buttonSize / 2 }));
    if (position.y < -buttonSize / 2)
      setPosition((prev) => ({ ...prev, y: -buttonSize / 2 }));
  }, [position]);

  useEffect(() => {
    if (position.x >= -buttonSize / 2 && position.x <= buttonSize / 2)
      velocityRef.current.x = Math.abs(position.x) / (buttonSize / 2);
    if (position.y >= -buttonSize / 2 && position.y <= buttonSize / 2)
      velocityRef.current.y = Math.abs(position.y) / (buttonSize / 2);
  }, [position]);

  useEffect(() => {
    moveArrayRef.current = [];
    if (position.x > 0) moveArrayRef.current.push("right");
    if (position.x < 0) moveArrayRef.current.push("left");
    if (position.y > 0) moveArrayRef.current.push("up");
    if (position.y < 0) moveArrayRef.current.push("down");
  }, [position]);

  useEffect(() => {
    const socket = SocketRef.current;

    const interval = setInterval(() => {
      if (!socket || !roomId || !socketId || !isGameStarted) return;

      socket.emit("move", {
        roomId,
        socketId,
        moveArray: moveArrayRef.current,
        velocity: velocityRef.current,
      });
    }, 1000 / 60); // emit at most every 100ms

    return () => clearInterval(interval);
  }, [SocketRef, roomId, socketId, isGameStarted]);

  return (
    <button
      type="button"
      className="fixed aspect-square border border-base-100 rounded-full z-10"
      style={{
        top: centerY - buttonSize / 2,
        left: centerX - buttonSize / 2,
        width: buttonSize,
      }}
      onTouchStart={(e) => {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        setTouchEvent({ x, y, isDragging: true });
      }}
      onTouchMove={(e) => {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;

        setTouchEvent({ x, y, isDragging: true });
      }}
      onTouchEnd={() => {
        setTouchEvent({ x: centerX, y: centerY, isDragging: false });
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className={`absolute aspect-square rounded-full select-none
            ${
              position.x >= -buttonSize / 2 &&
              position.x <= buttonSize / 2 &&
              position.y >= -buttonSize / 2 &&
              position.y <= buttonSize / 2
                ? "bg-base-100"
                : ""
            }    
        `}
        style={{
          top: innerCenter - inneSize / 2 - position.y,
          left: innerCenter - inneSize / 2 + position.x,
          width: inneSize,
        }}
      />
    </button>
  );
}
export default MoveController;
