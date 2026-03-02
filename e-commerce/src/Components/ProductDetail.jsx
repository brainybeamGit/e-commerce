import React, { useEffect, useState } from 'react'
import axios from "../utils/axiosInstance"
import { useParams } from 'react-router-dom'

const ProductDetail = () => {

    const [productDetail, setProductDetail] = useState()
    const { id } = useParams();
    const userId = localStorage.getItem('userId')

    const fetchProductDetail = async () => {
        try {
            const { data } = await axios.get(`/product/product-detail/${id}`);

            setProductDetail(data.product)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProductDetail()
    }, [])
    const handleAddToCart = async (id) => {

        try {

            const { data } = await axios.post('/cart/add', {
                productId: id, userId
            })

            alert(data.message)

        }
        catch (err) {
            alert(err.response.data.message)

        }
    }
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img width={500} height={500} src={`http://localhost:3000/uploads/${productDetail?.productImage}`} />
                    </div>
                    <div className="col-6">
                        <div>Name : {productDetail?.productName} </div>
                        <div>Description : {productDetail?.productDescription} </div>
                        <div>Price : {productDetail?.productPrice} </div>
                        <button onClick={() => handleAddToCart(productDetail._id)} className='btn btn-success'>Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail