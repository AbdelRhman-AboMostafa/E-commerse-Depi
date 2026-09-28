import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Carts() {

  const {
    getUserCart,
    deleteItem,
    updateCart,
    clearCart
  } = useContext(CartContext)

  const [cartData, setCartData] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // GET USER CART
  async function getProducts() {

    setLoading(true)

    let response = await getUserCart()

    if (response?.data?.data) {

      setCartData(response.data)

      setProducts(response.data.data.products)
    }

    setLoading(false)
  }

  // DELETE ITEM
async function handleDelete(id) {

  let response = await deleteItem(id)

  if (response?.data?.status === 'success') {

    toast.success('Product Removed')

    setProducts(response.data.data.products)

    setCartData(response.data)
  }
}

  // UPDATE COUNT
  async function handleUpdate(id, count) {

    if (count < 1) return

    let response = await updateCart(id, count)

    if (response?.data?.status === 'success') {

      setProducts(response.data.data.products)

      setCartData(response.data)
    }
  }

  // CLEAR CART
  async function handleClearCart() {

    let response = await clearCart()

    if (response?.data?.message === 'success') {

      setProducts([])

      toast.success('Cart Cleared Successfully')
    }
  }

  useEffect(() => {
    getProducts()
  }, [])


  // LOADING
  if (loading) {

    return (
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <div className='spinner-border text-success'></div>
      </div>
    )
  }

  return (
    <>

      <div className='container py-5'>

        {/* HEADER */}
        <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3'>

          <div>

            <h1 className='fw-bold display-5 mb-2'>
              Shopping Cart
            </h1>

            <p className='text-muted mb-0'>
              Manage your products and checkout securely.
            </p>

          </div>


          {products.length > 0 && (

            <button
              onClick={handleClearCart}
              className='btn btn-outline-danger px-4 py-2 rounded-3'
            >

              <i className='fas fa-trash me-2'></i>

              Clear Cart

            </button>
          )}
        </div>


        {/* EMPTY CART */}
        {products.length === 0 ? (

          <div className='text-center py-5'>

            <i className='fas fa-cart-shopping fa-4x text-muted mb-4'></i>

            <h3 className='fw-bold mb-3'>
              Your Cart Is Empty
            </h3>

            <p className='text-muted'>
              Add some products to start shopping.
            </p>

          </div>

        ) : (

          <div className='row g-4'>

            {/* PRODUCTS */}
            <div className='col-lg-8'>

              <div className='d-flex flex-column gap-4'>

                {products.map((item) => (

                  <div
                    key={item._id}
                    className='card border-0 shadow-lg rounded-4 overflow-hidden'
                  >

                    <div className='row g-0 align-items-center'>

                      {/* IMAGE */}
                      <div className='col-md-4'>

                        <div
                          className='bg-light h-100'
                          style={{ minHeight: '250px' }}
                        >

                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className='img-fluid w-100 h-100'
                            style={{
                              objectFit: 'cover'
                            }}
                          />

                        </div>
                      </div>


                      {/* DETAILS */}
                      <div className='col-md-8'>

                        <div className='card-body p-4 p-lg-5'>

                          {/* CATEGORY */}
                          <span className='badge bg-success-subtle text-success mb-3 px-3 py-2 rounded-pill'>

                            {item.product.category.name}

                          </span>


                          {/* TITLE */}
                          <h3 className='fw-bold mb-3'>

                            {item.product.title}

                          </h3>


                          {/* DESCRIPTION */}
                          <p className='text-muted mb-4'>

                            {item.product.description
                              ?.split(' ')
                              .slice(0, 15)
                              .join(' ')}

                          </p>


                          {/* BRAND + RATING */}
                          <div className='d-flex flex-wrap gap-4 mb-4'>

                            <div>

                              <span className='text-muted'>
                                Brand:
                              </span>

                              <span className='fw-semibold ms-2'>

                                {item.product.brand.name}

                              </span>

                            </div>


                            <div className='d-flex align-items-center gap-2'>

                              <i className='fas fa-star text-warning'></i>

                              <span className='fw-semibold'>

                                {item.product.ratingsAverage}

                              </span>

                            </div>

                          </div>


                          {/* PRICE + QUANTITY */}
                          <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4'>

                            {/* PRICE */}
                            <div>

                              <h2 className='text-success fw-bold mb-0'>

                                {item.price} EGP

                              </h2>

                              <small className='text-muted'>
                                Product Price
                              </small>

                            </div>


                            {/* COUNT CONTROLS */}
                            <div className='d-flex align-items-center gap-3'>

                              {/* MINUS */}
                              <button
                                onClick={() =>
                                  handleUpdate(
                                    item.product._id,
                                    item.count - 1
                                  )
                                }
                                className='btn btn-outline-danger rounded-circle'
                                style={{
                                  width: '45px',
                                  height: '45px'
                                }}
                              >

                                <i className='fas fa-minus'></i>

                              </button>


                              {/* COUNT */}
                              <span
                                className='fw-bold fs-4'
                                style={{
                                  minWidth: '40px',
                                  textAlign: 'center'
                                }}
                              >

                                {item.count}

                              </span>


                              {/* PLUS */}
                              <button
                                onClick={() =>
                                  handleUpdate(
                                    item.product._id,
                                    item.count + 1
                                  )
                                }
                                className='btn btn-outline-success rounded-circle'
                                style={{
                                  width: '45px',
                                  height: '45px'
                                }}
                              >

                                <i className='fas fa-plus'></i>

                              </button>

                            </div>

                          </div>


                          {/* ACTION BUTTONS */}
                          <div className='d-flex flex-wrap gap-3 mt-5'>

                            {/* DELETE */}
                            <button
                              onClick={() =>
                                handleDelete(item.product._id)
                              }
                              className='btn btn-danger px-4 py-2 rounded-3'
                            >

                              <i className='fas fa-trash me-2'></i>

                              Remove

                            </button>


                            {/* DETAILS */}
                            <Link to={`/details/${item.product._id}`} >
                            <button className='btn btn-outline-dark px-4 py-2 rounded-3' >

                              <i className='fas fa-eye me-2'></i>

                              Details

                            </button>
                          </Link>

                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>


            {/* CHECKOUT SECTION */}
            <div className='col-lg-4'>

              <div
                className='card border-0 shadow-lg rounded-4 p-4 position-sticky'
                style={{ top: '20px' }}
              >

                <h3 className='fw-bold mb-4'>
                  Order Summary
                </h3>


                {/* TOTAL ITEMS */}
                <div className='d-flex justify-content-between mb-3'>

                  <span className='text-muted'>
                    Items
                  </span>

                  <span className='fw-semibold'>
                    {products.length}
                  </span>

                </div>


                {/* SHIPPING */}
                <div className='d-flex justify-content-between mb-3'>

                  <span className='text-muted'>
                    Shipping
                  </span>

                  <span className='text-success fw-semibold'>
                    Free
                  </span>

                </div>


                {/* TAX */}
                <div className='d-flex justify-content-between mb-3'>

                  <span className='text-muted'>
                    Tax
                  </span>

                  <span className='fw-semibold'>
                    0 EGP
                  </span>

                </div>

                <hr />


                {/* TOTAL */}
                <div className='d-flex justify-content-between align-items-center mb-4'>

                  <h4 className='fw-bold mb-0'>
                    Total
                  </h4>

                  <h3 className='fw-bold text-success mb-0'>

                    {cartData?.data?.totalCartPrice || 0} EGP

                  </h3>

                </div>


              


                {/* CHECKOUT BUTTON */}
                <div className='d-grid gap-3'>
                <Link to='/checkout' className='text-center'> 
                  <button className='btn btn-success py-3 rounded-3 fw-bold fs-5'>

                    <i className='fas fa-credit-card me-2'></i>

                    Proceed To Checkout

                  </button>
                </Link>

                <Link to='/products' className='text-center'>
                    <button className='btn btn-outline-dark py-3 rounded-3 fw-semibold'>

                    Continue Shopping

                  </button>
                </Link>

                </div>


                {/* PAYMENT METHODS */}
                <div className='mt-4 text-center'>

                  <p className='text-muted small mb-3'>
                    Secure Payment Methods
                  </p>

                  <div className='d-flex justify-content-center gap-3 fs-2'>

                    <i className='fab fa-cc-visa'></i>

                    <i className='fab fa-cc-mastercard'></i>

                    <i className='fab fa-cc-paypal'></i>

                    <i className='fab fa-apple-pay'></i>

                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

      </div>

    </>
  )
}