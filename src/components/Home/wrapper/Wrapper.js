import React from 'react';
import './style.css';

const Wrapper = () => {
    const data = [
        {
            cover: <i className="fa-solid fa-truck-fast"></i>,
            title: 'Giao hàng tận nơi',
            decs: 'Chúng tôi cung cấp mức giá cạnh tranh cho sản phẩm ở bất kỳ phạm vi nào.',
        },
        {
            cover: <i className="fa-solid fa-id-card"></i>,
            title: 'Thanh toán an toàn',
            decs: 'Chúng tôi cung cấp mức giá cạnh tranh cho sản phẩm ở bất kỳ phạm vi nào.',
        },
        {
            cover: <i className="fa-solid fa-shield"></i>,
            title: 'Mua sắm với sự tự tin ',
            decs: 'Chúng tôi cung cấp mức giá cạnh tranh cho sản phẩm ở bất kỳ phạm vi nào.',
        },
        {
            cover: <i className="fa-solid fa-headset"></i>,
            title: 'Hỗ trợ 24/7 ',
            decs: 'Chúng tôi cung cấp mức giá cạnh tranh cho sản phẩm ở bất kỳ phạm vi nào.',
        },
    ];
    return (
        <>
            <section className="wrapper background">
                <div className="container grid1">
                    {data.map((val, index) => {
                        return (
                            <div className="product" key={index}>
                                <div className="img icon-circle">
                                    <i>{val.cover}</i>
                                </div>
                                <h3>{val.title}</h3>
                                <p>{val.decs}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default Wrapper;
