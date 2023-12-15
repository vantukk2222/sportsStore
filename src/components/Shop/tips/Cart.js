import { useNavigate } from 'react-router';
const Cart = ({ productItems }) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };
    return (
        <>
            <div className="content grid product">
                {productItems.map((val, index) => {
                    return (
                        <div className="box" key={index} onClick={() => handleClick(val.id)}>
                            <div className="img">
                                <img src={val.imageSet.find((e) => e.is_main === true).url} alt="" />
                            </div>
                            <h4>{val.name}</h4>
                            <span>${val.price_min}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Cart;
