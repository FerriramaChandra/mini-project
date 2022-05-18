import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./action/userSlice";
import cartSlice from "./action/cartSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer
    },
});

export default store;