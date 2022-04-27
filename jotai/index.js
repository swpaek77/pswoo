import { atom } from 'jotai';

export const loginJotai = atom({ isFirst: true });

export const startLogout = setIsLogin => {
  localStorage.removeItem('userData');
  setIsLogin({});
};
