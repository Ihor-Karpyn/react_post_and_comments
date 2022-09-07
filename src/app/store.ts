import { configureStore } from '@reduxjs/toolkit';
import postsStateReducer from '../features/postsStateSlice';
import { commentsStateReducer } from '../features/commentsStateSlice';

export const store = configureStore({
  reducer: {
    postsState: postsStateReducer,
    commentsState: commentsStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
