import { useEffect, useState } from 'react';

const ListCheckout = ({ selectedItems }) => {
    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState('');
    const [shippingProvider, setShippingProvider] = useState('');

    useEffect(() => {
        setCartItems(selectedItems);
    }, [selectedItems]);

    const groupItemsByBusiness = () => {
        const groupedItems = {};

        cartItems.forEach((item) => {
            const businessName = item.business?.name || 'N/A';

            if (!groupedItems[businessName]) {
                groupedItems[businessName] = [];
            }

            groupedItems[businessName].push(item);
        });

        return groupedItems;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
            .format(amount)
            .replace('₫', 'vnđ');
    };

    const getTotalPrice = (items) => {
        return formatCurrency(
            items.reduce((total, item) => {
                let givenTimeStr = item.product.sale?.ended_at || null;
                if (givenTimeStr) {
                    const givenTime = new Date(givenTimeStr);
                    const currentTime = new Date();
                    if (givenTime > currentTime) givenTimeStr = true;
                    else givenTimeStr = false;
                } else givenTimeStr = false;
                return (
                    total +
                    (givenTimeStr
                        ? ((item.product.price * (100 - item.product.sale?.discount)) / 100) * item.quantity
                        : item.product.price * item.quantity)
                );
            }, 0),
        );
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'message') {
            setMessage(value);
        } else if (name === 'shippingProvider') {
            setShippingProvider(value);
        }
    };

    const groupedItems = groupItemsByBusiness();

    return (
        <div className="listCheckout">
            {Object.entries(groupedItems).map(([businessName, items]) => (
                <div key={businessName} className="listCheckout-table">
                    <h3>{businessName}</h3>
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
                            {items.map((item) => {
                                let givenTimeStr = item.product.sale?.ended_at || null;
                                if (givenTimeStr) {
                                    const givenTime = new Date(givenTimeStr);
                                    const currentTime = new Date();
                                    if (givenTime > currentTime) givenTimeStr = true;
                                    else givenTimeStr = false;
                                } else givenTimeStr = false;
                                return (
                                    <tr key={item.id}>
                                        <td>
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
                                        <td>
                                            <div className="tdtable">
                                                {givenTimeStr && (
                                                    <p className="crossedNumber">
                                                        {formatCurrency(item.product.price) || 'N/A'}
                                                    </p>
                                                )}
                                                <p>
                                                    {formatCurrency(
                                                        givenTimeStr
                                                            ? (item.product.price *
                                                                  (100 - item.product.sale?.discount)) /
                                                                  100
                                                            : item.product.price,
                                                    )}{' '}
                                                </p>
                                            </div>
                                        </td>

                                        <td>{item.quantity || 'N/A'}</td>
                                        <td>
                                            {formatCurrency(
                                                givenTimeStr
                                                    ? ((item.product.price * (100 - item.product.sale?.discount)) /
                                                          100) *
                                                          item.quantity
                                                    : item.product.price * item.quantity,
                                            ) || 'N/A'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="total-listCheckout">
                        <h4>Tổng cộng: {getTotalPrice(items) || 'N/A'}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListCheckout;
