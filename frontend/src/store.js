import { createContext, useReducer } from "react";


//#1 create initial state

export const store = createContext()

const initialState = {
    cart: {
        cartItems: []
    }
}

//#2 Create a reducer
const reducer = (state, action) => {
    console.log(` Cart: ${state.cart.cartItems}`)

    switch (action.type) {
        case "ADD_TO_CART":
            const newItem = action.payload;
            // find if item exist in the cart
            const existItem = state.cart.cartItems.find((item) =>
                item._id === newItem._id
            )

            const cartItems = existItem ? state.cart.cartItems.map((item) =>
                //pick item from array, check its _id, if exits replace it with new item, if not exits, put back the item in the array
                item._id === existItem._id ? newItem : item
            ) : [...state.cart.cartItems, newItem]

            return { ...state, cart: { ...state.cart, cartItems } }  // cartItems :cartItems

        default:
            return state
    }
}

// # Create a provider
export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    return (
        // this value will be accesible to all componets that are wrapped by this provider
        <store.Provider value={value}>{children}</store.Provider>
    )
}