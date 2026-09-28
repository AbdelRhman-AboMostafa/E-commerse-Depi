import ProductCard from './ProductCard'
import { useEffect, useState } from 'react'
import axios from "axios"
import Loader from '../Loader/Loader'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"

export default function Products() {

  const [productsList, setProductsList] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("default")


  // GET PRODUCTS
  function getProducts() {

    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {

        setProductsList(data.data)
        setFilteredProducts(data.data)

        setLoading(false)
      })
      .catch(() => setLoading(false))
  }


  useEffect(() => {
    getProducts()
  }, [])


  // SEARCH + FILTER LOGIC
  useEffect(() => {

    let updated = [...productsList]


    // SEARCH FILTER
    if (search) {
      updated = updated.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    }


    // SORT FILTER
    if (sort === "low") {
      updated.sort((a, b) => a.price - b.price)
    }

    if (sort === "high") {
      updated.sort((a, b) => b.price - a.price)
    }


    setFilteredProducts(updated)

  }, [search, sort, productsList])


  return (

    <div className="container py-5">
{/* ================= PRODUCT IMAGE SLIDER ================= */}
<div className="mb-5">

  <Swiper
    modules={[Autoplay]}
    autoplay={{
      delay: 1000, 
      disableOnInteraction: false
    }}
    loop={true}
    spaceBetween={20}
    slidesPerView={3}
    breakpoints={{
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }}
  >

    {productsList.slice(0, 10).map((product) => (

      <SwiperSlide key={product._id}>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

          <img
            src={product.imageCover}
            alt={product.title}
            className="w-100 p-2"
            style={{
              height: "250px",
              objectFit: "cover",
              borderRadius: "15px",
            objectPosition: "center",

            }}
          />

          <div className="p-3 text-center">

            <h6 className="fw-bold">
              {product.title.split(" ").slice(0, 3).join(" ")}
            </h6>

            <span className="text-success fw-bold">
              {product.price} EGP
            </span>

          </div>

        </div>

      </SwiperSlide>

    ))}

  </Swiper>

</div>
      {/* HEADER CONTROLS */}
      <div className="row mb-4 g-3">

        {/* SEARCH */}
        <div className="col-md-6">

          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        {/* FILTER */}
        <div className="col-md-3">

          <select
            className="form-select form-select-lg"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >

            <option value="default">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>

          </select>

        </div>


        {/* RESET */}
        <div className="col-md-3">

          <button
            className="btn btn-outline-dark w-100 btn-lg"
            onClick={() => {
              setSearch("")
              setSort("default")
            }}
          >

            Reset Filters

          </button>

        </div>

      </div>


      {/* PRODUCTS */}
      {
        !isLoading ?

          filteredProducts.length > 0 ? (

            <div className="d-grid gap-4"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
              }}
            >

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

            </div>

          ) : (

            <div className="text-center py-5">

              <h3 className="text-muted">
                No Products Found 😢
              </h3>

            </div>

          )

          : <Loader />
      }

    </div>
  )
}