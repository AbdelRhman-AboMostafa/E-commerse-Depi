import  { useContext, useState,useEffect } from 'react'
import { CartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'

export default function Checkout() {

  const { cartData, onlinePayment ,getUserCart } = useContext(CartContext)

  const [details, setDetails] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")

  const [loading, setLoading] = useState(false)
  useEffect(() => {

  getUserCart()

}, [])

 async function handleSubmit(e) {

  e.preventDefault()

  if (!cartData?._id) {

    toast.error("Cart Not Found")

    return
  }

  let shippingAddress = {
    details,
    phone,
    city
  }

  let response = await onlinePayment(
    cartData._id,
    shippingAddress
  )

  if (response?.data?.status === "success") {

    window.location.href = response.data.session.url
  }
}

  return (
    <div className='container py-5'>

      <div className='row justify-content-center'>

        <div className='col-lg-7'>

          <div className='card border-0 shadow-lg rounded-4 p-5'>

            {/* TITLE */}
            <div className='text-center mb-5'>

              <h1 className='fw-bold mb-3'>
                Checkout
              </h1>

              <p className='text-muted'>
                Enter your shipping information
              </p>

            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* ADDRESS */}
              <div className='mb-4'>

                <label className='form-label fw-semibold'>
                  Address Details
                </label>

                <textarea
                  className='form-control py-3'
                  rows="4"
                  placeholder='Enter your address'
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />

              </div>

              {/* PHONE */}
              <div className='mb-4'>

                <label className='form-label fw-semibold'>
                  Phone Number
                </label>

                <input
                  type='tel'
                  className='form-control py-3'
                  placeholder='Enter phone number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

              </div>

              {/* CITY */}
              <div className='mb-5'>

                <label className='form-label fw-semibold'>
                  City
                </label>

                <input
                  type='text'
                  className='form-control py-3'
                  placeholder='Enter city'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />

              </div>

              {/* BUTTON */}
              <button
                type='submit'
                className='btn btn-success w-100 py-3 rounded-3 fw-bold fs-5'
                disabled={loading}
              >

                {
                  loading
                    ?
                    <span className='spinner-border spinner-border-sm'></span>
                    :
                    <>
                      <i className='fas fa-credit-card me-2'></i>
                      Pay Now
                    </>
                }

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}