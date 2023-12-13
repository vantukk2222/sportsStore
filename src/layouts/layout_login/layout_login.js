import Footer from './footer/Footer';
import Header from './header/Header';
function layout_login({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
}

export default layout_login;
