import { Input } from "@/components/ui/input";
import React from "react";
const Footer = React.memo((): React.JSX.Element => {
    return <footer className="bg-black text-white">
        <div className="container mx-auto flex items-start justify-between pt-20 pb-16">
            <div className="flex flex-col gap-6">
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
            <div className="flex flex-col gap-6">
                <h2 className=" text-[20px] leading-7 font-medium">Support</h2>
                <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
                <a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
                <a href="tel:+88015-88888-9999">+88015-88888-9999</a>
            </div>
            <div className="flex flex-col gap-6">
                <h2 className=" text-[20px] leading-7 font-medium">Account</h2>
                <a href="#">My Account</a>
                <a href="#">Login / Register</a>
                <a href="#">Cart</a>
                <a href="#">Wishlist</a>
                <a href="#">Shop</a>
            </div>
            <div className="flex flex-col gap-6">
                <h2 className=" text-[20px] leading-7 font-medium">Quick Link</h2>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms Of Use</a>
                <a href="#">FAQ</a>
                <a href="#">Contact</a>
            </div>
            <div className="flex flex-col gap-6">
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
})
Footer.displayName = "Footer"
export default Footer