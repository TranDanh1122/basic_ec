import React from "react";

type ActionType = { type: "AddOrDelete", payload: CartItem }
export const WishLishContext = React.createContext<{ wishlist: CartItem[], dispatch: React.Dispatch<ActionType> }>({ wishlist: [], dispatch: () => { } })
const wishlistReducer = (state: CartItem[], action: ActionType) => {
    switch (action.type) {
        case "AddOrDelete": {
            const index = state.findIndex(el => el.id == action.payload.id)
            if (index > -1) return state.filter(el => el.id != action.payload.id)
            return [...state, action.payload]
        }
        default: return state;
    }
}
export default function WishLishContextProvider({ children }: { children: React.ReactNode }) {
    const local = localStorage.getItem("wishlist")
    const [wishlist, dispatch] = React.useReducer(wishlistReducer, local ? JSON.parse(local) : [] as CartItem[])
    React.useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }, [wishlist])
    return <WishLishContext.Provider value={{ wishlist, dispatch }}>
        {children}
    </WishLishContext.Provider>
}