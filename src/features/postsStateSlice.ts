import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/typedefs';
import { getPosts } from '../api/posts';

interface State {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  selectedPostId: number | null;
}

const initialState: State = {
  posts: [],
  isLoading: false,
  error: null,
  selectedPostId: null,
};

export const fetchPostsAction = createAsyncThunk<Post[]>(
  'postsState/fetchPosts',
  getPosts,
);

const postsStateSlice = createSlice({
  name: 'postsState',
  initialState,
  reducers: {
    setSelectedPostId: (state, action: PayloadAction<number>) => {
      state.selectedPostId = action.payload;
    },
    unselectPost: (state) => {
      state.selectedPostId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });

    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.name || null;
    });
  },
});

export const {
  setSelectedPostId,
  unselectPost,
} = postsStateSlice.actions;
export default postsStateSlice.reducer;
