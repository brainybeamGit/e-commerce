import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => {
  const [hello,setHello] = useState()

  const fetchHello = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000');
     
      setHello(data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchHello()
  }, [])

  return (

    <>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-6">
            <h1>{hello}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Vestibulum ante ipsum primis in faucibus.

            </p>

            <div className='d-flex gap-3'>
              <button className='btn btn-success'>Shop Now</button>
              <button className='btn btn-outline-success'>View Collection</button>
            </div>
          </div>
          <div className="col-6">
            <img className='img-fluid' src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-f-9.webp" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home