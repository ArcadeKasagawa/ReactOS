export enum StatusType {
  nothing,
  resLoading,
  ready,
  playing,
  paused,
  gameover,
}

let status: StatusType = StatusType.nothing;

export const getGameStatus = () => {
  return status;
};

export const setGameStatus = (value: StatusType) => {
  status = value;
};
