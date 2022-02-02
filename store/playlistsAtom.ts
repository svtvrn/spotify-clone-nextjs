import { atom } from 'recoil';

export const playlists = atom({
  key: 'playlists',
  default: [],
});

export const playlistInstance = atom({
  key: 'playlistInstance',
  default: '',
});
