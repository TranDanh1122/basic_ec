import BreadcrumbCPN from "@/components/Shared/BreadcrumbCPN";
import React from "react";

export default function About(): React.JSX.Element {
    return <>
        <BreadcrumbCPN items={[{ name: "Home", link: "/" }, { name: "About", link: "/about" }]} />
        <section className="flex lg:flex-row flex-col items-center justify-between gap-20">
            <div className="py-32 lg:w-1/2 w-full">
                <h2 className="font-semibold text-[54px] mb-10">Our Story</h2>
                <p className="leading-6">
                    Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh.
                    Supported by wide range of tailored marketing, data and service solutions,
                    Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
                </p>
                <p className="leading-6 mt-6">
                    Exclusive has more than 1 Million products to offer, growing at a very fast.
                    Exclusive offers a diverse assotment in categories ranging  from consumer.
                </p>
            </div>
            <img src="/assets/about.png" className="lg:w-1/2 w-full h-full object-cover" />
        </section>
    </>
}

