
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Contact from "./pages/Contact"
import WishLish from "./pages/WishList"
import Cart from "./pages/Cart"
import ProductDetail from "./pages/ProductDetail"
import About from "./pages/About"
function App() {

  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<WishLish />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
