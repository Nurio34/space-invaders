import { useGlobalContext } from "@/app/Context";

function LeaveButton() {
  const { SocketRef, roomId, socketId, setIsGameStarted } = useGlobalContext();

  const leaveRoom = () => {
    const socket = SocketRef.current;

    if (!socket || !roomId || !socketId) return;

    socket.emit("leave", { roomId, socketId });
    setIsGameStarted(false);
  };

  return (
    <button
      type="button"
      className="btn bg-secondary/80 text-secondary-content"
      onClick={leaveRoom}
    >
      Leave
    </button>
  );
}
export default LeaveButton;
