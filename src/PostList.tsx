import React, { FC } from 'react';
import {
  List, ListItem, ListItemText, Paper,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Post } from './typedefs';

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
              <ListItemText
                primary={post.title}
                secondary={post.body}
              />
              <LoadingButton
                variant={post.id === selectedPostId ? 'contained' : 'outlined'}
                size="medium"
                onClick={() => onSelect(post.id)}
              >
                comments
              </LoadingButton>
            </ListItem>
          )))}
      </List>
    </Paper>
  );
});
