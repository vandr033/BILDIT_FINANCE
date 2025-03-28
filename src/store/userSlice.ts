import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  name: String,
  anualIncome: number,
  usage: string,
  otherUsage: string
}

const initialState: UserState = {
  name: '',
  anualIncome: 0,
  usage: '',
  otherUsage: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAnualIncome: (state, action) => {
      state.anualIncome = action.payload;
    },
    setUsage: (state, action) => {
      state.usage = action.payload;
    },
    setOtherUsage: (state, action) => {
      state.otherUsage = action.payload;
    },
    resetUser: (state) => {
      state.name = '';
      state.anualIncome = 0;
      state.usage = '';
      state.otherUsage = '';
    },
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.anualIncome = action.payload.anualIncome;
      state.usage = action.payload.usage;
      state.otherUsage = action.payload.otherUsage;
    },
  },
});

export const { setName, setAnualIncome, setUsage, setOtherUsage, resetUser, setUser } = userSlice.actions;
export default userSlice.reducer;