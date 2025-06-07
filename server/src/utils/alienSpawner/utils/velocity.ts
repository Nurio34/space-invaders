export const velocity = (
  minXSpeed: number,
  maxXSpeed: number,
  minYSpeed: number,
  maxYSpeed: number
) => {
  const randomXSpeed = Math.random() * (maxXSpeed - minXSpeed) + minXSpeed;
  const randomDirection = Math.random() < 0.5 ? -1 : 1;
  const vx = randomXSpeed * randomDirection;

  const vy = Math.random() * (maxYSpeed - minYSpeed) + minYSpeed;

  return { vx, vy };
};
