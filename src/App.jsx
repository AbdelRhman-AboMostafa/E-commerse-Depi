
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Brand from './components/Brand/Brand'
import Login from './components/Login/Login'
import Register from './components/Rgister/Rgister'
import Carts from './components/Carts/Carts'
import NotFound from './components/NotFound/NotFound'
import UserContextProvider from './Context/userContext'
import ProductContextProvider from './Context/ProductContext'
import ProductDetails from './components/Products/ProductDetails'
import ProtectedRoutes from './components/ProductedRoutes/ProductedRoutes'
import CartContextProvider from './Context/cartContext'
import { Toaster } from 'react-hot-toast'
import CheckOut from './components/CheckOut/CheckOut'
import Orders from './components/Orders/Orders'

function App() {
  //  routing - layout 
  let paths = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "home", element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: "brand", element: <ProtectedRoutes><Brand /></ProtectedRoutes> },
        { path: "login", element: <Login /> },
        { path: "register", element:  <Register /> },
        { path: "carts", element: <ProtectedRoutes><Carts /></ProtectedRoutes> },
        { path: "details/:id", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: "checkout", element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
        { path: "allorders", element: <ProtectedRoutes><Orders /></ProtectedRoutes> },
        { path: "*", element: <NotFound /> }

      ]
    }
  ])
  return (
    <>

      <ProductContextProvider>
        <UserContextProvider>
          <CartContextProvider>
            <RouterProvider router={paths} />
            <Toaster />    
          </CartContextProvider>
        </UserContextProvider>
      </ProductContextProvider>
    </>
  )
}

export default App
