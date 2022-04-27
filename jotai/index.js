import { atom } from 'jotai';

export const loginJotai = atom({});

export const startLogout = setIsLogin => {
  localStorage.removeItem('userData');
  setIsLogin({});
};
