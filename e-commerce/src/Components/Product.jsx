
import Card from "../ReuseableComponents/Card"
import { useEffect, useState } from "react"
import axios from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom"

const Product = () => {
  const [productList, setProductList] = useState()
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  const fetchProduct = async () => {
    try {

      const { data } = await axios.get("/product/list")
      setProductList(data.productList)

    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddToCart = async (item) => {

    try {

      const { data } = await axios.post('/cart/add', {
        productId: item._id, userId
      })

      alert(data.message)

    }
    catch (err) {
      alert(err.response.data.message)

    }
  }

  const handleProductDetail = (id) => {
    navigate(`/product-detail/${id}`)
  }
  return (
    <>
      <div className="container">
        <div className="row">
          {
            productList?.map((item) => (
              <div className="col-4" key={item._id}>
                <Card
                  handleProductDetail={() => handleProductDetail(item._id)}
                  handleAddToCart={() => handleAddToCart(item)}
                  name={item.productName} img={`/uploads/${item.productImage}`} description={item.productDescription} price={item.productPrice} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Product