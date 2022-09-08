import { configureStore } from '@reduxjs/toolkit';
import postsStateReducer from '../features/postsStateSlice';
import { commentsApi } from '../features/api/comments.api';

export const store = configureStore({
  reducer: {
    postsState: postsStateReducer,
    // commentsState: commentsStateReducer,
    comments: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(commentsApi.middleware)
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
