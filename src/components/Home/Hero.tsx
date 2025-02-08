import React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProductAPI } from "@/api/ProductAPI";
import { Skeleton } from "@/components/ui/skeleton"

const Hero = React.memo((): React.JSX.Element => {
    return <div className="container mx-auto flex items-center ">
        <SideMenu className="w-1/6 pr-4 border-r-[1px] border-solid border-black/30 py-10"></SideMenu>

        <Carousel className="w-5/6 pl-10">
            <CarouselContent className="max-h-[350px]">
                <CarouselItem >
                    <img src="/assets/banner.jpg" className="w-full h-full object-cover" />
                </CarouselItem>
                <CarouselItem >
                    <img loading="lazy" src="/assets/banner2.avif" className="w-full h-full object-cover" />
                </CarouselItem>
                <CarouselItem >
                    <img loading="lazy" src="/assets/banner3.jpg" className="w-full h-full object-cover" />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-5 bg-white border-0 shadow-lg" />
            <CarouselNext className="-right-5 bg-white border-0 shadow-lg" />
        </Carousel>

    </div>
})
Hero.displayName = "Hero"
export default Hero

const SideMenu = React.memo((props: { className?: string }) => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await ProductAPI.categories(5)
            return response.data
        }
    })
    if (isLoading) return <Skeleton className={`w-full h-[400px] rounded-sm bg-black/20 ${props.className}`} />
    return <NavigationMenu className={` max-w-none justify-start ${props.className}`} >
        <NavigationMenuList className="flex flex-col items-start gap-4">
            {
                categories.slice(0, 10).map((el: Category) => <NavigationMenuItem>
                    <Link className="text-base leading-6 text-black font-medium" to={"/"}>{el.name} </Link>
                </NavigationMenuItem>)
            }
        </NavigationMenuList>
    </NavigationMenu>
})