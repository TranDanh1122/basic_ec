import BreadcrumbCPN from "@/components/Shared/BreadcrumbCPN";
import React from "react";

export default function About(): React.JSX.Element {
    return <>
        <BreadcrumbCPN items={[{ name: "Home", link: "/" }, { name: "About", link: "/" }]} />
        <section className="flex items-center justify-between gap-20">
            <div className="py-32 w-1/2">
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
            <img src="/assets/about.png" className="w-1/2 h-full object-cover" />
        </section>
    </>
}

