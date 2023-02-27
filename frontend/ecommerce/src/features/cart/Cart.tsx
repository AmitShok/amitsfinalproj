import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { change_amount, orderAsync, selectCart } from './cartSlice'
import "./cart.css"
import { useAppDispatch } from '../../app/hooks'
import { remove_prod_cart } from "./cartSlice"
import { SERVER } from '../../globalVar'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link, redirect } from 'react-router-dom'

const Cart = () => {
  const cart = useSelector(selectCart)
  const dispatch = useAppDispatch()
  const [total, settotal] = useState(0)
  const [flag, setflag] = useState(false)

  let newtotal = 0
  useEffect(() => {
    let tmp = 0
    cart.forEach(x => tmp = tmp + x.price * x.amount)
    settotal(tmp)
    newtotal = tmp
  }, [cart])

  const handlecheckout = () => {
    setflag(!flag)
    return redirect("/cart")

  }

  return (
    <div style={{ display: "flex", margin: "auto" }}>
      <div className='items_list'>
        {cart.map((prod, i) =>
          <div className='product_field' key={i}>
            <img src={`${SERVER}static${prod.image}`} alt="Bootstrap" width="120px" height="100px" />

            <div className='rmv_icon' onClick={() => dispatch(remove_prod_cart(prod))}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </div>
            <div className='prod_info'>
              <h2> {prod.name}</h2>
              <h3>{prod.price}$</h3>
            </div>
            <div className='amount_set'>
              {!flag && <span className='amount_btn' onClick={() => dispatch(change_amount({ "id": prod.id, 'amount': -1 }))}>-</span>}
              <span className='amount_info'> {prod.amount}</span>
              {!flag && <span className='amount_btn' onClick={() => dispatch(change_amount({ "id": prod.id, 'amount': 1 }))}>+</span>}
            </div>
          </div>)
        }
      </div>
      <div className='order_summary'>
        <h3>Summary</h3>
        <h5>Total {total}$</h5>

        {/* <Link to={"/checkout"} >checkout</Link> */}

        {!flag ? <div onClick={handlecheckout}>checkout test</div> : <PayPalScriptProvider options={{ "client-id": "Acv35MxVCkOUiuPZvxSGnEhK7-RGjVWQvxtxbhDpALeyCVBoa5o3gnRSYvb9aiYCdZaz9VjPkjQOcGef" }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: total.toString(),
                    },
                  },
                ],
              });
            }}
            onApprove={async (data: any, actions: any) => {
              const details = await actions.order.capture();
              const name = details.payer.name.given_name;
              alert("Transaction completed by " + name);
              dispatch(orderAsync(cart))
            }}
          />        </PayPalScriptProvider>}
       {flag && <div onClick={() => setflag(!flag)}>make more changes!</div>}


        {/* <div onClick={() => dispatch(orderAsync(cart))}>send order</div> */}


      </div>

    </div>
  )
}

export default Cart