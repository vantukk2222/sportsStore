import '../Business.css';
import MenuBusiness from '../MenuBusiness';
import BProduct from './BProduct';
const BusinessProduct = () => {
    return (
        <>
            <section className="shop background">
                <div className="d_flex">
                    <MenuBusiness />
                    <div className="contentWidth">
                        <div className="heading d_flex"></div>
                        <div className="heading d_flex">
                            <div className="heading-left row  f_flex"></div>
                        </div>
                        <BProduct />
                    </div>
                </div>
            </section>
        </>
    );
};

export default BusinessProduct;
