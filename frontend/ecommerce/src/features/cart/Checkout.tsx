import React, { useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from 'react-redux';
import { selectCart } from './cartSlice';

const Checkout = () => {
    const cart = useSelector(selectCart)
    let total = 0
    useEffect(() => {
        let tmp = 0
        cart.forEach(x => tmp = tmp + x.price * x.amount)
        total = tmp
    }, [cart])

    return (
        <div><PayPalScriptProvider options={{ "client-id": "Acv35MxVCkOUiuPZvxSGnEhK7-RGjVWQvxtxbhDpALeyCVBoa5o3gnRSYvb9aiYCdZaz9VjPkjQOcGef" }}>
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
                }}
            />        </PayPalScriptProvider>     </div>
    )
}

export default Checkout