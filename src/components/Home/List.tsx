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
interface Props {
    className: string,
    subtitle: string,
    title: string,
    type: string,
    callback: () => Promise<unknown[]>,
}
const List = React.memo(({ className, subtitle, title, type, callback }: Props): React.JSX.Element => {
    const { data: items, isLoading } = useQuery({
        queryKey: [title],
        queryFn: callback
    })
    if (isLoading) return <Loading />
    return <div className={`container mx-auto ${className}`}>
        <span className="text-[#DB4444] font-semibold text-base 
        leading-5 px-3 py-4 border-l-[1.25rem] 
        border-solid border-[#DB4444]">{subtitle}</span>
        <h2 className="font-semibold text-[36px] leading-12 mt-6">{title}</h2>
        <Carousel className="w-5/6 pl-10 py-10">
            <CarouselContent className="flex gap-8 items-center">

                {type == "category" &&
                    (items as Category[])?.map((el: Category) =>
                        <CarouselItem key={el.name}>{el.name}</CarouselItem>)
                }
                {type == "product" &&
                    (items as Product[])?.map((el: Product) =>
                        <CarouselItem className="w-1/4 basis-1/4">
                            <div className="max-h-[250px] w-full">
                                <img src={el.thumbnail} alt={el.title} className="rounded-sm w-full h-full object-contain" />

                            </div>
                        </CarouselItem>
                    )
                }

            </CarouselContent>
            <CarouselPrevious className="left-5 bg-white border-0 shadow-lg" />
            <CarouselNext className="-right-5 bg-white border-0 shadow-lg" />
        </Carousel>

    </div>
})
List.displayName = "List"
export default List