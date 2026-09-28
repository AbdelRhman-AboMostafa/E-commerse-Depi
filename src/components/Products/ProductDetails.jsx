import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/cartContext";


const API_URL = "https://ecommerce.routemisr.com/api/v1/products"

export default function ProductDetails() {

    let { addToCart } = useContext(CartContext);
      async function handleAddToCart(id){
    let res = await addToCart(id)
    console.log(res)
  }
  

    let { id } = useParams();
    console.log(id);
    let [productDetails, setProductDetails] = useState(null);
    let [isLoading, setIsLoading] = useState(true);


    async function getProductById(id) {
        let { data } = await axios.get(`${API_URL}/${id}`);
        console.log(data);
        setIsLoading(false);
        setProductDetails(data.data);
    }

    useEffect(() => {
        getProductById(id);
    }, []);



    return (
        <>
            <div className="container py-3">
    {isLoading ? (
        <Loader />
    ) : (
        <div className="row g-5 align-items-start">

            {/* ================= IMAGE SECTION ================= */}
            <div className="col-lg-5">
                <div className="bg-white shadow rounded-4 p-3 position-sticky top-0">

                    {/* الصورة الأساسية */}
                    <div className="overflow-hidden rounded-4 border">
                        <img
                            src={productDetails.imageCover}
                            alt={productDetails.title}
                            className="w-100 product-main-image"
                            style={{
                                objectFit: 'cover',
                                maxHeight: '500px'
                            }}
                        />
                    </div>

                    {/* صور إضافية لو موجودة */}
                    <div className="d-flex gap-2 mt-2 flex-wrap">
                        {productDetails.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt=""
                                className="border rounded-3 p-1"
                                style={{
                                    width: '75px',
                                    height: '75px',
                                    objectFit: 'cover',
                                    cursor: 'pointer'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= DETAILS SECTION ================= */}
            <div className="col-lg-7">

                {/* Category */}
                <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill mb-3">
                    {productDetails.category?.name}
                </span>

                {/* Title */}
                <h1 className="fw-bold mb-3">
                    {productDetails.title}
                </h1>

                {/* Brand */}
                <h5 className="text-muted mb-4">
                    Brand:
                    <span className="fw-semibold text-dark ms-2">
                        {productDetails.brand?.name}
                    </span>
                </h5>

                {/* Rating */}
                <div className="d-flex align-items-center gap-3 mb-4">

                    <div className="bg-warning-subtle px-3 py-2 rounded-3">
                        <i className="fas fa-star text-warning me-2"></i>
                        <span className="fw-bold">
                            {productDetails.ratingsAverage}
                        </span>
                    </div>

                    <span className="text-muted">
                        ({productDetails.ratingsQuantity} Reviews)
                    </span>
                </div>

                {/* Price */}
                <div className="d-flex align-items-center gap-3 mb-4">

                    <h2 className="text-success fw-bold m-0">
                        {productDetails.price} EGP
                    </h2>

                    {productDetails.priceAfterDiscount && (
                        <>
                            <span
                                className="text-decoration-line-through text-muted fs-5"
                            >
                                {productDetails.priceBeforeDiscount} EGP
                            </span>

                            <span className="badge bg-danger">
                                Sale
                            </span>
                        </>
                    )}
                </div>

                {/* Description */}
                <div className="bg-light rounded-4 p-4 mb-4">
                    <h4 className="mb-3">Product Description</h4>

                    <p className="text-muted lh-lg mb-0">
                        {productDetails.description}
                    </p>
                </div>

                {/* Colors */}
                {productDetails.availableColors?.length > 0 && (
                    <>
                        <h5 className="mb-3">Available Colors</h5>

                        <div className="d-flex align-items-center gap-3 mb-4">
                            {productDetails.availableColors.map((color, index) => (
                                <div
                                    key={index}
                                    title={color}
                                    style={{
                                        width: '35px',
                                        height: '35px',
                                        borderRadius: '50%',
                                        backgroundColor: color,
                                        border: '3px solid white',
                                        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                                        cursor: 'pointer'
                                    }}
                                ></div>
                            ))}
                        </div>
                    </>
                )}

                {/* Quantity */}
                <div className="d-flex align-items-center gap-3 mb-4">
                    <span className="fw-semibold">Stock:</span>

                    <span className="badge bg-dark px-3 py-2">
                        {productDetails.quantity} Available
                    </span>
                </div>

                {/* Buttons */}

                <NavLink to={"/carts"}>
                <div className="d-flex gap-3 flex-wrap">

                    <button onClick={() => handleAddToCart(productDetails._id)} className="btn btn-success flex-grow-1 py-3 rounded-4 fw-semibold fs-5">
                        <i className="fas fa-cart-plus me-2"></i>
                        Add To Cart
                    </button>

                    <button className="btn btn-outline-dark py-3 px-4 rounded-4">
                        <i className="far fa-heart"></i>
                    </button>
                </div>
                </NavLink>
            </div>
        </div>
    )}
</div>
        </>
    )
}