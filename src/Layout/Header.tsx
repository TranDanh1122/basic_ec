import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
const Header = React.memo((): React.JSX.Element => {
    const { length } = useWishlist()
    const { length: cartLength } = useCart()
    const { user } = useAuth()

    return <header >
        <span className="text-white  text-[14px] leading-[24px] text-center block bg-black py-3">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className="font-semibold">ShopNow</span>
        </span>
        <nav className="flex items-center justify-between pt-12 pb-6 border-b-[1px] border-solid border-black/50 container mx-auto">
            <Link to="/"> <img src="/assets/logo.svg" alt="logo" className="w-32 h-6 object-cover " /></Link>
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
                <li><NavLink to="/auth/register" className={({ isActive }) =>
                    `border-b-[1px] border-solid ${isActive ? "border-black/50" : "border-transparent"}`
                }>Sign Up</NavLink></li>
            </ul>
            <div className="flex items-center justify-between gap-4">
                <Link to={"/wishlist"} className="w-8 h-8 relative">
                    <img src="/assets/heart.svg" alt="wishlist" className="w-full h-full object-cover" />
                    {length > 0 && <span className="bg-[#DB4444] text-white rounded-full px-2 py-1 text-[8px] absolute -top-1 -right-1">{length}</span>}
                </Link>
                <Link to={"/cart"} className="w-8 h-8 relative">
                    <img src="/assets/cart.svg" alt="cart" className="w-full h-full object-cover" />
                    {cartLength > 0 && <span className="bg-[#DB4444] text-white rounded-full px-2 py-1 text-[8px] absolute -top-1 -right-1">{cartLength}</span>}
                </Link>
                {Object.keys(user).length > 0 && <UserMenu />}
            </div>
        </nav>
    </header>
})
Header.displayName = "Header"
export default Header
const UserMenu = React.memo((): React.JSX.Element => {
    const { dispatch, logout, user } = useAuth()

    return <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center focus-visible:border-none">
            <User />
            {user.username}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>
                <Link className="flex gap-2" to={"/profile"}>
                    <User />
                    <span>My Profile</span>
                </Link>

            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={() => dispatch(logout())}>
                <LogOut />
                <span>Log out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
})