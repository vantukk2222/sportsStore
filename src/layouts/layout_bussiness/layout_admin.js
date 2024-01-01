import Footer from '../defaultLayout/footer/Footer';
import HeaderAdmin from './headerBussiness/HeaderAdmin';

function layout_admin({ children }) {
    return (
        <>
            <HeaderAdmin />
            <div>{children}</div>
            <Footer />
        </>
    );
}

export default layout_admin;
