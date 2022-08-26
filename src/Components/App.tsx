import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { Grid } from '@mui/material';
import { PostList } from './Posts/PostList';
import { Post } from '../types/typedefs';
import { getPosts } from '../api/posts';
import { CommentsList } from './Comments/CommentsList';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const selectPost = useCallback((id: number | null) => {
    setSelectedPostId(id);
  }, []);

  useEffect(() => {
    setIsPostsLoading(true);

    getPosts()
      .then((postFromServer) => {
        setPosts(postFromServer);
      })
      .finally(() => setIsPostsLoading(false));
  }, []);

  return (
    <>
      <h1>Fetch day 2</h1>
      <Grid container spacing={4}>

        <Grid item xs={6}>
          <PostList
            posts={posts}
            isLoading={isPostsLoading}
            onSelect={selectPost}
            selectedPostId={selectedPostId}
          />
        </Grid>

        <Grid item xs={6}>
          {selectedPostId && <CommentsList postId={selectedPostId} />}
        </Grid>

      </Grid>
    </>
  );
};
