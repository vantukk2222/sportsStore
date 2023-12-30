import { useState } from 'react';
import { Link } from 'react-router-dom';

const BProduct = () => {
    const [trackingInfo, setTrackingInfo] = useState([
        {
            name_product: 'giày',
            img: 'track1.png',
            total: '30,000 VND',
            orderNumber: '123456',
            status: 'Đã giao hàng',
            location: 'Đang vận chuyển',
            estimatedDelivery: '10 Tháng 12, 2023',
        },
        {
            name_product: 'áo',
            img: 'track2.png',
            total: '50,000 VND',
            orderNumber: '789012',
            status: 'Chưa giao hàng',
            location: 'Đang xác nhận đơn hàng',
            estimatedDelivery: '15 Tháng 12, 2023',
        },
    ]);

    const handleDeleteProduct = (index) => {
        // Implement delete logic here
        const updatedTrackingInfo = [...trackingInfo];
        updatedTrackingInfo.splice(index, 1);
        setTrackingInfo(updatedTrackingInfo);
    };

    return (
        <div className="track-container">
            <h2>Quản lý sản phẩm</h2>
            <Link to="/new-product">
                <button type="submit">Thêm sản phẩm</button>
            </Link>
            <div className="tracking-header">
                <div className="">Tên sản phẩm</div>
                <div className="">Phân loại</div>
                <div className="">Hình ảnh</div>
                <div className="">Giá tiền</div>
                <div className="">Mô tả sản phẩm</div>
                <div className="">Ngày giao hàng</div>
                <div className="">Thao tác</div>
            </div>

            {trackingInfo.map((product, index) => (
                <div className="tracking-info" key={index}>
                    <div>{product.name_product}</div>
                    <div>{product.orderNumber}</div>
                    <div>
                        <img src={product.img} alt={`Product ${index + 1}`} />
                    </div>
                    <div>{product.total}</div>
                    <div>{product.status}</div>
                    <div>{product.estimatedDelivery}</div>
                    <div>
                        <Link to={`/edit-product/${product.orderNumber}`}>
                            <button className="edit">Sửa</button>
                        </Link>
                        <button className="delete" onClick={() => handleDeleteProduct(index)}>
                            Xóa
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BProduct;
