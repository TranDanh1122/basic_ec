import React from "react"
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast"
import { Link } from "react-router-dom";
import { ToastAction } from "../ui/toast";
import { Skeleton } from "../ui/skeleton";

const ProductItem = React.memo(({ product }: { product: Partial<Product> }): React.JSX.Element => {
    const { wishlist, dispatch } = useWishlist()
    const { dispatch: cartAction, addOrUpdateItem } = useCart()
    const contain = React.useMemo(() => {
        return wishlist.some(el => el.id == product.id)
    }, [wishlist])
    const { toast } = useToast()
    const toogleWishlish = React.useCallback(() => {
        dispatch({
            type: "AddOrDelete", payload: {
                id: product.id ?? 0,
                title: product.title ?? "",
                thumbnail: product.thumbnail ?? "",
                price: product.price ?? 0,
                qty: 1,
                subtotal: 0
            }
        })
        toast({
            title: "Success",
            description: "Let check your wishlist",
            action: <ToastAction altText="Check"><Link to={"/wishlist"}>Wishlist</Link></ToastAction>
        })
    }, [])
    const addCart = React.useCallback(() => {
        cartAction(addOrUpdateItem({
            id: product.id, title: product.title,
            thumbnail: product.thumbnail,
            price: product.price,
            qty: 1,
            subtotal: 0
        }))
        toast({
            title: "Success",
            description: "Let check your cart",
            action: <ToastAction altText="Check"><Link to={"/cart"}>Cart</Link></ToastAction>
        })
    }, [])
    return <div className="w-full">
        <div className="max-h-[250px] w-full aspect-square bg-neutral-300 flex items-center justify-center rounded-sm relative">
            <Link to={`/products/${product.id}`}>
                <img loading="lazy" src={product.thumbnail} alt={product.title} className="rounded-sm w-[190px] h-[180px] object-contain" />
            </Link>
            <span onClick={toogleWishlish} className={`${contain ? "bg-[#DB4444]" : "bg-white"} top-4 right-4 absolute rounded-full p-1 cursor-pointer`}>
                <i className={`${contain ? "bg-white" : "bg-black"} block w-6 h-6`} style={{
                    mask: "url(/assets/heart.svg) center / cover no-repeat",
                    WebkitMask: "url(/assets/heart.svg) center / cover no-repeat"
                }}></i>
            </span>
            <span onClick={addCart} className={`top-14 right-4 absolute rounded-full p-1 cursor-pointer bg-white`}>
                <i className={` block w-6 h-6 bg-black`} style={{
                    mask: "url(/assets/cart.svg) center / cover no-repeat",
                    WebkitMask: "url(/assets/cart.svg) center / cover no-repeat"
                }}></i>
            </span>
        </div>
        <h3 className="font-medium text-base leading-6 mt-4 mb-2"><Link to={`/products/${product.id}`}>{product.title}</Link> </h3>
        <span className="font-medium test-base text-[#DB4444]">${product.price}</span>
    </div>
})
ProductItem.displayName = "ProductItem"
export default ProductItem
export const ProductItemSkeleton = (): React.JSX.Element => {
    return <div className="w-full ">
        <div className="max-h-[250px] w-full aspect-square bg-neutral-300 flex items-center justify-center rounded-sm relative">
            <Skeleton className="rounded-sm w-[190px] h-[180px]" />
        </div>
        <Skeleton className=" mt-4 mb-2 h-6 bg-neutral-300"></Skeleton>
        <Skeleton className=" h-6 w-1/5 bg-neutral-300"></Skeleton>
    </div>
}