import { ProductAPI } from "@/api/ProductAPI";
import ProductItem from "@/components/Home/ProductItem";
import BreadcrumbCPN from "@/components/Shared/BreadcrumbCPN";
import Loading from "@/components/Shared/Loading";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
const defaultFilter: Filter = {
    search: "",
    sort: "asc",
    skip: 0,
}
export default function ProductList(): React.JSX.Element {
    const [filter, setFilter] = React.useState<Filter>(defaultFilter)
    // const [data, setData] = React.useState<Product[]>([])
    const { data: queryData, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ["products", filter],
        queryFn: async ({ pageParam }) => {
            console.log(pageParam); // cái này luôn bằng 0

            const response = await ProductAPI.products({ ...filter, skip: pageParam })
            return response.data
        },
        getNextPageParam: (lastPage, pages) => {
            const nextSkip = lastPage.skip + 4
            return nextSkip < lastPage.total ? nextSkip : undefined
        },
        initialPageParam: 0,
    })
    if (isLoading) return <div className="w-10 h-10 border-2 animate-spin mx-auto my-20"></div>
    return <div>
        <BreadcrumbCPN items={[{ name: "Home", link: "/" }, { name: "Products", link: "/products" }]} />

        <div className="flex items-center justify-center gap-4 flex-wrap gap-y-6">
            {queryData &&
                queryData.pages.flatMap(page => page.products).map((el: Product) => <div key={el.id} className="w-[calc(25%-12px)]">
                    <ProductItem product={el}></ProductItem>
                </div>)
            }
            {hasNextPage && <Button variant="outline" className="flex mx-auto cursor-pointer mt-8"
                onClick={() => fetchNextPage()}>
                {isFetchingNextPage ? <div className="w-5 h-5 border-2 animate-spin"></div> : "Load more"}
            </Button>}

        </div>

    </div>
}