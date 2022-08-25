import React, { FC, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { createComment } from '../../../api/comments';
import { Comment } from '../../../types/typedefs';

interface Props {
  postId: number;
  onAdd: (v: Comment) => void;
}

export const CreateCommentForm: FC<Props> = React.memo((props) => {
  const { postId, onAdd } = props;

  const [comment, setComment] = useState('');
  const [isAddLoading, setIsAddLoading] = useState(false);

  const clearForm = () => {
    setComment('');
  };

  const submitHandler = () => {
    setIsAddLoading(true);
    createComment({
      body: comment,
      name: 'Ihor',
      email: 'ihor.k@mate.academy',
      postId,
    })
      .then((res) => onAdd(res))
      .then(clearForm)
      .finally(() => setIsAddLoading(false));
  };

  return (
    <form
      style={{ padding: '16px' }}
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
    >
      <span>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          label="Add a comment"
          variant="standard"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <LoadingButton
                  disabled={comment.length <= 5}
                  type="submit"
                  loading={isAddLoading}
                >
                  Post
                </LoadingButton>
              </InputAdornment>
            ),
          }}
        />
      </span>
    </form>
  );
});
