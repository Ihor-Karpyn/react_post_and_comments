import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { Grid, Paper } from '@mui/material';
import { PostList } from './PostList';
import { Post } from './typedefs';
import { getPosts } from './api/posts';
import { CommentsList } from './CommentsList';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const selectPost = useCallback((id: number | null) => {
    setSelectedPostId(id);
  }, [setSelectedPostId]);

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
      <h2>{selectedPostId}</h2>
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
