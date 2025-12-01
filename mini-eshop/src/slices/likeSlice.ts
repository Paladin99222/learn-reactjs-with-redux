import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

export const fetchUserLikes = createAsyncThunk<number[], number>(
  "like/fetchUserLikes",
  async (userId: number) => {
    const response = await axios.get(`http://localhost:5000/users/${userId}`);
    const likes: number[] = response.data.likes.map((id: string | number) =>
      Number(id)
    );
    return likes;
  }
);

export const toggleLikeAsync = createAsyncThunk<
  number[],
  { userId: number; productId: number; newLikes: number[] }
>("like/toggleLike", async ({ userId, newLikes }) => {
  const response = await axios.patch(`http://localhost:5000/users/${userId}`, {
    likes: newLikes,
  });
  return response.data.likes; // return updated array
});

const likeSlice = createSlice({
  name: "like",
  initialState: {
    likedProductIds: [] as number[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setLikes: (state, action) => {
      state.likedProductIds = action.payload;
    },
    toggleLikeLocal: (state, action) => {
      const productId = action.payload;
      if (state.likedProductIds.includes(productId)) {
        state.likedProductIds = state.likedProductIds.filter(
          (id) => id !== productId
        );
      } else {
        state.likedProductIds.push(Number(productId));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.likedProductIds = action.payload;
        console.log("Fetched likes:", action.payload);
      })
      .addCase(fetchUserLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch likes";
      })
      .addCase(toggleLikeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleLikeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.likedProductIds = action.payload;
      })
      .addCase(toggleLikeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to toggle like";
      });
  },
});

export const { setLikes, toggleLikeLocal } = likeSlice.actions;
export default likeSlice.reducer;
