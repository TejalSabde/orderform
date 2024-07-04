import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";
import orderReducer from "./redux/orderReducer";

export default configureStore({
    reducer:{
        cart:CartReducer,
        order:orderReducer
    }
})