import { ProductAPI } from "@/api/ProductAPI";
import Hero from "@/components/Home/Hero";
import List from "@/components/Home/List";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
export default function Home(): React.JSX.Element {
    return <>
        <Hero></Hero>
        <List<Product> className="mt-36" subtitle="Today's" title="Flash Sales" type="product" callback={async (): Promise<Product[]> => {
            const response = await ProductAPI.products()
            return response.data.products
        }} />
        <Button className="max-w-none px-12 py-4 bg-[#DB4444] hover:opacity-70 text-white rounded-none mx-auto flex mt-14"><Link to={"/products"}>View All Products</Link></Button>
        <div className="h-[1px] w-full bg-black/30 mt-16"></div>
        <List<Category> className="mt-36" subtitle="Categories" title="Browse By Category" type="category" callback={async (): Promise<Category[]> => {
            const response = await ProductAPI.categories()
            return response.data
        }} />
        <div className="h-[1px] w-full bg-black/30 mt-16"></div>
        <List<Product> className="mt-36" subtitle="This Month" title="Best Selling Products" type="product" callback={async (): Promise<Product[]> => {
            const response = await ProductAPI.products()
            return response.data.products
        }} />
        <Button className="max-w-none px-12 py-4 bg-[#DB4444] hover:opacity-70 text-white rounded-none mx-auto flex mt-14"><Link to={"/products"}>View All Products</Link></Button>
        <div className="h-[1px] w-full bg-black/30 my-16"></div>

    </>
}