import React, { FC, useEffect, useState } from 'react';
import {
  List, ListItem, ListItemText, Paper, TextField, Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Comment, CreateCommentFragment } from './typedefs';
import { createComment, getCommentsByPostId } from './api/comments';

interface Props {
  postId: number;
}

export const CommentsList: FC<Props> = React.memo((props) => {
  const { postId } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isAddLoading, setIsAddLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getCommentsByPostId(postId)
      .then(res => setComments(res))
      .finally(() => setIsLoading(false));
  }, [postId]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = () => {
    const newComment: CreateCommentFragment = {
      email,
      body,
      postId,
      name,
    };

    setIsAddLoading(true);

    createComment(newComment)
      .then((comment) => {
        setComments((prev) => [...prev, comment]);
        resetForm();
        setIsAddLoading(false);
      });
  };

  return (
    <Paper elevation={12} style={{ overflowY: 'scroll', height: '90vh' }}>
      <List>
        {comments.length === 0 && (
          <Typography variant="overline">No comments</Typography>
        )}
        {isLoading
          ? (
            <h1>loading</h1>
          )
          : (comments.map((comment) => (
            <ListItem>
              <ListItemText
                primary={`${comment.name} - ${new Date(comment.createdAt).toLocaleString()}`}
                secondary={comment.body}
              />
            </ListItem>
          )))}
      </List>
      <div style={{ padding: '16px' }}>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        >

          <TextField
            fullWidth
            placeholder="Name"
            variant="standard"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <TextField
            fullWidth
            placeholder="Email"
            variant="standard"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <TextField
            fullWidth
            placeholder="Comment"
            variant="standard"
            label="Comment"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            style={{ marginBottom: '16px' }}
          />

          <LoadingButton
            variant="contained"
            fullWidth
            type="submit"
            loading={isAddLoading}
          >
            Add comment
          </LoadingButton>
        </form>
      </div>
    </Paper>
  );
});
