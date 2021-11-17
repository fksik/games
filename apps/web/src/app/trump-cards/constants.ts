export const GID_KEY = 'gid';
export const UID_KEY = 'uid';

export enum GameErrors {
  ROOM_NOT_EXISTS = 'Room Not Exists',
  USER_NOT_EXISTS = 'User Not Exists',
}

export enum GameUIState {
  NONE,
  START_GAME,
  LOBBY,
  ENTER_NAME,
}
