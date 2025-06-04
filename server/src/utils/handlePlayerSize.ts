export const handlePlayerSize = (canvasWidth: number) => {
  const playerIdealSize = 32;
  const playerSize = Math.max(canvasWidth / 30, playerIdealSize);
  return playerSize;
};
