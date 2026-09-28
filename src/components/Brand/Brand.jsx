import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Brand() {

  const [brands, setBrands] = useState([])
  const [filteredBrands, setFilteredBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")


  // GET BRANDS
  async function getBrands() {

    try {

      let res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")

      setBrands(res.data.data)
      setFilteredBrands(res.data.data)

      setLoading(false)

    } catch (err) {
      setLoading(false)
    }
  }


  useEffect(() => {
    getBrands()
  }, [])


  // SEARCH FILTER
  useEffect(() => {

    let updated = brands.filter((brand) =>
      brand.name.toLowerCase().includes(search.toLowerCase())
    )

    setFilteredBrands(updated)

  }, [search, brands])


  return (

    <div className='container py-5'>


      {/* SEARCH */}
      <div className='row mb-4'>

        <div className='col-md-6 mx-auto'>

          <input
            type='text'
            className='form-control form-control-lg shadow-sm'
            placeholder='Search brands...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>


      {/* LOADING */}
      {loading ? (

        <div className='text-center py-5'>
          <div className='spinner-border text-success'></div>
        </div>

      ) : (

        <div className='row g-4'>

          {filteredBrands.length > 0 ? (

            filteredBrands.map((brand) => (

              <div
                key={brand._id}
                className='col-6 col-md-4 col-lg-3'
              >

                <div
                  className='card border-0 shadow-lg h-100 text-center rounded-4 brand-card'
                  style={{ cursor: "pointer" }}
                >

                  <div className='p-3'>

                    <img
                      src={brand.image}
                      className='img-fluid mb-3'
                      alt={brand.name}
                      style={{
                        height: "120px",
                        objectFit: "contain"
                      }}
                    />

                    <h6 className='fw-bold text-dark'>
                      {brand.name}
                    </h6>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className='text-center py-5'>

              <h4 className='text-muted'>
                No Brands Found 😢
              </h4>

            </div>

          )}

        </div>

      )}

    </div>
  )
}