import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
    name: "actives",
    initialState: {
        needlePosition: [0, 0],
        inputFocus: false,
    },
    reducers: {
        updateNeedlePosition: (state, action) => {
            state.needlePosition = action.payload;
        },
        updateInputFocus: (state, action) => {
            state.inputFocus = action.payload;
        },
    },
});
export const { updateNeedlePosition, updateInputFocus } = activeSlice.actions;

export const getActives = (state) => state.actives;
export const getNeedlePoint = (state) => state.actives.needlePosition;
export const getInputFocus = (state) => state.actives.inputFocus;
export default activeSlice.reducer;