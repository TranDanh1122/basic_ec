import BreadcrumbCPN from "@/components/Shared/BreadcrumbCPN";
import { Button } from "@/components/ui/button";
import React from "react";
import {Link} from "react-router-dom"
export default function NotFound(): React.JSX.Element {
    return <>
        <BreadcrumbCPN items={[{ name: "Home", link: "/" }, { name: "NotFound", link: "/404" }]} />
        <div className="py-36 ">
            <h1 className="font-medium text-[110px] leading-[115px] text-center">404 Not Found</h1>
            <span className="block text-center mt-10">Your visited page not found. You may go home page.</span>
            <Button className="rounded-none text-white bg-[#DB4444] hover:opacity-50 mx-auto flex py-4 px-10 mt-20"><Link to={"/"}>Back to home page</Link></Button>
        </div>
    </>
}