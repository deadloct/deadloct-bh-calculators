import { configureStore } from "@reduxjs/toolkit"
import videoSlice from "./videoSlice"
import calcSlice from "./calcSlice"

export default configureStore({
    reducer: {
        calc: calcSlice,
        videos: videoSlice,
    },
});
