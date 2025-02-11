import { ProductAPI } from "@/api/ProductAPI";
import BreadcrumbCPN from "@/components/Shared/BreadcrumbCPN";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import List from "@/components/Home/List";
import { useCart } from "@/hooks/useCart";
export default function ProductDetail(): React.JSX.Element {
    const { id } = useParams()
    const mainImg = React.useRef<HTMLImageElement>(null)
    const nav = useNavigate()
    if (!id) nav("/404")
    const { data: product } = useQuery({
        queryKey: ["singleProduct", id],
        queryFn: async () => {
            const response = await ProductAPI.getProductByID(id ?? "0")
            return response.data
        }
    })
    const handleClick = (el: string) => {
        if (!mainImg.current) return
        mainImg.current.setAttribute("src", el)
    }
    const { wishlist, dispatch } = useWishlist()
    const { dispatch: cartAction, addOrUpdateItem } = useCart()
    const contain = React.useMemo(() => {
        if (product) return wishlist.some(el => el.id == product.id)
        return false
    }, [wishlist, product])
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
    }, [product])
    const input = React.useRef<HTMLInputElement>(null)
    const addOrMinus = React.useCallback((type: string) => {
        if (!input.current) return
        if (type == "minus") {
            const newValue = Number(input.current.value) - 1
            if (newValue < 1) return
            input.current.value = newValue.toString()
        }
        if (type == "add")
            input.current.value = (Number(input.current.value) + 1).toString()
    }, [])
    const addCart = React.useCallback(() => {
        if (!product) return
        cartAction(addOrUpdateItem({
            id: product.id, title: product.title,
            thumbnail: product.thumbnail,
            price: product.price,
            qty: Number(input.current?.value ?? "0"),
            subtotal: 0
        }))
        toast({
            title: "Success",
            description: "Let check your cart",
            action: <ToastAction altText="Check"><Link to={"/cart"}>Cart</Link></ToastAction>
        })
    }, [product])
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        if ((/^[1-9]\d*$/.test(value))) return
        if (!input.current) return
        input.current.value = "1"
    }
    return <>
        <BreadcrumbCPN items={[{ name: "Home", link: "/" }, { name: product?.title ?? "", link: "/" }]} />
        {!product && <div className="w-5 h-5 mx-auto border-2 animate-spin"></div>}
        {product && <div className="flex items-center gap-8">
            <Carousel orientation="vertical" plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]} className="w-fit ">
                <CarouselContent className="max-h-[600px] max-w-[170px] h-full w-full space-y-4">
                    {
                        product.images &&
                        product.images.map((el: string) => <CarouselItem className="bg-neutral-200" key={el}>
                            <img onClick={() => handleClick(el)} src={el} loading="lazy" className="w-full h-full object-cover" />
                        </CarouselItem>)
                    }
                </CarouselContent>
                <CarouselPrevious className="-top-5 bg-white border-0 shadow-lg" />
                <CarouselNext className="-bottom-5 bg-white border-0 shadow-lg" />
            </Carousel>
            <img src={product.thumbnail} alt={product.title} className=" w-1/2 aspect-[5/6] bg-neutral-200 max-w-[500px] object-contain" ref={mainImg} />
            <div className="flex flex-col gap-8 w-1/2 ml-16">
                <h1 className="text-2xl font-semibold ">{product.title}</h1>
                <p className="text-2xl">${product.price}</p>
                <p className="text-[14px] leading-5 ">{product.description}</p>
                <div className="flex items-stretch gap-4">
                    <div className="flex items-center justify-between">
                        <Button onClick={() => addOrMinus("minus")} className="bg-[#DB4444] rounded-none text-white font-extrabold">-</Button>
                        <Input ref={input} onChange={(e) => onChange(e)} defaultValue={input.current?.value ?? "1"} className="rounded-none text-center font-bold focus-visible:ring-0 focus-visible:ring-offset-0"></Input>
                        <Button onClick={() => addOrMinus("add")} className="bg-[#DB4444] rounded-none text-white font-extrabold">+</Button>
                    </div>
                    <Button onClick={addCart} className="bg-[#DB4444] rounded-none text-white font-extrabold">Add to cart</Button>
                    <Button onClick={toogleWishlish} className={`${contain ? "bg-[#DB4444] border-white" : "bg-white border-black"}  p-1  cursor-pointer border-[1px]`}>
                        <i className={`${contain ? "bg-white" : "bg-black"} block w-6 h-6`} style={{
                            mask: "url(/assets/heart.svg) center / cover no-repeat",
                            WebkitMask: "url(/assets/heart.svg) center / cover no-repeat"
                        }}></i>
                    </Button>
                </div>

            </div>
        </div>}

        <List<Product> className="mt-36" subtitle="Related Items" title="" type="product" callback={async (): Promise<Product[]> => {
            const response = await ProductAPI.getProductsByCategory(product.category)
            return response.data.products
        }} />
    </>
}