import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
    name: "actives",
    initialState: {
        needlePosition: [0, 0],
    },
    reducers: {
        updateNeedlePosition: (state, action) => {
            state.needlePosition = action.payload;
        },
    },
});
export const { updateNeedlePosition } = activeSlice.actions;

export const getActives = (state) => state.actives;
export const getNeedlePoint = (state) => state.actives.needlePosition;

export default activeSlice.reducer;