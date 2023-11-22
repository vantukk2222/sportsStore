import Footer from './footer/Footer';
import Header from './header/Header';
function defaultLayout({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
}

export default defaultLayout;
