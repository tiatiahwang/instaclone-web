import { makeVar } from '@apollo/client';

const TOKEN = 'token';

export const isLoggedInVar = makeVar(false);

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
};

export const isDarkModeVar = makeVar(false);
