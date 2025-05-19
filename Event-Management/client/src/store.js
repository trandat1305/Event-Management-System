import { configureStore, createSlice } from '@reduxjs/toolkit';

// Token slice
const tokenSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;

const store = configureStore({
  reducer: {
    auth: tokenSlice.reducer,
  },
});

export default store;