import { useGlobalContext } from "@/app/Context";
import { useEffect, useRef, useState } from "react";
import ContinueButton from "./components/ContinueButton";
import LeaveButton from "./components/LeaveButton";
import Countdown from "./components/Countdown";

function PlayerDead() {
  const { gameState, socketId } = useGlobalContext();

  const [isPlayerDead, setIsPlayerDead] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!gameState.id || !socketId) return;

    const playerLife = gameState.players[socketId]?.life;
    if (playerLife <= 0) setIsPlayerDead(true);
    else setIsPlayerDead(false);
  }, [gameState, socketId]);

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);

    if (isPlayerDead) {
      timeout.current = setTimeout(() => {
        setIsRender(true);
      }, 100);
    } else {
      setIsRender(false); // Optional: reset render if player revives
    }

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [isPlayerDead]);

  return (
    isPlayerDead && (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-screen max-w-96 aspect-square select-none">
        <div
          className={`w-full h-full bg-base-100/10 transition-all duration-1000
            flex flex-col items-center justify-evenly
            ${
              isRender
                ? "opacity-100 md:shadow-[0_10px_40px_-10px_black]"
                : "opacity-0 md:shadow-none "
            }`}
          style={{ backdropFilter: "blur(6px)" }}
        >
          <div className="text-2xl font-bold">You Dead</div>
          <Countdown />
          <div className="flex gap-x-4 items-center">
            <ContinueButton />
            <LeaveButton />
          </div>
        </div>
      </div>
    )
  );
}
export default PlayerDead;
