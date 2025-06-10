import { useGlobalContext } from "@/app/Context";

function ContinueButton() {
  const { SocketRef, roomId, socketId, canvasSize } = useGlobalContext();

  const continueGame = () => {
    const socket = SocketRef.current;

    if (!socket || !roomId || !socketId) return;

    socket.emit("continue", { roomId, socketId, canvasSize });
  };
  return (
    <button
      type="button"
      className="btn bg-primary/80 text-primary-content"
      onClick={continueGame}
    >
      Continue
    </button>
  );
}
export default ContinueButton;
