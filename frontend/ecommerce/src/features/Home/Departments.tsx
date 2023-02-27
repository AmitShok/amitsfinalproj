import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../ProdCard/Card'
import { getAllProductsAsync, selectCategories, selectProducts } from './manyProductsSlice'
import Product from '../../models/Product';
import { useAppDispatch } from '../../app/hooks';

const Departments = () => {
    
    const dispatch = useAppDispatch()
    useEffect(() => {
    dispatch(getAllProductsAsync(true))
    }, [])
    
    const prods = useSelector(selectProducts)
    const cats = useSelector(selectCategories)
    const [selectedCat, setselectedCat] = useState("")
    return (
        <div>
            <div style={{display:'flex',justifyContent:'center'}}>
                {cats.map((cat: string, i) => (<div style={{margin:'5px',color:'white' ,backgroundColor:'#000000',borderRadius:'25px',padding:'7px',cursor:'pointer'}} key={i}>
                    <div onClick={() => setselectedCat(cat)}>
                      <strong>  {cat}</strong>
                    </div>
                </div>))}
            </div>


            <div style={{ justifyContent: 'center', display: "flex", flexWrap: 'wrap' }}>
                {prods.results && prods.results.map((p: Product, i: any) => {
                    if (p.category === selectedCat) {
                        return (
                            <div style={{ flex: "0 0 33%", minWidth: "300px", maxWidth: "350px" }} key={i}>
                                <Card prod={p} name={p.name} img={p.image} price={p.price} desc={p.description}></Card>
                            </div>
                        );
                    }
                    return null;
                })}

            </div>

        </div>
    )
}

export default Departments



