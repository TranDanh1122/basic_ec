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
import ProductItem from "./ProductItem";
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
                            <ProductItem key={el.id} product={el}></ProductItem>
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
