import { Comment, CreateCommentFragment } from '../typedefs';
import { request } from './index';
import { ENDPOINTS } from './constans';

export const getCommentsByPostId = (postId: number): Promise<Comment[]> => {
  return request<Comment[]>(ENDPOINTS.commentsByPostId(postId));
};

export const createComment = (
  createFields: CreateCommentFragment,
): Promise<Comment> => {
  return request<Comment>(
    ENDPOINTS.comments,
    {
      method: 'POST',
      body: JSON.stringify(createFields),
    },
  );
};
