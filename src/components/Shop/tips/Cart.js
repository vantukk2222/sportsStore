import { useNavigate } from 'react-router';
const Cart = ({ productItems }) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };
    return (
        <>
            <div className="content grid ">
                {productItems.map((val, index) => {
                    let givenTimeStr = val.sale?.ended_at || null;
                    if (givenTimeStr) {
                        const givenTime = new Date(givenTimeStr);
                        const currentTime = new Date();
                        if (givenTime > currentTime) givenTimeStr = true;
                        else givenTimeStr = false;
                    } else givenTimeStr = false;
                    return (
                        <div className="box" key={index} onClick={() => handleClick(val.id)}>
                            <div className="img">
                                <img
                                    src={val.imageSet.find((e) => e.is_main === true)?.url || val.imageSet[0].url}
                                    alt=""
                                />
                            </div>
                            <h4>{val.name}</h4>
                            <p style={{ textAlign: 'left', color: 'gray', fontSize: 'small' }}>
                                Đã bán:{val.number_buy}
                            </p>
                            {givenTimeStr && <span className="crossedNumber">{val.price_min}vnđ </span>}
                            <span className="">
                                {val.sale ? (val.price_min * (100 - val.sale?.discount)) / 100 : val.price_min}vnđ
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Cart;
