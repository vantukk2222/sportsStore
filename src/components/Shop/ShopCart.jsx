
import React, { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom";

const ShopCart = ({ shopItems, addToCart }) => {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(count + 1)
    }

    return (
        <>

            {shopItems.map((shopItems, index) => {
                return (

                    <div key={index} className='box'>
                        <div className='product mtop'>
                            <div key={shopItems.id} className='img'>
                                <span className='discount'>{shopItems.discount}% Off</span>
                                <Link to={`/product/${shopItems.id}`}>
                                    {<img src={(shopItems.imageSet.map(eachImg => {
                                        return eachImg.url
                                    }))}></img>}
                                </Link>
                                <div className='product-like'>
                                    <label>{count}</label> <br />
                                    <i className='fa-regular fa-heart' onClick={increment}></i>
                                </div>
                            </div>
                            <div className='product-details'>
                                <h3>{shopItems.name}</h3>
                                <div className='rate'>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                    <i className='fa fa-star'></i>
                                </div>
                                <div className='price'>
                                    <h4>{shopItems.price}vnđ </h4>

                                    <button onClick={() => addToCart(shopItems)}>
                                        <i className='fa fa-plus'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            )
            }

        </>

    )
}

export default ShopCart
