import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { Grid } from '@mui/material';
import { PostList } from './Components/Posts/PostList';
import { CommentsList } from './Components/Comments/CommentsList';
import {
  fetchPostsAction,
} from './features/postsStateSlice';
import { useAppDispatch, useAppSelector } from './app/hook';
import { useGetCommentsByPostIdQuery } from './features/api/comments.api';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    selectedPostId,
  } = useAppSelector(state => state.postsState);

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, []);

  return (
    <>
      <h1>Fetch day 2</h1>
      <Grid container spacing={4}>

        <Grid item xs={6}>
          {error && <p>{error}</p>}
          <PostList />
        </Grid>

        <Grid item xs={6}>
          {selectedPostId && <CommentsList postId={selectedPostId} />}
        </Grid>

      </Grid>
    </>
  );
};
