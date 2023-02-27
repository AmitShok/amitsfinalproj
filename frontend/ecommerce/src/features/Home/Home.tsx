import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../cart/cartSlice';
import Card from '../ProdCard/Card';
import { SERVER } from '../../globalVar';
import Product from '../../models/Product';
import { getAllProductsAsync, getMoreProdsAsync, selectProducts } from './manyProductsSlice';
import { selectProdctsOrderd } from '../MyOrders/myOrdersSlice';
import { getReviewsAsync } from '../review/reviewSlice';



const Home = () => {
  const dispatch = useAppDispatch()
  const prods = useSelector(selectProducts)

  useEffect(() => {
    dispatch(getAllProductsAsync())
    // dispatch(getReviewsAsync())

  }, []);

  return (
    <div>
      <div style={{ justifyContent: 'center', display: "flex", flexWrap: 'wrap' }}>
        {prods.results && prods.results.map((p: Product, i: any) => (
          <div style={{ flex: "0 0 33%", minWidth: "300px", maxWidth: "350px" }} key={i}>
            <Card update_products={() => dispatch(getAllProductsAsync())} prod={p} id={p.id} name={p.name} img={p.image} price={p.price} desc={p.description}></Card>
          </div>
        ))}
        <br />

      </div><br />
      <div style={{ justifyContent: "space-around", display: 'flex' }}>
        {prods.previous && <div style={{ cursor: "pointer", borderRadius: "25px", backgroundColor: "red", padding: "10px", margin: "10px" }} onClick={() => dispatch(getMoreProdsAsync(prods.previous))}><strong>previous page</strong></div>}
       {prods.next && <div style={{ cursor: "pointer", borderRadius: "25px", backgroundColor: "red", padding: "10px", margin: "10px" }} onClick={() => dispatch(getMoreProdsAsync(prods.next))}>          <strong>          next page          </strong>                     </div>}
      </div>

    </div>
  )
}

export default Home

