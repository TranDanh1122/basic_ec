import { WishLishContext } from "@/context/WishListContext";
import React from "react";
export const useWishlist = () => {
    const { wishlist, dispatch } = React.useContext(WishLishContext)
    if (!wishlist) {
        throw new Error("Not Found")
    }
    const length = React.useMemo(() => {
        return wishlist.length
    }, [wishlist])
    return { wishlist, dispatch, length }
}