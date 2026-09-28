import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {

  return (
    <>

      <div
        className='min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden'
        style={{
          background:
            'linear-gradient(135deg,#0f172a,#111827,#064e3b)'
        }}
      >

        {/* Background Circles */}
        <div
          className='position-absolute rounded-circle'
          style={{
            width: '350px',
            height: '350px',
            background: 'rgba(34,197,94,0.15)',
            top: '-100px',
            left: '-100px',
            filter: 'blur(60px)'
          }}
        ></div>

        <div
          className='position-absolute rounded-circle'
          style={{
            width: '400px',
            height: '400px',
            background: 'rgba(16,185,129,0.15)',
            bottom: '-120px',
            right: '-120px',
            filter: 'blur(60px)'
          }}
        ></div>


        {/* Main Card */}
        <div className='container position-relative z-1'>

          <div className='row justify-content-center align-items-center g-5'>

            {/* LEFT */}
            <div className='col-lg-6 text-white'>

              <span
                className='badge bg-success px-4 py-2 rounded-pill fs-6 mb-4'
              >
                ERROR 404
              </span>

              <h1
                className='fw-black mb-3'
                style={{
                  fontSize: '120px',
                  lineHeight: '1'
                }}
              >
                4<span className='text-success'>0</span>4
              </h1>

              <h2 className='fw-bold display-5 mb-4'>
                Page Not Found
              </h2>

              <p
                className='text-light opacity-75 fs-5 mb-5'
              >
                The page you are looking for may have been removed,
                renamed, or is temporarily unavailable.
              </p>

              {/* BUTTONS */}
              <div className='d-flex flex-wrap gap-3'>

                <Link
                  to='/'
                  className='btn btn-success btn-lg px-5 py-3 rounded-4 shadow'
                >
                  <i className='fas fa-house me-2'></i>
                  Back Home
                </Link>

                <Link
                  to='/products'
                  className='btn btn-outline-light btn-lg px-5 py-3 rounded-4'
                >
                  <i className='fas fa-bag-shopping me-2'></i>
                  Shop Now
                </Link>

              </div>

            </div>


            {/* RIGHT */}
            <div className='col-lg-5'>

              <div
                className='card border-0 shadow-lg rounded-5 overflow-hidden'
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)'
                }}
              >

                <div className='card-body p-5 text-center text-white'>

                  {/* ICON */}
                  <div
                    className='mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle bg-success shadow-lg'
                    style={{
                      width: '120px',
                      height: '120px',
                      fontSize: '50px'
                    }}
                  >
                    🚀
                  </div>

                  <h3 className='fw-bold mb-3'>
                    Lost in Space?
                  </h3>

                  <p className='text-light opacity-75 mb-4'>
                    Let’s help you get back to your shopping experience.
                  </p>


                  {/* STATS */}
                  <div className='row g-3'>

                    <div className='col-4'>

                      <div className='bg-dark bg-opacity-50 rounded-4 p-3'>

                        <h4 className='fw-bold text-success mb-1'>
                          24/7
                        </h4>

                        <small className='text-light opacity-75'>
                          Support
                        </small>

                      </div>
                    </div>

                    <div className='col-4'>

                      <div className='bg-dark bg-opacity-50 rounded-4 p-3'>

                        <h4 className='fw-bold text-success mb-1'>
                          1K+
                        </h4>

                        <small className='text-light opacity-75'>
                          Products
                        </small>

                      </div>
                    </div>

                    <div className='col-4'>

                      <div className='bg-dark bg-opacity-50 rounded-4 p-3'>

                        <h4 className='fw-bold text-success mb-1'>
                          99%
                        </h4>

                        <small className='text-light opacity-75'>
                          Happy Users
                        </small>

                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </>
  )
}