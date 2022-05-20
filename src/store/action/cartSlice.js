import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: {
            products: [],
            userId: 0,
        },
    },

    reducers: {
        add: (state, action) => {
            const productIndex = state.cart.products.findIndex(product => product.id === action.payload.product.id)
            if (productIndex !== -1) {
                if (action.payload.product.stok !== state.cart.products[productIndex].quantity) {
                    state.cart.products[productIndex].quantity++
                    state.cart.userId = action.payload.user_id
                }
            } else {
                const { id, namaProduk, harga, stok } = action.payload.product
                const newProduct = {
                    id: id,
                    name: namaProduk,
                    price: harga,
                    quantity: 1,
                    stock: stok
                }
                state.cart.products.push(newProduct)
                state.cart.userId = action.payload.user_id
            }
        },
        subtract: (state, action) => {
            const productIndex = state.cart.products.findIndex(product => product.id === action.payload.id)
            if (productIndex !== -1) {
                if (state.cart.products[productIndex].quantity !== 1) {
                    state.cart.products[productIndex].quantity--
                    state.cart.userId = action.payload.user_id
                }
            }
        },
        plus: (state, action) => {
            const productIndex = state.cart.products.findIndex(product => product.id === action.payload.id)
            if (productIndex !== -1) {
                if (state.cart.products[productIndex].quantity < state.cart.products[productIndex].stock) {
                    state.cart.products[productIndex].quantity++
                    state.cart.userId = action.payload.user_id
                }
            }
        },
        remove: (state, action) => {
            const productIndex = state.cart.products.findIndex(product => product.id === action.payload.id)
            if (productIndex !== -1) {
                state.cart.products.splice(productIndex, 1)
            }
        }
    }
})
export const { add, subtract, plus, remove } = cartSlice.actions;

export default cartSlice;