import './Header.css';
import Head from './Head';
import Search from './Search';
import Navbar from './Navbar';

const Header = () => {
    return (
        <>
            <Head />
            <Navbar />
            <Search />
        </>
    );
};

export default Header;
