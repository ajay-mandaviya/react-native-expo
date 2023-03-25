import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  currentPage: number;
  users: any[];
  isLoading: boolean;
};

const initialState: State = {
  currentPage: 1,
  users: [],
  isLoading: false,
};

const getUser = async (currentPage: number) => {
  try {
    const json = await fetch(
      `https://randomuser.me/api/?page=${currentPage}&results=10`
    );
    const data = await json.json();
    return data.results;
  } catch (error) {}
};

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (page: number, thunkAPI) => {
    console.log("page number", page);
    try {
      const response = await getUser(page);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const infoSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetUser: (state) => {
      state.users = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.users = [...state.users, ...action.payload];
      }
    );
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const userReducer = infoSlice.reducer;
export const { updateCurrentPage, resetUser } = infoSlice.actions;
export default infoSlice;
