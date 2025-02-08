import React from "react";
import { NavLink } from "react-router-dom";
const Header = React.memo((): React.JSX.Element => {
    return <header >
        <span className="text-white  text-[14px] leading-[24px] text-center block bg-black py-3">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className="font-semibold">ShopNow</span>
        </span>
        <nav className="flex items-center justify-between pt-12 pb-6 border-b-[1px] border-solid border-black/50 container mx-auto">
            <img src="/assets/logo.svg" alt="logo" className="w-32 h-6 object-cover " />
            <ul className="text-base leading-6 flex items-center justify-start gap-12 font-medium">
                <li><NavLink to="/" className={({ isActive }) =>
                    `border-b-[1px] border-solid ${isActive ? "border-black/50" : "border-transparent"}`
                }>Home</NavLink></li>
                <li><NavLink to="/contact" className={({ isActive }) =>
                    `border-b-[1px] border-solid ${isActive ? "border-black/50" : "border-transparent"}`
                }>Contact</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) =>
                    `border-b-[1px] border-solid ${isActive ? "border-black/50" : "border-transparent"}`
                }>About</NavLink></li>
                <li><NavLink to="/auth" className={({ isActive }) =>
                    `border-b-[1px] border-solid ${isActive ? "border-black/50" : "border-transparent"}`
                }>Sign Up</NavLink></li>
            </ul>
            <div className="flex items-center justify-between gap-4">
                <img src="/assets/heart.svg" alt="wishlist" className="w-8 h-8 object-cover" />
                <img src="/assets/cart.svg" alt="cart" className="w-8 h-8 object-cover" />
            </div>
        </nav>
    </header>
})
Header.displayName = "Header"
export default Header