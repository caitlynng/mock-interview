import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  uid: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  uid: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string; uid: string }>,
    ) => {
      const { name, email, uid } = action.payload;
      state.name = name;
      state.email = email;
      state.uid = uid;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
