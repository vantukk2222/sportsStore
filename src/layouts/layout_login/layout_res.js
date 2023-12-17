import Footer from '../defaultLayout/footer/Footer';
import HeaderRes from './headerLogin/HeaderRes';

function layout_res({ children }) {
    return (
        <>
            <HeaderRes />
            <div>{children}</div>
            <Footer />
        </>
    );
}

export default layout_res;
