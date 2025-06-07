export const range = (canvasWidth: number, alienWidth: number) => {
  const canvasCenter = canvasWidth / 2;

  const maxRangeFromCenter = Math.floor(
    Math.random() * (canvasCenter - alienWidth + 1)
  );

  const minX = Math.max(0, canvasCenter - maxRangeFromCenter);
  const maxX = Math.min(
    canvasWidth - alienWidth,
    canvasCenter + maxRangeFromCenter
  );

  return { minX, maxX };
};
