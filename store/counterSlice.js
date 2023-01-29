import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    setcount(state, action) {
      console.log("dispatcheddd");
      state.count = state.count + 1;
    },
    reducecount(state, count) {
      state.count = state.count - 1;
    },
  },

});
export const { setcount, reducecount } = counterSlice.actions;
// export const selectAuthState = (state)=>state.
export default counterSlice.reducer;