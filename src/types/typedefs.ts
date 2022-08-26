export interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: Date,
  updatedAt: Date,
}

export interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt: Date,
  updatedAt: Date,
}

export type CreateCommentFragment = Pick<
Comment, 'postId' | 'email' | 'body' | 'name'
>;

export type UpdateCommentFields = Partial<
Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>
>;
