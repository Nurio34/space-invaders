import { useGlobalContext } from "@/app/Context";
import Image from "next/image";
import { FormEvent, useState } from "react";

export function Form() {
  const { SocketRef, assets, setRoomId, canvasSize, socketId } =
    useGlobalContext();
  const { arrowImg } = assets;

  const [name, setName] = useState("John");
  const [maxPlayers, setMaxPlayers] = useState(1);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const socket = SocketRef.current;

    if (!socket || !socketId) return;

    const newRoomId = crypto.randomUUID();
    setRoomId(newRoomId);
    socket.emit("gameStart", {
      roomId: newRoomId,
      socketId,
      name,
      maxPlayers,
      canvasSize,
    });
  };

  return (
    <form
      className="h-full flex flex-col justify-evenly items-center"
      onSubmit={submitForm}
    >
      <h1 className="text-2xl font-bold">Space Invaders</h1>
      <div className="flex items-center gap-x-4">
        <label htmlFor="name">
          <span className="font-semibold text-sm">Name</span>
          <input
            type="text"
            name="name"
            id="name"
            className=" input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div className="flex items-center gap-x-2">
          <label htmlFor="players">
            <span className="font-semibold text-sm">Max. Players</span>
            <input
              type="number"
              name="players"
              id="players"
              value={maxPlayers}
              className="input no-spinner"
              onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
            />
          </label>
          <div>
            <button
              type="button"
              className="relative w-10 aspect-square cursor-pointer transition-transform
                hover:scale-110 active:scale-90
              "
              onClick={() => setMaxPlayers((prev) => prev + 1)}
            >
              <Image
                src={arrowImg!.src}
                fill
                alt="arrow button image"
                sizes="40px"
              />
            </button>
            <button
              type="button"
              className="relative w-10 aspect-square cursor-pointer transition-transform rotate-180
                hover:scale-110 active:scale-90
              "
              onClick={() =>
                maxPlayers > 1 && setMaxPlayers((prev) => prev - 1)
              }
            >
              <Image
                src={arrowImg!.src}
                fill
                alt="arrow button image"
                sizes="40px"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4">
        <button type="submit" className="btn btn-primary">
          Start
        </button>
        <button type="submit" className="btn btn-secondary">
          Join
        </button>
      </div>
    </form>
  );
}
