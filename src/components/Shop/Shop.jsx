import React from "react"
import HeaderShop from "./HeaderShop";
import Tips from "./tips/Tips";
import Catg from "./Catg";
import SortShop from "./SortShop";
import ShopCart from "./ShopCart";

const Shop = ({ addToCart, shopItems, apiCate }) => {
    return (
        <>
            <section className='shop background'>
                <div >
                    <HeaderShop />
                </div>
                <div>
                    <Tips />
                </div>

                <div className='container d_flex'>
                    <Catg shopItems={shopItems} apiCate={apiCate} />

                    <div className='contentWidth'>
                        <div className='heading d_flex'>
                            <SortShop />
                        </div>
                        <div className='heading d_flex'>
                            <div className='heading-left row  f_flex'>
                                <h2>SẢN PHẨM CỦA SHOP</h2>
                            </div>
                            <div className='heading-right row '>
                                <span>Xem tất cả</span>
                                <i className='fa-solid fa-caret-right'></i>
                            </div>
                        </div>
                        <div className='product-content  grid1'>
                            <ShopCart addToCart={addToCart} shopItems={shopItems} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Shop;
