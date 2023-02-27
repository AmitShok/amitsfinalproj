import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import { Order } from '../../models/myOrders'
import Product from '../../models/Product'
import { selectOrders, userOrdersAsync } from './myOrdersSlice'

const MyOrders = () => {
  const orders = useSelector(selectOrders)

  return (
    // <div>MyOrders</div>
    // *********************
    <div>
      <h2>My Orders</h2>
      {orders.map((order: Order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>User: {order.user}</p>
          <ul>
            {order.orderItems.map((product: Product,i) => (
              <li key={i}>
                {/* <Product product={product} /> */}
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category}</p>
                  {/* Add any other product details you want to display */}
                {/*  */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    // ******************
  )
}

export default MyOrders
