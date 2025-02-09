import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useQuery } from "@tanstack/react-query";
import Loading from "../Shared/Loading";
import { useWishlist } from "@/hooks/useWishlist";
interface Props {
    className: string,
    subtitle: string,
    title: string,
    type: string,
    callback: () => Promise<unknown[]>,
}
const List = React.memo(({ className, subtitle, title, type, callback }: Props): React.JSX.Element => {
    const { data: items, isLoading, isError } = useQuery({
        queryKey: [title],
        queryFn: callback
    })
    if (isLoading) return <div className={` ${className}`}><Loading /></div>
    if (isError) return <></>
    return <div className={`${className}`}>
        <span className="text-[#DB4444] font-semibold text-base 
        leading-5 px-3 py-4 border-l-[1.25rem] 
        border-solid border-[#DB4444]">{subtitle}</span>
        <h2 className="font-semibold text-[36px] leading-12 mt-6">{title}</h2>
        <Carousel className="mt-16  w-full">
            <CarouselContent className="flex gap-8 items-center ml-0">

                {type == "category" &&
                    (items as Category[])?.map((el: Category) =>
                        <CarouselItem key={el.name} className="flex items-center justify-center gap-4 flex-col pl-0 basis-[calc(16.67%-6px)] 
                        border-solid border-[1px] border-black py-6 rounded-sm hover:bg-[#DB4444] hover:text-white">
                            <img src="/assets/category.svg" alt={el.name} className="w-14 h-14 object-cover" />
                            <h2 className="text-base leading-6">{el.name}</h2>
                        </CarouselItem>)
                }
                {type == "product" &&
                    (items as Product[])?.map((el: Product) =>
                        <CarouselItem key={el.id} className="pl-0 basis-[calc(25%-8px)]">
                            <Product key={el.id} product={el}></Product>
                        </CarouselItem>
                    )
                }

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    </div>
})
List.displayName = "List"
export default List
const Product = React.memo(({ product }: { product: Product }): React.JSX.Element => {
    const { wishlist, dispatch } = useWishlist()
    const contain = React.useMemo(() => {
        return wishlist.some(el => el.pro_id == product.id)
    }, [wishlist])
    return <div className="w-full">
        <div className="max-h-[250px] w-full aspect-square bg-neutral-300 flex items-center justify-center rounded-sm relative">
            <img loading="lazy" src={product.thumbnail} alt={product.title} className="rounded-sm w-[190px] h-[180px] object-contain" />
            <span onClick={() => dispatch({
                type: "AddOrDelete", payload: {
                    pro_id: product.id, name: product.title,
                    image: product.thumbnail,
                    price: product.price,
                    qty: 1,
                    subtotal: 0
                }
            })} className={`${contain ? "bg-[#DB4444]" : "bg-white"} top-4 right-4 absolute rounded-full p-1 cursor-pointer`}>
                <i className={`${contain ? "bg-white" : "bg-black"} block w-6 h-6`} style={{
                    mask: "url(/assets/heart.svg) center / cover no-repeat",
                    WebkitMask: "url(/assets/heart.svg) center / cover no-repeat"
                }}></i>
            </span>
        </div>
        <h3 className="font-medium text-base leading-6 mt-4 mb-2">{product.title}</h3>
        <span className="font-medium test-base text-[#DB4444]">${product.price}</span>
    </div>
})