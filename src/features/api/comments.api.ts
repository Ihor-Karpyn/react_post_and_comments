import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../../api/constans';
import { Comment } from '../../types/typedefs';

export const commentsApi = createApi({
  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({ baseUrl: ENDPOINTS.base }),
  endpoints: (builder) => ({

    getCommentsByPostId: builder.query<Comment[], number>({
      query: ENDPOINTS.commentsByPostId,
    }),

  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useLazyGetCommentsByPostIdQuery,
} = commentsApi;
