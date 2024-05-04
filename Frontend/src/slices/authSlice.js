import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  token: null,
  sessionId:null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setSessionId(state, value) {
      state.sessionId = value.payload;
    },
  },
});

export const {  setLoading,setSessionId, setToken } = authSlice.actions;
export default authSlice.reducer;
