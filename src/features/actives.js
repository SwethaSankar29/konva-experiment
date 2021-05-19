import { createSlice } from "@reduxjs/toolkit";

export const activesSlice = createSlice({
    name: "actives",
    initialState: {
        needlePosition: [0, 0],
    },
    reducers: {
        updateNeedlePoint: (state, action) => {
            state.needlePosition = action.payload;
        },
    },
});

export const { updateNeedlePoint } = activesSlice.actions;

export const getNeedlePoint = (state) => state.actives.needlePosition;

export const getActives = (state) => state.actives;

export default activesSlice.reducer;