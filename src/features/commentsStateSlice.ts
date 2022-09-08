// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { getCommentsByPostId } from '../api/comments';
// import { Comment } from '../types/typedefs';
//
// interface State {
//   comments: { [key: string]: Comment[] },
//   isLoading: boolean,
// }
//
// const initialState: State = {
//   comments: {},
//   isLoading: false,
// };
//
// export const fetchCommentsByPostIdAction = createAsyncThunk<Comment[], number>(
//   'commentsState/fetch_comments_by_post_id',
//   getCommentsByPostId,
// );
//
// export const commentsStateSlice = createSlice({
//   name: 'commentsState',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchCommentsByPostIdAction.pending, (state) => {
//       state.isLoading = true;
//     });
//
//     builder.addCase(fetchCommentsByPostIdAction.rejected, (state) => {
//       state.isLoading = false;
//     });
//
//     builder.addCase(fetchCommentsByPostIdAction.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.comments[action.meta.arg] = action.payload;
//     });
//   },
// });
//
// export const commentsStateReducer = commentsStateSlice.reducer;
