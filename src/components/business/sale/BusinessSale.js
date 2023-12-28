import MenuBusiness from '../MenuBusiness';
import Sale from './Sale';

const BusinessSale = () => {
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
                        <Sale />
                    </div>
                </div>
            </section>
        </>
    );
};

export default BusinessSale;
