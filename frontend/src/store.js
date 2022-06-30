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
    console.log(state)

    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state, cart: {
                    ...state.cart, cartItems: [...state.cart.cartItems, action.payload] // add products to array
                }
            }

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