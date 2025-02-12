import { Input } from "@/components/ui/input";
import React from "react";
const Footer = React.memo((): React.JSX.Element => {
    return <>
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-y-8 text-center mt-52 mb-40">
            <div className="lg:w-1/3 md:w-1/2 w-full">
                <img src="/assets/ship.png" alt="ship" className="w-20 aspect-square object-cover mx-auto" />
                <h3 className="text-[20px] leading-7 font-semibold mt-6 mb-2">FREE AND FAST DELIVERY</h3>
                <span className="text-[14px] leading-5 block">Free delivery for all orders over $140</span>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full">
                <img src="/assets/svc.png" alt="svc" className="w-20 aspect-square object-cover mx-auto" />
                <h3 className="text-[20px] leading-7 font-semibold mt-6 mb-2">24/7 CUSTOMER SERVICE</h3>
                <span className="text-[14px] leading-5 block">Friendly 24/7 customer support</span>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full">
                <img src="/assets/money.png" alt="money" className="w-20 aspect-square object-cover mx-auto" />
                <h3 className="text-[20px] leading-7 font-semibold mt-6 mb-2">MONEY BACK GUARANTEE</h3>
                <span className="text-[14px] leading-5 block">We reurn money within 30 days</span>
            </div>
        </div>
        <footer className="bg-black text-white">
            <div className="container mx-auto flex lg:flex-nowrap flex-wrap gap-y-8 items-start justify-between pt-20 pb-16">
                <div className="flex flex-col gap-6 md:w-1/2 w-full lg:w-auto">
                    <i className="block bg-white w-32 h-6" style={{
                        mask: "url(/assets/logo.svg) center / cover",
                        WebkitMask: "url(/assets/logo.svg) center / cover",
                    }}></i>
                    <h2 className=" text-[20px] leading-7 font-medium">Subscribe</h2>
                    <span className=" text-base leading-6">Get 10% off your first order</span>
                    <div className="relative">
                        <Input className="border-white" placeholder="Enter your email" />
                        <i className="block bg-white w-6 h-6 absolute top-[50%] right-2 translate-y-[-50%]" style={{
                            mask: "url(/assets/send.svg) center / cover",
                            WebkitMask: "url(/assets/send.svg) center / cover",
                        }}></i>
                    </div>
                </div>
                <div className="flex flex-col gap-6  md:w-1/2 w-full  lg:w-auto">
                    <h2 className=" text-[20px] leading-7 font-medium">Support</h2>
                    <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
                    <a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
                    <a href="tel:+88015-88888-9999">+88015-88888-9999</a>
                </div>
                <div className="lg:flex hidden flex-col gap-6">
                    <h2 className=" text-[20px] leading-7 font-medium">Account</h2>
                    <a href="#">My Account</a>
                    <a href="#">Login / Register</a>
                    <a href="#">Cart</a>
                    <a href="#">Wishlist</a>
                    <a href="#">Shop</a>
                </div>
                <div className="lg:flex hidden flex-col gap-6 w-auto">
                    <h2 className=" text-[20px] leading-7 font-medium">Quick Link</h2>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms Of Use</a>
                    <a href="#">FAQ</a>
                    <a href="#">Contact</a>
                </div>
                <div className="flex flex-col md:items-center items-start gap-6 w-full lg:w-auto">
                    <h2 className=" text-[20px] leading-7 font-medium">Download App</h2>
                    <div>
                        <span className="text-white/70 font-medium text-[12px] leading-4.5">Save $3 with App New User Only</span>
                        <img src="/assets/app.png" alt="app" className="w-48 h-24 object-contain" />
                    </div>
                    <ul className="flex items-center justify-between">
                        <li><img src="/assets/fb.svg" alt="facebook" className="w-6 h-6 object-cover" /></li>
                        <li><img src="/assets/x.svg" alt="x" className="w-6 h-6 object-cover" /></li>
                        <li><img src="/assets/instagram.svg" alt="instagram" className="w-6 h-6 object-cover" /></li>
                        <li><img src="/assets/linkedin.svg" alt="linkedin" className="w-6 h-6 object-cover" /></li>
                    </ul>
                </div>
            </div>
            <span className="text-white/40 text-center block pb-6">
                Copyright Tran Danh 2025. All right reserved
            </span>
        </footer>
    </>

})
Footer.displayName = "Footer"
export default Footer