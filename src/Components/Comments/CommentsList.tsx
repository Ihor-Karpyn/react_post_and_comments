import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import {
  List, ListItem, Paper,
} from '@mui/material';
import { Alert } from '@mui/lab';
import { Comment } from '../../types/typedefs';
import { getCommentsByPostId } from '../../api/comments';
import { CommentItem } from './CommentItem';
import { CreateCommentForm } from './CreateCommentForm/CreateCommentForm';

interface Props {
  postId: number;
}

export const CommentsList: FC<Props> = React.memo((props) => {
  const { postId } = props;

  const [comments, setComments] = useState<Comment[]>([]);

  const onAdd = useCallback((newComment: Comment) => {
    setComments((prev) => [...prev, newComment]);
  }, [setComments]);

  const onDelete = useCallback((id: number) => {
    setComments((prev) => prev.filter(c => c.id !== id));
  }, []);

  useEffect(() => {
    getCommentsByPostId(postId)
      .then(res => setComments(res));
  }, [postId]);

  return (
    <Paper elevation={12} style={{ overflowY: 'scroll', height: '90vh' }}>
      <List>
        {comments.length === 0 && (
          <Alert severity="info" sx={{ margin: '16px' }}>
            There are no comments yet
          </Alert>

        )}
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <CommentItem comment={comment} onDelete={onDelete} />
          </ListItem>
        ))}

        <CreateCommentForm postId={postId} onAdd={onAdd} />

      </List>
    </Paper>
  );
});
