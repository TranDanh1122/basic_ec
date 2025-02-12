import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useQuery } from "@tanstack/react-query";
import ProductItem, { ProductItemSkeleton } from "./ProductItem";
interface Props<T extends Category | Product> {
    className: string,
    subtitle: string,
    title: string,
    type: string,
    callback: () => Promise<T[]>,
}
const List = <T extends Category | Product>({ className, subtitle, title, type, callback }: Props<T>): React.JSX.Element => {
    const { data: items, isLoading, isError } = useQuery({
        queryKey: [title],
        queryFn: callback
    })
    if (isLoading) return <div className={` ${className} flex flex-wrap gap-8 items-center`}>
        {
            Array.from({ length: 4 }).map(_ => <div className="lg:w-[calc(25%-24px)] md:w-[calc(50%-16px)] w-[100%]"><ProductItemSkeleton /></div>)
        }
    </div>
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
                        <CarouselItem key={el.name} className="flex items-center justify-center gap-4 flex-col pl-0 
                    lg:basis-[calc(16.666667%-27px)] md:basis-[calc(33.33%-22px)] basis-[calc(50%-31px)]
                        border-solid border-[1px] border-black py-6 rounded-sm hover:bg-[#DB4444] hover:text-white">
                            <img src="/assets/category.svg" alt={el.name} className="w-14 h-14 object-cover" />
                            <h2 className="text-base leading-6">{el.name}</h2>
                        </CarouselItem>)
                }
                {type == "product" &&
                    (items as Product[])?.map((el: Product) =>
                        <CarouselItem key={el.id} className="pl-0 lg:basis-[calc(25%-24px)] md:basis-[calc(50%-16px)] basis-[100%]">
                            <ProductItem key={el.id} product={el}></ProductItem>
                        </CarouselItem>
                    )
                }

            </CarouselContent>
            <CarouselPrevious className="-left-5 bg-white border-none shadow-lg" />
            <CarouselNext className="-right-5 bg-white border-none shadow-lg" />
        </Carousel>

    </div>
}
List.displayName = "List"
export default React.memo(List) as <T extends Category | Product>(props: Props<T>) => React.JSX.Element
