export const size = (
  playerSize: number,
  alienWidthParameter: number,
  ratio: number
) => {
  const alienWidth = playerSize / alienWidthParameter;
  const alienHeight = alienWidth / ratio;

  return { alienWidth, alienHeight };
};
