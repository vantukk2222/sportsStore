// ProductDescription.js

const Detail = ({ productItem }) => {
    return (
        <div className="product-description-container">
            <div>
                <div className="header-comment">
                    <h1 className="product-title">CHI TIẾT SẢN PHẨM</h1>
                </div>

                <h1 className="product-title">{productItem.name}</h1>
                <p className="product-price ">{productItem.price} vnđ</p>
                <p className="product-detail">{productItem.detail}</p>
                <p className="product-attribute">
                    <strong>Attribute:</strong> {productItem.attribute}
                </p>
                <p className="product-brand">
                    <strong>Brand:</strong> {productItem.brand}
                </p>
                <p className="product-quantity">
                    <strong>Quantity:</strong> {productItem.quantity}
                </p>
                <p className="product-size">
                    <strong>Size:</strong> {productItem.sizes && productItem.sizes.map((size) => size.name).join(', ')}
                </p>
            </div>
            <div>
                <div className="header-comment">
                    <h1 className="product-title">MÔ TẢ SẢN PHẨM</h1>
                </div>

                <h1 className="product-title">{productItem.name}</h1>
                <p className="product-price">{productItem.price} vnđ</p>
                <p className="product-detail">{productItem.detail}</p>
                <p className="product-attribute">
                    <strong>Attribute:</strong> {productItem.attribute}
                </p>
                <p className="product-brand">
                    <strong>Brand:</strong> {productItem.brand}
                </p>
                <p className="product-quantity">
                    <strong>Quantity:</strong> {productItem.quantity}
                </p>
                <p className="product-size">
                    <strong>Size:</strong> {productItem.sizes && productItem.sizes.map((size) => size.name).join(', ')}
                </p>
            </div>
        </div>
    );
};

export default Detail;
