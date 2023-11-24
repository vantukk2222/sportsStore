import { useDispatch, useSelector } from "react-redux"
import MainShop from "./MainShop"
import { useState,useEffect } from "react"
import { fetchGetShops } from "~/redux/reducers/Business/shop"

const Shop=()=>{
    const dispatch=useDispatch()
    const {dataShop,loadingShop,errorShop}= useSelector((state)=>state.shops)
    const [shopItem, setShopItem] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(1);
    useEffect(() => {
        dispatch(fetchGetShops(page, pageSize));
    }, [page, pageSize]);
    useEffect(() => {
        setShopItem(...dataShop.content)
        
    }, [dataShop])
    return(
        <section className='shop background'>
            <MainShop shopItem={shopItem}/>
            </section>
    )
}
export default Shop