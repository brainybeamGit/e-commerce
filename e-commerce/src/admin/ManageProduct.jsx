import React, { useEffect, useState } from 'react'
import axios from '../utils/axiosInstance'

const ManageProduct = () => {
  const [productName, setProductName] = useState()
  const [productImage, setProductImage] = useState()
  const [productDescription, setProductDescription] = useState()
  const [productPrice, setProductPrice] = useState()
  const [productList, setProductList] = useState()
  const [preview, setPreview] = useState()
  const [editId, setEditId] = useState()



  const fetchProduct = async () => {
    try {

      const { data } = await axios.get("/product/list")
      console.log(data.productList)
      setProductList(data.productList)


    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleProduct = async (e) => {
    e.preventDefault();
    console.log("productName ===> ", productName)
    console.log("productImage ===> ", productImage)
    console.log("productDescription ===> ", productDescription)
    console.log("productPrice ===> ", productPrice)

    let formData = new FormData()
    formData.append("productName", productName)
    formData.append("productImage", productImage)
    formData.append("productDescription", productDescription)
    formData.append("productPrice", productPrice)
    try {

      if (editId) {
        const { data } = await axios.put(`/product/edit/${editId}`,
          formData
        )
        console.log(data)
        alert(data.message)
      }
      else {
        const { data } = await axios.post('/product/add',
          formData
        )
        console.log(data)
        alert(data.message)
      }


      setProductName('')
      setProductImage('')
      setProductDescription('')
      setProductPrice('')
      fetchProduct();
    }
    catch (err) {
      alert(err.response.data.message)

    }
  }
  const handleEdit = (item) => {
    setEditId(item._id)
    setProductName(item.productName)
    setProductDescription(item.productDescription)
    setProductPrice(item.productPrice)

    setPreview(item.productImage)


  }

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/product/delete/${id}`)
      console.log(data)
      alert(data.message)
      fetchProduct();
    }
    catch (err) {
      console.log(err)

    }
  }

  return (
    <>
      <div className="container">
        <div className="row">

          <h1 className='text-center'>Manage Product</h1>

          <form onSubmit={handleProduct} className='col-6 justify-content-center'>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">Product Name</label>
              <input value={productName} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} />
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">Product Image</label>
              <input type="file" className="form-control" id="exampleFormControlInput1" onChange={(e) => setProductImage(e.target.files[0])} />

              {
                preview &&
                <img width={100} height={100} src={`/uploads/${preview}`} alt="" />
              }
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">Product Description</label>
              <input value={productDescription} type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => setProductDescription(e.target.value)} />
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">Product Price</label>
              <input value={productPrice} type="number" className="form-control" id="exampleFormControlInput1" onChange={(e) => setProductPrice(e.target.value)} />
            </div>

            <button type='submit' className='btn btn-primary'> {editId ? "Update Product" : "Add Product"}</button>
          </form>

        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Description</th>
              <th scope="col">Product Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

            {
              productList == 0
                ?
                <h1>No product found</h1>
                :
                productList?.map((item) => (
                  <tr key={item._id}>
                    <th scope="row">
                      <img width={100} height={100} src={`/uploads/${item.productImage}`} alt="" />
                    </th>
                    <td>{item.productName}</td>
                    <td>{item.productDescription}</td>
                    <td>{item.productPrice}</td>
                    <td>
                      <button className='btn btn-success me-3' onClick={() => handleEdit(item)} >Edit</button>
                      <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))
            }


          </tbody>
        </table>
      </div>
    </>
  )
}

export default ManageProduct