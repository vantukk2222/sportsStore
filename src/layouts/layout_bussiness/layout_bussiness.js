import Footer from '../defaultLayout/footer/Footer';
import HeaderBusiness from './headerBussiness/HeaderBusiness';

function layout_bussiness({ children }) {
    return (
        <>
            <HeaderBusiness />
            <div>{children}</div>
            <Footer />
        </>
    );
}

export default layout_bussiness;
