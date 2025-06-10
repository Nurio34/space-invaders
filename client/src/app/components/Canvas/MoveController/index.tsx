import { useGlobalContext } from "@/app/Context";
import { useEffect, useState } from "react";

function MoveController() {
  const { canvasSize, moveArrayRef, velocityRef, SocketRef, roomId, socketId } =
    useGlobalContext();

  const buttonSize = 80;
  const buttonOffset = 20;
  const centerX = buttonOffset + buttonSize / 2;
  const centerY = canvasSize.height - buttonOffset - buttonSize / 2;

  const inneSize = buttonSize / 2;
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
      setPosition((prev) => ({ ...prev, y: -40 }));
  }, [position]);

  useEffect(() => {
    if (position.x >= -40 && position.x <= 40)
      velocityRef.current.x = Math.abs(position.x) / (buttonSize / 2);
    if (position.y >= -40 && position.y <= 40)
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

    if (!socket || !roomId || !socketId) return;

    socket.emit("move", {
      roomId,
      socketId,
      moveArray: moveArrayRef.current,
      velocity: velocityRef.current,
    });
  }, [position, SocketRef, roomId, socketId]);

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
