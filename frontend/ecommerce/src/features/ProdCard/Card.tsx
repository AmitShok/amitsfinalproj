import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { SERVER } from '../../globalVar';
import Product from '../../models/Product';
import Review from '../../models/Review';
import { removeProdAsync } from '../adminTools/productSlice';
import { addToCart } from '../cart/cartSlice';
import { selectUser } from '../login/loginSlice';
import { selectProdctsOrderd } from '../MyOrders/myOrdersSlice';
import { getReviewsAsync, selectAllReviews, sendReview } from '../review/reviewSlice';
import "./card.css"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Rating, Typography } from '@mui/material';

const Card = (props: any) => {

    const dispatch = useAppDispatch()
    const currentUser: string = useSelector(selectUser)
    const productsOrderd: number[] = useSelector(selectProdctsOrderd)
    const all_reviews: any = useSelector(selectAllReviews)
    const [Value, setValue] = useState(0)
    const handle_remove = async () => {
        await dispatch(removeProdAsync(props.prod.id))
        props.update_products()
    }
    const handleReview = (rate: any) => {
        // dispatch(getReviewsAsync())
        dispatch(sendReview({
            "product": props.prod.id, "rating": rate, "title": "yoni review",
            "text": "bla bla bla"
        }))
    }
    const tmp = Array.isArray(all_reviews) ? all_reviews.find((review: { product: any; }) => review.product === props.prod.id) : undefined;
    const tmprate = tmp ? tmp.avgRating : 0
    const tmp_img=props.img.substring(1)


    return (
        <div className='main'>
            <div className='img_container'>
                <img src={`${SERVER}${tmp_img}`} alt="Bootstrap" width="120px" height="120px" />
                <div onClick={() => dispatch(addToCart(props.prod))} className='add2cart_btn '>Add to cart</div>
                {productsOrderd.includes(props.prod.id) &&
                    <Popup trigger={<div className='add2cart_btn' style={{ background: 'green' }}> Review</div>} position="right center">
                        <div><Typography component="legend">Controlled</Typography>
                            <Rating
                                name="simple-controlled"
                                value={Value}
                                onChange={(event, newValue: any) => {
                                    setValue(newValue);
                                }}
                            />
                            <div onClick={() => handleReview(Value)}>send review</div>
                        </div>
                    </Popup>}
                <div style={currentUser == 'admin' ? { backgroundColor: "red" } : { display: "none" }} onClick={handle_remove} className='add2cart_btn '>rmv prod</div>
            </div>
            <div className='details_container'>
                <strong>
                    {props.price}<br />
                    {props.name}<br />
                    {props.desc}<br />
                    <br />
                    <Typography component="legend"></Typography>
                    <Rating name="read-only" value={tmprate} readOnly />



                </strong>
            </div>
            <div className='icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
            </div>
        </div>
    )
}


export default Card

