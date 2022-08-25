export const ENDPOINTS = {
  base: 'https://mate.academy/students-api',
  posts: '/posts',
  commentsByPostId: (postId: number) => `/comments?postId=${postId}`,
  comments: '/comments',
  commentById: (id: number) => `/comments/${id}`,
};
