import { configureStore } from '@reduxjs/toolkit';
import userReducer, { localStorageMiddleware, initialUserState } from './slices/userSlice';

const loadUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : initialUserState;
  } catch (error) {
    console.error('Error parsing user from local storage:', error);
    return initialUserState;
  }
};

const preloadedState = {
  user: loadUser(),
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [localStorageMiddleware],
  preloadedState,
});
