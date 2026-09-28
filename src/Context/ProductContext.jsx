import axios from "axios";
import { createContext  ,useState } from "react";

export const ProductContext = createContext();

const API_URL = "https://ecommerce.routemisr.com/api/v1/products"

export default function ProductContextProvider({children}){

    let [productsList , setProductsList] = useState(null);

    async function getProducts(){
        let res = await axios.get(API_URL);
        // console.log(res.data.data);
        let data = res.data.data;
        setProductsList(data);
        return data;
    }
    



    async function getProductById(id){
        let {data} = await axios.get(`${API_URL}/${id}`);
        console.log(data);
    }
    
 



    return(
        <ProductContext.Provider value={{  getProductById   }}>
            {children}
        </ProductContext.Provider>
    )
}
