import { createContext, useState } from "react"
import axios from "axios"

export const CartContext = createContext()

const baseUrl = "https://ecommerce.routemisr.com"

export default function CartContextProvider({ children }) {

  const [cartCount, setCartCount] = useState(0)
  const [cartData, setCartData] = useState(null)

  function getHeaders() {
    return {
      token: localStorage.getItem("userToken")
    }
  }

  // 🔥 helper لتوحيد التحديث
  function syncCart(data) {
    setCartData(data)
    setCartCount(data?.products?.length || 0)
  }

  // GET CART
  async function getUserCart() {
    return await axios.get(
      `${baseUrl}/api/v1/cart`,
      { headers: getHeaders() }
    ).then((res) => {

      syncCart(res.data.data)

      return res
    })
  }

  // ADD TO CART
  async function addToCart(productId) {
    return await axios.post(
      `${baseUrl}/api/v1/cart`,
      { productId },
      { headers: getHeaders() }
    ).then((res) => {

      syncCart(res.data.data)

      return res
    })
  }

  // DELETE ITEM
  async function deleteItem(id) {
    return await axios.delete(
      `${baseUrl}/api/v1/cart/${id}`,
      { headers: getHeaders() }
    ).then((res) => {

      syncCart(res.data.data)

      return res
    })
  }

  // UPDATE ITEM COUNT
  async function updateCart(id, count) {

    if (count < 1) return

    return await axios.put(
      `${baseUrl}/api/v1/cart/${id}`,
      { count },
      { headers: getHeaders() }
    ).then((res) => {

      syncCart(res.data.data)

      return res
    })
  }

  // CLEAR CART
  async function clearCart() {
    return await axios.delete(
      `${baseUrl}/api/v1/cart`,
      { headers: getHeaders() }
    ).then((res) => {

      setCartCount(0)
      setCartData(null)

      return res
    })
  }

  async function onlinePayment(cartId, shippingAddress) {

  return await axios.post(

    `${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,

    {
      shippingAddress
    },

    {
      headers: getHeaders()
    }

  )
}
  return (
    <CartContext.Provider value={{
      addToCart,
      getUserCart,
      deleteItem,
      updateCart,
      clearCart,
      onlinePayment,
      cartCount,
      cartData
    }}>
      {children}
    </CartContext.Provider>
  )
}