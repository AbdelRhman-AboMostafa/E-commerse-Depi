import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-dark text-light pt-5 mt-5'>

      <div className='container'>

        <div className='row g-4'>

          {/* BRAND */}
          <div className='col-lg-4'>

            <h2 className='fw-bold text-success mb-3'>
              ShopEasy
            </h2>

            <p className='text-secondary'>
              Your one-stop destination for fashion, electronics,
              and lifestyle products with the best prices and fast delivery.
            </p>

            {/* SOCIAL */}
            <div className='d-flex gap-3 mt-4 fs-5'>

              <a href='#' className='text-light'>
                <i className='fab fa-facebook'></i>
              </a>

              <a href='#' className='text-light'>
                <i className='fab fa-instagram'></i>
              </a>

              <a href='#' className='text-light'>
                <i className='fab fa-twitter'></i>
              </a>

              <a href='#' className='text-light'>
                <i className='fab fa-linkedin'></i>
              </a>

            </div>

          </div>


          {/* QUICK LINKS */}
          <div className='col-lg-2 col-6'>

            <h5 className='mb-3'>Links</h5>

            <ul className='list-unstyled'>

              <li className='mb-2'>
                <Link to='/' className='text-secondary text-decoration-none'>
                  Home
                </Link>
              </li>

              <li className='mb-2'>
                <Link to='/products' className='text-secondary text-decoration-none'>
                  Products
                </Link>
              </li>

              <li className='mb-2'>
                <Link to='/cart' className='text-secondary text-decoration-none'>
                  Cart
                </Link>
              </li>

              <li className='mb-2'>
                <Link to='/brand' className='text-secondary text-decoration-none'>
                  Brands
                </Link>
              </li>

            </ul>

          </div>


          {/* HELP */}
          <div className='col-lg-2 col-6'>

            <h5 className='mb-3'>Support</h5>

            <ul className='list-unstyled'>

              <li className='mb-2'>
                <a href='#' className='text-secondary text-decoration-none'>
                  FAQ
                </a>
              </li>

              <li className='mb-2'>
                <a href='#' className='text-secondary text-decoration-none'>
                  Contact
                </a>
              </li>

              <li className='mb-2'>
                <a href='#' className='text-secondary text-decoration-none'>
                  Shipping
                </a>
              </li>

              <li className='mb-2'>
                <a href='#' className='text-secondary text-decoration-none'>
                  Returns
                </a>
              </li>

            </ul>

          </div>


          {/* NEWSLETTER */}
          <div className='col-lg-4'>

            <h5 className='mb-3'>Newsletter</h5>

            <p className='text-secondary'>
              Subscribe to get latest deals and offers.
            </p>

            <div className='input-group mb-3'>

              <input
                type='email'
                className='form-control'
                placeholder='Your email'
              />

              <button className='btn btn-success'>
                Subscribe
              </button>

            </div>

          </div>

        </div>


        {/* BOTTOM */}
        <div className='border-top border-secondary mt-4 pt-3 text-center text-secondary'>

          <small>
            © {new Date().getFullYear()} ShopEasy. All rights reserved.
          </small>

        </div>

      </div>

    </footer>
  )
}