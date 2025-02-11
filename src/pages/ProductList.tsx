import { ProductAPI } from "@/api/ProductAPI";
import ProductItem, { ProductItemSkeleton } from "@/components/Home/ProductItem";
import BreadcrumbCPN from "@/components/Shared/BreadcrumbCPN";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SortAsc, SortDesc } from "lucide-react";
import React from "react";
const defaultFilter: Filter = {
    search: "",
    sort: "asc",
    skip: 0,
}
export default function ProductList(): React.JSX.Element {
    const [filter, setFilter] = React.useState<Filter>(defaultFilter);
    const debound = React.useRef<number|NodeJS.Timeout>(null)

    const { data: queryData, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ["products", filter],
        queryFn: async ({ pageParam }) => {

            const response = await ProductAPI.products({ ...filter, skip: pageParam })
            return response.data
        },
        getNextPageParam: (lastPage, _) => {
            const nextSkip = lastPage.skip + 4
            return nextSkip < lastPage.total ? nextSkip : undefined
        },
        initialPageParam: 0,
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (debound.current) clearTimeout(debound.current)
        debound.current = setTimeout(() => {
            setFilter(prev => ({ ...prev, search: e.target.value }));
        }, 300);
    }
    const data = React.useMemo(() => {
        return queryData?.pages.flatMap(page => page.products)
    }, [queryData])
    React.useEffect(() => {
        return () => {
            if (debound.current) clearTimeout(debound.current);
        };
    }, []);
    return <div>
        <BreadcrumbCPN items={[{ name: "Home", link: "/" }, { name: "Products", link: "/products" }]} />
        <div className="flex items-center justify-between my-8">
            <Input className="w-4/5" placeholder="Search some thing..." onChange={handleChange} />
            <div onClick={() => setFilter((fil) => ({ ...fil, sort: filter.sort == "asc" ? "desc" : "asc" }))}>
                {filter.sort == "asc" && <SortAsc />}
                {filter.sort == "desc" && <SortDesc />}
            </div>
        </div>
        {isLoading &&
            <div className={` flex gap-8 items-center`}>
                {
                    Array.from({ length: 4 }).map(_ => <div className="basis-[calc(25%-24px)]"><ProductItemSkeleton /></div>)
                }
            </div>
        }
        {
            !isLoading && <div className="flex items-center justify-center gap-4 flex-wrap gap-y-6">
                {data &&
                    data.map((el: Product) => <div key={el.id} className="w-[calc(25%-12px)]">
                        <ProductItem product={el}></ProductItem>
                    </div>)
                }
                {
                    (!data || data.length == 0) && <p className="font-bold">Not found</p>
                }
                {hasNextPage && <div>
                    <Button variant="outline" className="flex mx-auto cursor-pointer mt-8"
                        onClick={() => fetchNextPage()}>
                        {isFetchingNextPage ? <div className="w-5 h-5 border-2 animate-spin"></div> : "Load more"}
                    </Button>
                </div>}
            </div>
        }
    </div>
}