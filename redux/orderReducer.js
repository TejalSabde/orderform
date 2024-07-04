import { createSlice } from "@reduxjs/toolkit";

export const OrderSlice = createSlice({
    name: "order",
    initialState: {
        lastFiftDaysOrder: [],
        latestOrder: {}
    },
    reducers: {
        setOrdersInReducer: (state, action) => {
            state.lastFiftDaysOrder = action.payload
            const latestOrder = action.payload.reduce((latest, current) => {
                return new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current;
            });
            const modifiedLatestOrder = {
                ...latestOrder, products: latestOrder.products.map((product) => {
                    return { ...product, returnQuantity: 0 }
                })
            }
            state.latestOrder = modifiedLatestOrder
        },

        incementQuantity: (state, action) => {
            const item = state.latestOrder.products.find(
                (item) => item.name === action.payload.name
            );
            item.returnQuantity += 1;
        },
        decrementQuantity: (state, action) => {
            const item = state.latestOrder.products.find(
                (item) => item.name === action.payload.name
            );
            if (item.returnQuantity >= 1) {
                item.returnQuantity -= 1;
            }
        }
    }
});


export const { setOrdersInReducer, incementQuantity, decrementQuantity } = OrderSlice.actions;

export default OrderSlice.reducer