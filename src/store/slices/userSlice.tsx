import { createSlice } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';

export const initialUserState = {
  email: null,
  token: null,
  id: null,
  role: null,
  name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.name = action.payload.name;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.role= null;
      state.name = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const { user } = store.getState();
  localStorage.setItem('user', JSON.stringify(user));
  return result;
};

export default userSlice.reducer;
