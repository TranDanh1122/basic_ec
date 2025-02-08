import { ProductAPI } from "@/api/ProductAPI";
import Hero from "@/components/Home/Hero";
import List from "@/components/Home/List";
import React from "react";
export default function Home(): React.JSX.Element {
    return <>
        <Hero></Hero>
        <List className="mt-36" subtitle="Today's" title="Flash Sales" type="product" callback={ async () => {
            const response = await ProductAPI.products()            
            return response.data.products
        }} />
    </>
}