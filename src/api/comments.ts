import {
  Comment,
  CreateCommentFragment,
  UpdateCommentFields,
} from '../types/typedefs';
import { request } from './index';
import { ENDPOINTS } from './constans';

export const getCommentsByPostId = (postId: number): Promise<Comment[]> => {
  return request<Comment[]>(ENDPOINTS.commentsByPostId(postId));
};

export const createComment = (
  createArgs: CreateCommentFragment,
): Promise<Comment> => {
  return request<Comment>(
    ENDPOINTS.comments,
    {
      method: 'POST',
      body: JSON.stringify(createArgs),
    },
  );
};

export const deleteComment = (id: number): Promise<number> => {
  return request<number>(
    ENDPOINTS.commentById(id),
    {
      method: 'DELETE',
    },
  );
};

export const updateComment = (
  id: number, updatedFields: UpdateCommentFields,
): Promise<Comment> => {
  return request<Comment>(
    ENDPOINTS.commentById(id),
    {
      method: 'PATCH',
      body: JSON.stringify(updatedFields),
    },
  );
};
