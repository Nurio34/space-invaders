import { useGlobalContext } from "@/app/Context";

function LeaveButton() {
  const { SocketRef, roomId, socketId } = useGlobalContext();

  const leaveRoom = () => {
    const socket = SocketRef.current;

    if (!socket || !roomId || !socketId) return;

    socket.emit("leaveRequest", { roomId, socketId });
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
