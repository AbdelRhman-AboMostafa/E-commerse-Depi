import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import { CartContext } from '../../Context/cartContext'

export default function Navbar() {

  const { isLogin, setIsLogin, setUserToken } = useContext(UserContext)
  const { cartCount } = useContext(CartContext)

  const navigate = useNavigate()

  function logout() {

    localStorage.removeItem("userToken")

    setIsLogin(false)
    setUserToken(null)

    navigate('/login')
  }

  return (

    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">

      <div className="container">

        {/* LOGO */}
        <NavLink className="navbar-brand fw-bold text-success" to="/home">
          ShopEasy
        </NavLink>


        {/* TOGGLER */}
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="nav">


          {/* LEFT LINKS */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink to="/home" className="nav-link">
                Home
              </NavLink>
            </li>

            {isLogin && (
              <>
                <li className="nav-item">
                  <NavLink to="/products" className="nav-link">
                    Products
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/brand" className="nav-link">
                    Brands
                  </NavLink>
                </li>

                <li className="nav-item position-relative">
                  <NavLink to="/carts" className="nav-link">
                    Cart
                  </NavLink>

                  {/* BADGE */}
                  {cartCount > 0 && (
                    <span
                      className="position-absolute start-100 translate-middle badge rounded-pill bg-success"
                      style={{ fontSize: "10px", top: "5px" }}
                    >
                      {cartCount}
                    </span>
                  )}
                </li>
              </>
            )}

          </ul>


          {/* RIGHT SIDE */}
          <ul className="navbar-nav ms-auto">

            {!isLogin ? (

              <div className="d-flex gap-2">

                <NavLink to="/login" className="btn btn-outline-success">
                  Login
                </NavLink>

                <NavLink to="/register" className="btn btn-success">
                  Register
                </NavLink>

              </div>

            ) : (

              <li className="nav-item">

                <button
                  onClick={() => logout()}
                  className="btn btn-outline-danger"
                >
                  Logout
                </button>

              </li>

            )}

          </ul>

        </div>
      </div>
    </nav>
  )
}