import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import heroImg from "../../assets/hero_banner.png"

export default function Home() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  async function getProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      )

      setProducts(data.data)

    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-success"></div>
      </div>
    )
  }

  return (
    <div className="home-page">

      {/* ================= HERO ================= */}
      <section
        className="position-relative text-white d-flex align-items-center"
        style={{
          minHeight: "90vh",
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        {/* overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.65)"
          }}
        />

        {/* content */}
        <div className="container position-relative z-2">

          <div className="col-lg-7">

            <span className="badge bg-success px-3 py-2 mb-3">
              New Collection 2026
            </span>

            <h1 className="display-3 fw-bold mb-4">
              Discover Premium <br /> Shopping Experience
            </h1>

            <p className="lead text-light opacity-75 mb-4">
              Shop the latest fashion, electronics and lifestyle products
              with unbeatable prices and fast delivery.
            </p>

            <div className="d-flex gap-3 flex-wrap">

              <Link to="/products" className="btn btn-success btn-lg px-5">
                Shop Now
              </Link>

              <Link to="/brand" className="btn btn-outline-light btn-lg px-4">
                Explore Brands
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2 className="fw-bold">🔥 Featured Products</h2>

          <Link to="/products" className="text-success fw-semibold">
            View All
          </Link>

        </div>

        <div className="row g-4">

          {products.slice(0, 8).map((product) => (

            <div key={product._id} className="col-md-3">

              <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">

                <img
                  src={product.imageCover}
                  className="w-100"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="p-3">

                  <span className="text-success small">
                    {product.category?.name}
                  </span>

                  <h6 className="fw-bold mt-2">
                    {product.title.split(" ").slice(0, 3).join(" ")}
                  </h6>

                  <div className="d-flex justify-content-between mt-2">

                    <span className="fw-bold text-success">
                      {product.price} EGP
                    </span>

                    <span className="text-warning small">
                      ⭐ {product.ratingsAverage}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="bg-dark text-white py-5 mt-4">

        <div className="container text-center">

          <h2 className="fw-bold mb-3">
            Ready to start shopping?
          </h2>

          <p className="text-light opacity-75 mb-4">
            Join thousands of happy customers today
          </p>

          <Link to="/products" className="btn btn-success px-5 py-3">
            Get Started
          </Link>

        </div>

      </section>

    </div>
  )
}