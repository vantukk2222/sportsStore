import '../Business.css';
import MenuBusiness from '../MenuBusiness';
import Revenue from './Revenue';

const BusinessRevenue = () => {
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
                        <Revenue />
                    </div>
                </div>
            </section>
        </>
    );
};

export default BusinessRevenue;
