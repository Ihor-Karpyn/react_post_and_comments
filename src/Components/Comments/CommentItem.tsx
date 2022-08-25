import React, { FC, useState } from 'react';
import { ListItemText } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Comment } from '../../types/typedefs';
import { deleteComment } from '../../api/comments';

interface Props {
  comment: Comment;
  onDelete: (id: number) => void;
}

export const CommentItem: FC<Props> = React.memo((props) => {
  const { comment, onDelete } = props;

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

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

  return (
    <>
      <ListItemText
        primary={`${comment.name} - ${new Date(comment.createdAt).toLocaleString()}`}
        secondary={comment.body}
      />
      <LoadingButton
        variant="outlined"
        onClick={deleteCommentHandler}
        loading={isDeleteLoading}
      >
        DELETE
      </LoadingButton>
    </>
  );
});
