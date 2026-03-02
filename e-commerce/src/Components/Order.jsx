import React from 'react'
import axios from "../utils/axiosInstance"
import { useEffect } from 'react';
import { useState } from 'react';

const Order = () => {
  const [orderList, setOrderList] = useState()
  const role = localStorage.getItem("role")
  
  const fetchOrder = async () => {
    try {
      if (role === "admin") {
        const { data } = await axios.get("/order/admin/order-list");
        console.log(data)
        setOrderList(data.orderList)
      } else {
        const { data } = await axios.get("/order/order-list");
        console.log(data)
        setOrderList(data.orderList)
      }

    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchOrder()
  }, [])
  return (
    <>

      <div className="container">

        <table style={{ width: "100%" }}>
          <tr>
            <th>Id</th>
            <th>Order Status</th>
            <th>Payment Status</th>
            <th>Total Amount</th>
          </tr>

          {
            orderList?.map((item) => (
              <>
                <tr>

                  <td>{item.orderId}</td>
                  <td>{item.orderStatus}</td>
                  <td>{item.paymentStatus}</td>
                  <td>{item.totalAmount}</td>
                </tr>
              </>
            ))}
        </table>
      </div>
    </>
  )
}

export default Order