
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import WishLish from "./pages/WishList"
import Cart from "./pages/Cart"
import ProductDetail from "./pages/ProductDetail"
import About from "./pages/About"
import Layout from "./Layout/Layout"
import WishLishContextProvider from "./context/WishListContext"
import Checkout from "./pages/Checkout"
import { useAuth } from "./hooks/useAuth"
import React from "react"
import { toast } from "./hooks/use-toast"
import NotFound from "./pages/NotFound"
import ProductList from "./pages/ProductList"
function App() {
  const { dispatch, userThunk, accessToken, error, deleteError } = useAuth()
  React.useEffect(() => {
    if (accessToken)
      dispatch(userThunk())
  }, [accessToken])
  React.useEffect(() => {
    if (error) {
      toast({ title: error, variant: "destructive" })
      dispatch(deleteError())
    }
  }, [error])
  return (
    <>
      <WishLishContextProvider>
        <Layout>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/auth/:type" element={<Auth />} />
            <Route path="/wishlist" element={<WishLish />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </WishLishContextProvider>
    </>
  )
}

export default App
