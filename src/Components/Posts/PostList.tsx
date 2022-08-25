import React, { FC } from 'react';
import {
  Grid,
  List, ListItem, ListItemText, Paper,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Post } from '../../types/typedefs';

interface Props {
  posts: Post[]
  isLoading: boolean;
  onSelect: (postId: number | null) => void;
  selectedPostId: number | null;
}

export const PostList: FC<Props> = React.memo((props) => {
  const {
    posts, isLoading, onSelect, selectedPostId,
  } = props;

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
                    onClick={() => onSelect(post.id)}
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
