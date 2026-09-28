import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/cartContext";


export default function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext)

  async function handleAddToCart(id){
    let res = await addToCart(id)
    console.log(res)
  }
  


    return (
        <>
            {/* write a crad code here with bootstrab  */}
            <div className="card container py-3 products-container bg-light rounded-4 shadow-lg mx-auto ">

                <div>
                    <NavLink to={`/details/${product._id}`} >
                        <img src={product.imageCover} className="w-100" alt={product.title} />
                    </NavLink>
                    <span className="text-info d-block"> {product.category.name} </span>
                    <span className=" d-block"> {product.title.split(' ').slice(0, 3).join(' ')} </span>

                    <div className="d-flex justify-content-between my-2">

                        <span>{product.price} EGP</span>
                        <span>{product.ratingsQuantity}<i className="fas fa-star text-warning"></i></span>

                    </div>
                    <button onClick={() => handleAddToCart(product._id)} className='btn btn-success w-100 rounded-4 my-2 py-2 text-white fs-5 '>
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    );
}