import React, { FC } from 'react';
import {
  Grid,
  List, ListItem, ListItemText, Paper,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Post } from '../../types/typedefs';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setSelectedPostId } from '../../features/postsStateSlice';

export const PostList: FC = React.memo(() => {
  const {
    posts, isLoading, selectedPostId,
  } = useAppSelector(state => state.postsState);

  const dispatch = useAppDispatch();

  return (
    <Paper elevation={12} style={{ overflowY: 'scroll', height: '90vh' }}>
      <List>
        {isLoading
          ? (
            <h1>loading</h1>
          )
          : (posts.map((post) => (
            <ListItem>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={8}>
                  <ListItemText
                    primary={post.title}
                    secondary={post.body}
                  />
                </Grid>

                <Grid item xs={4}>
                  <LoadingButton
                    fullWidth
                    variant={post.id === selectedPostId
                      ? 'contained'
                      : 'outlined'}
                    size="medium"
                    onClick={() => dispatch(setSelectedPostId(post.id))}
                  >
                    comments
                  </LoadingButton>
                </Grid>
              </Grid>
            </ListItem>
          )))}
      </List>
    </Paper>
  );
});
