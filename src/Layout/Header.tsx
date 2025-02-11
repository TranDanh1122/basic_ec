import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Menu, XIcon } from "lucide-react"
const Header = React.memo((): React.JSX.Element => {
    const { length } = useWishlist()
    const { length: cartLength } = useCart()
    const { user } = useAuth()
    const [open, isOpen] = React.useState<boolean>(false)
    const header = React.useRef<HTMLDivElement>(null)
    const mobileMenu = React.useRef<HTMLDivElement>(null)
    const overlay = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        if (!open) return
        if (!header.current || !mobileMenu.current || !overlay.current) return
        const headerHeight = header.current.getBoundingClientRect().height
        mobileMenu.current.style.top = `${headerHeight}px`
        overlay.current.style.top = `${headerHeight}px`
        mobileMenu.current.style.height = `${window.innerHeight - headerHeight}px`
        const reset = () => {
            if (!header.current || !mobileMenu.current || !overlay.current) return
            if (window.scrollY > headerHeight) {
                mobileMenu.current.style.top = `0px`
                overlay.current.style.top = `0px`
                mobileMenu.current.style.height = `${window.innerHeight}px`

            } else {
                mobileMenu.current.style.top = `${headerHeight}px`
                mobileMenu.current.style.height = `${window.innerHeight - headerHeight}px`
                overlay.current.style.top = `${headerHeight}px`
            }
        }
        window.addEventListener("scroll", reset)
        return () => window.removeEventListener("scroll", reset)
    }, [open])
    return <header ref={header}>
        <span className="text-white  text-[14px] leading-[24px] text-center block bg-black py-3">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className="font-semibold">ShopNow</span>
        </span>
        <nav className="flex items-center justify-between pt-12 pb-6 border-b-[1px] border-solid border-black/50 container mx-auto">
            <Link to="/"> <img src="/assets/logo.svg" alt="logo" className="w-32 h-6 object-cover " /></Link>
            <ul className="text-base leading-6  items-center justify-start gap-12 font-medium hidden lg:flex">
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
            <div className=" items-center justify-between gap-4 hidden lg:flex">
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


            {!open && <Menu onClick={() => isOpen(!open)}></Menu>}
            {open && <XIcon onClick={() => isOpen(!open)}></XIcon>}
            {open &&
                <div ref={mobileMenu} className="p-6 w-1/2 h-full z-20 bg-white fixed top-0 right-0 flex flex-col justify-between">
                    <ul className="text-base leading-6  items-center justify-start gap-12 font-medium lg:hidden flex flex-col ">
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
                    <div className=" items-center justify-around gap-4 flex flex-col md:flex-row">
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
                </div>
            }
            {open && <div ref={overlay} className="fixed top-0 left-0 w-full h-full bg-black/50 z-10" onClick={() => isOpen(false)}></div>}
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
            <DropdownMenuItem onClick={() => dispatch(logout())}>
                <LogOut />
                <span>Log out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
})