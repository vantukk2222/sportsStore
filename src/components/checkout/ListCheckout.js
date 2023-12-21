import React, { useState, useEffect } from 'react';

const ListCheckout = ({ selectedItems }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(selectedItems);
    }, [selectedItems]);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const [message, setMessage] = useState('');
    const [shippingProvider, setShippingProvider] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'message') {
            setMessage(value);
        } else if (name === 'shippingProvider') {
            setShippingProvider(value);
        }
    };

    return (
        <div className="listCheckout">
            {cartItems.map((item) => (
                <div key={item.id} className="listCheckout-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <h4>{item.business?.name || 'N/A'}</h4>
                                    <div className="info-listcheck">
                                        <img
                                            src={item.product.image_product_information}
                                            alt=""
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                        <p>{item.product.name_product_information}</p>
                                        <p>Loại: {item.product.size}</p>
                                    </div>
                                </td>
                                <td>${item.product.price?.toFixed(2) || 'N/A'}</td>
                                <td>{item.quantity || 'N/A'}</td>
                                <td>${(item.product.price * item.quantity)?.toFixed(2) || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="ship-listcheckout">
                        <p>Lời nhắn</p>
                        <input type="text" name="message" value={message} onChange={handleInputChange} />
                        <p>Đơn vị vận chuyển</p>
                        <select name="shippingProvider" value={shippingProvider} onChange={handleInputChange}>
                            <option value="">Chọn đơn vị vận chuyển</option>
                            <option value="shipping1">Đơn vị vận chuyển 1</option>
                            <option value="shipping2">Đơn vị vận chuyển 2</option>
                        </select>
                    </div>
                    <div className="total-listCheckout">
                        <h4>Tổng cộng: ${getTotalPrice()?.toFixed(2) || 'N/A'}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListCheckout;
