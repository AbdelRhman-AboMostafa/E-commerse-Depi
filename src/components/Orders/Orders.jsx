import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function AllOrders() {

  const [orders, setOrders] = useState([])

  async function getOrders() {

    let userId = localStorage.getItem("userId")

    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    )

    console.log(response.data);

    setOrders(response.data)
  }

  useEffect(() => {

    getOrders()

  }, [])

  return (

    <div className='container py-5'>

      {/* TITLE */}
      <div className='mb-5'>

        <h1 className='fw-bold display-5'>
          My Orders
        </h1>

        <p className='text-muted'>
          Track all your previous orders
        </p>

      </div>


      {/* EMPTY */}
      {
        orders.length === 0 ?

          <div className='text-center py-5'>

            <i className='fas fa-box-open fa-4x text-muted mb-4'></i>

            <h3>No Orders Found</h3>

          </div>

          :

          <div className='row g-4'>

            {
              orders.map((order) => (

                <div
                  key={order._id}
                  className='col-lg-6'
                >

                  <div className='card border-0 shadow-lg rounded-4 p-4 h-100'>

                    {/* HEADER */}
                    <div className='d-flex justify-content-between align-items-center mb-4'>

                      <div>

                        <h5 className='fw-bold mb-1'>
                          Order #{order.id}
                        </h5>

                        <small className='text-muted'>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </small>

                      </div>

                      <span className='badge bg-success px-3 py-2 rounded-pill'>

                        Paid

                      </span>

                    </div>


                    {/* PRODUCTS */}
                    <div className='d-flex flex-column gap-3 mb-4'>

                      {
                        order.cartItems.map((item) => (

                          <div
                            key={item._id}
                            className='d-flex align-items-center gap-3'
                          >

                            <img
                              src={item.product.imageCover}
                              alt=""
                              width="70"
                              height="70"
                              className='rounded-3 object-fit-cover'
                            />

                            <div className='flex-grow-1'>

                              <h6 className='mb-1 fw-bold'>
                                {item.product.title}
                              </h6>

                              <small className='text-muted'>
                                Count: {item.count}
                              </small>

                            </div>

                            <span className='fw-bold text-success'>
                              {item.price} EGP
                            </span>

                          </div>
                        ))
                      }

                    </div>


                    {/* FOOTER */}
                    <div className='border-top pt-3 d-flex justify-content-between align-items-center'>

                      <div>

                        <small className='text-muted'>
                          Total Price
                        </small>

                        <h5 className='fw-bold text-success mb-0'>
                          {order.totalOrderPrice} EGP
                        </h5>

                      </div>

                      <div className='text-end'>

                        <small className='text-muted d-block'>
                          Payment
                        </small>

                        <span className='fw-semibold'>
                          {order.paymentMethodType}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>
              ))
            }

          </div>
      }

    </div>
  )
}