import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  List, ListItem, Paper,
} from '@mui/material';
import { Alert } from '@mui/lab';
import { Comment } from '../../types/typedefs';
import { getCommentsByPostId } from '../../api/comments';
import { CommentItem } from './CommentItem';
import { CreateCommentForm } from './CreateCommentForm/CreateCommentForm';
import {
  useGetCommentsByPostIdQuery,
  useLazyGetCommentsByPostIdQuery,
} from '../../features/api/comments.api';

interface Props {
  postId: number;
}

export const CommentsList: FC<Props> = React.memo((props) => {
  const { postId } = props;

  const {
    data, isLoading, isError, refetch,
  } = useGetCommentsByPostIdQuery(
    postId,
    { refetchOnMountOrArgChange: true },
  );

  const comments: Comment[] = useMemo(() => (data || []),
    [data]);

  return (
    <>
      <button type="button" onClick={refetch}>sdfsdf</button>
      <Paper elevation={12} style={{ overflowY: 'scroll', height: '90vh' }}>
        <List>
          {comments.length === 0 && !isLoading && (
            <Alert severity="info" sx={{ margin: '16px' }}>
              There are no comments yet
            </Alert>

          )}
          {isLoading && !comments.length && <h1>loading</h1>}
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <CommentItem comment={comment} onDelete={() => {}} />
            </ListItem>
          ))}

          <CreateCommentForm postId={postId} onAdd={() => {}} />

        </List>
      </Paper>
    </>

  );
});
