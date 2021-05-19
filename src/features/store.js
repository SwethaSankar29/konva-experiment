import { configureStore } from "@reduxjs/toolkit";
import actives from "../features/actives";

export const store = configureStore({
    reducer: {
        actives,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});