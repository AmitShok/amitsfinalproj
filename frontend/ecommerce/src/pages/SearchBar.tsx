import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import { getAllProductsAsync, selectProducts } from '../features/Home/manyProductsSlice'
import { SERVER } from '../globalVar'
import './searchBar.css'
const SearchBar = () => {
    const dispatch = useAppDispatch()

    const [Search, setSearch] = useState("")
    useEffect(() => {
        dispatch(getAllProductsAsync(true))
    }, [])
    const prods = useSelector(selectProducts)
    return (
        <div>
            <div>

                <input list="mylist" className="searchBar" placeholder="search at AmitStore" onChange={(e) => setSearch(e.target.value)} />
                <div style={Search.length > 0 ? { display: "block" } : { display: 'none' }} className=" dropContent">
                    {prods.results && prods.results.map((x: any, i: number) =>
                        x.name.includes(Search) ? (
                            <div style={{ paddingLeft: '25px',paddingRight:'25px', fontSize: '25px', display: 'flex', justifyContent: 'space-around' }} key={i}>
                                <img src={`${SERVER}static${x.image}`} alt="Bootstrap" width="80px" height="80px" />
                                <div style={{marginRight:'50px'}}>{x.name} {x.price}&#8362;</div>
                                <div onClick={() => dispatch(addToCart(x))} style={{
                                    backgroundColor: '#000000', padding: '3px', margin: '0px', color: 'white', borderRadius: '25px', fontWeight: 'bolder',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '1px 1px #0071dc', position:'absolute', right:'10px'
                                }}>Add to cart</div>
                            </div>
                        ) : null
                    )}                </div>
            </div>
        </div>
    )
}

export default SearchBar
