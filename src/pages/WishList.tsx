import ProductItem from "@/components/Home/ProductItem";
import BreadcrumbCPN from "@/components/Shared/BreadcrumbCPN";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import React from "react";
export default function WishLish(): React.JSX.Element {
    const { wishlist, length } = useWishlist()
    const [page, setPage] = React.useState<number>(1)
    return <>
        <BreadcrumbCPN items={[{ name: "Home", link: "/" }, { name: "Wishlist", link: "/wishlist" }]} />
        <div className="flex justify-between items-center">
            <h2 className="text-[20px] py-20">Wishlist ({wishlist.length})</h2>
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap gap-y-6">
            {wishlist.slice(0, page * 10).map((el: CartItem) => 
            <div key={el.id} className="lg:w-[calc(25%-12px)] md:w-[calc(50%-8px)] w-full"><ProductItem product={el}></ProductItem></div>
            )}
        </div>
        {length > 0 && page * 10 != length && <Button variant="outline" className="flex mx-auto cursor-pointer mt-8" onClick={() => setPage((page) => page + 1)}>Load more</Button>}
    </>
}