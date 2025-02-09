import ProductItem from "@/components/Home/ProductItem";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import React from "react";
export default function WishLish(): React.JSX.Element {
    const { wishlist } = useWishlist()
    return <>
        <div className="flex justify-between items-center">
            <h2 className="text-[20px] py-20">Wishlist ({wishlist.length})</h2>
            <Button variant="outline">Move All To Cart</Button>
        </div>
        <div className="flex items-center justify-between gap-4">

            {wishlist.map((el: CartItem) => <div className="w-1/4"><ProductItem product={el}></ProductItem></div>)}
        </div>
    </>
}