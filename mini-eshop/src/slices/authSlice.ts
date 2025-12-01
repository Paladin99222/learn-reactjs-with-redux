import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: { username: string; password: string }) => {
    const user = await fetch(
      "http://localhost:5000/users?username=" + payload.username
    ).then((res) => res.json());
    if (user.length > 0 && user[0].password === payload.password) {
      return user[0];
    }
    throw new Error("Invalid username or password");
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: { id: number; username: string; password: string }) => {
    const totalUsersLength = await fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => data.length);
    payload.id = totalUsersLength + 1;
    const newUser = {
      id: payload.id,
      username: payload.username,
      password: payload.password,
      likes: [],
    };
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    return await response.json();
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
