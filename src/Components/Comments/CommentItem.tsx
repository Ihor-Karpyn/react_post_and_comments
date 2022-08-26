import React, { FC, useMemo, useState } from 'react';
import { InputAdornment, ListItemText, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Comment } from '../../types/typedefs';
import { deleteComment, updateComment } from '../../api/comments';

interface Props {
  comment: Comment;
  onDelete: (id: number) => void;
  onUpdate: (newComment: Comment) => void;
}

export const CommentItem: FC<Props> = React.memo((props) => {
  const { comment, onDelete, onUpdate } = props;

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.body);

  const isLoading = useMemo(() => (
    isDeleteLoading || isUpdateLoading
  ), [isDeleteLoading, isUpdateLoading]);

  const deleteCommentHandler = () => {
    setIsDeleteLoading(true);
    deleteComment(comment.id)
      .then(res => {
        if (res) {
          onDelete(comment.id);
        }
      })
      .finally(() => setIsDeleteLoading(false));
  };

  const updateCommentHandler = () => {
    setIsUpdateLoading(true);
    updateComment(comment.id, { body: commentBody })
      .then(onUpdate)
      .then(() => setIsUpdate(false))
      .finally(() => setIsUpdateLoading(false));
  };

  return (
    <>
      <ListItemText
        primary={`${comment.name} - ${new Date(comment.createdAt).toLocaleString()}`}
        secondary={comment.body}
      />
      {isUpdate && (
        <TextField
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          label="Add a comment"
          variant="standard"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <LoadingButton
                  disabled={commentBody.length <= 5}
                  type="button"
                  onClick={updateCommentHandler}
                  loading={isUpdateLoading}
                >
                  Save
                </LoadingButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      <LoadingButton
        variant="outlined"
        sx={{ marginRight: '8px' }}
        onClick={() => setIsUpdate((prev) => !prev)}
        disabled={isLoading}
      >
        {isUpdate ? 'Close' : 'update'}
      </LoadingButton>
      <LoadingButton
        variant="outlined"
        onClick={deleteCommentHandler}
        loading={isDeleteLoading}
        disabled={isLoading}
        color="warning"
      >
        DELETE
      </LoadingButton>
    </>
  );
});
