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
    const nav = useNavigate()
    if (!id) nav("/404")
    const { data: product } = useQuery({
        queryKey: ["singleProduct", id],
        queryFn: async () => {
            const response = await ProductAPI.getProductByID(id ?? "0")
            return response.data
        }
    })
    return <>
        <BreadcrumbCPN items={[{ name: "Home", link: "/" }, { name: product?.title ?? "", link: "/" }]} />
        {!product && <div className="w-5 h-5 mx-auto border-2 animate-spin"></div>}
        {product && <div className="flex lg:flex-nowrap flex-wrap items-center gap-8">
            <CustomCarousel images={product.images} thumbnail={product.thumbnail} />
            <ProductInfomation product={product} />
        </div>}

        <List<Product> className="mt-36" subtitle="Related Items" title="" type="product" callback={async (): Promise<Product[]> => {
            const response = await ProductAPI.getProductsByCategory(product.category)
            return response.data.products
        }} />
    </>
}
const CustomCarousel = React.memo(({ images, thumbnail }: { images: string[] | undefined, thumbnail: string }): React.JSX.Element => {
    const mainImg = React.useRef<HTMLImageElement>(null)
    const handleClick = (el: string) => {
        if (!mainImg.current) return
        mainImg.current.setAttribute("src", el)
    }
    const [isMobile, setMobile] = React.useState<boolean>(true)
    const handleResize = React.useCallback(() => setMobile(window.innerWidth < 1024), [])
    React.useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])
    return <>
        <Carousel orientation={isMobile ? "horizontal" : "vertical"} plugins={[
            Autoplay({
                delay: 3000,
            }),
        ]} className="w-fit ">
            <CarouselContent className="max-h-[600px]  lg:max-w-[170px] max-w-none h-full w-full space-y-4 lg:space-x-0 space-x-3">
                {
                    images &&
                    images.map((el: string) => <CarouselItem className="bg-neutral-200" key={el}>
                        <img onClick={() => handleClick(el)} src={el} loading="lazy" className="w-full h-full object-cover" />
                    </CarouselItem>)
                }
            </CarouselContent>
            <CarouselPrevious className="lg:-top-5 -left-2 bg-white border-0 shadow-lg" />
            <CarouselNext className="lg:-bottom-5 right-2 bg-white border-0 shadow-lg" />
        </Carousel>
        {!isMobile && <img src={thumbnail} className=" lg:w-1/2 w-[calc(100%-202px)] aspect-[5/6] bg-neutral-200 lg:max-w-[500px] max-w-none  object-contain" ref={mainImg} />}
    </>
})
const ProductInfomation = React.memo(({ product }: { product: Product }) => {
    const { dispatch: cartAction, addOrUpdateItem } = useCart()

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
        <div className="flex flex-col gap-8 lg:w-1/2 w-full lg:ml-16 ml-0">
            <h1 className="text-2xl font-semibold ">{product.title}</h1>
            <p className="text-2xl">${product.price}</p>
            <p className="text-[14px] leading-5 ">{product.description}</p>
            <div className="flex items-stretch gap-4 lg:flex-nowrap flex-wrap justify-between">
                <div className="flex items-center justify-between w-[calc(80%-8px)] lg:w-auto">
                    <Button onClick={() => addOrMinus("minus")} className="bg-[#DB4444] rounded-none text-white font-extrabold ">-</Button>
                    <Input ref={input} onChange={(e) => onChange(e)} defaultValue={input.current?.value ?? "1"} className="rounded-none text-center font-bold focus-visible:ring-0 focus-visible:ring-offset-0"></Input>
                    <Button onClick={() => addOrMinus("add")} className="bg-[#DB4444] rounded-none text-white font-extrabold">+</Button>
                </div>
                <Button onClick={addCart} className="bg-[#DB4444] rounded-none text-white font-extrabold lg:order-2 order-3 w-full">Add to cart</Button>
                <WishLishIcon className="order-2 lg:order-3 w-[calc(20%-8px)] lg:w-auto" product={product} />
            </div>

        </div>
    </>
})
const WishLishIcon = React.memo(({ product, className }: { product: Product, className: string }): React.JSX.Element => {
    const { wishlist, dispatch } = useWishlist()
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
    return <>
        <Button onClick={toogleWishlish} className={`${contain ? "bg-[#DB4444] border-white" : "bg-white border-black"}  p-1  cursor-pointer border-[1px] ${className}`}>
            <i className={`${contain ? "bg-white" : "bg-black"} block w-6 h-6`} style={{
                mask: "url(/assets/heart.svg) center / cover no-repeat",
                WebkitMask: "url(/assets/heart.svg) center / cover no-repeat"
            }}></i>
        </Button>
    </>
})