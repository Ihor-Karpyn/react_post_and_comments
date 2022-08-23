import { request } from './index';
import { ENDPOINTS } from './constans';
import { Post } from '../typedefs';

export const getPosts = (): Promise<Post[]> => {
  return request<Post[]>(ENDPOINTS.posts);
};
