import FlashDeals from '~/components/Home/flashDeals/FlashDeals';
import MainPage from './MainPage/MainPage';
import Shop from './shops/Shop';
import Annocument from './annocument/Annocument';
import Wrapper from './wrapper/Wrapper';

function Home() {
    return (
        <>
            <MainPage />
            <FlashDeals />
            <Shop />
            <Annocument />
            <Wrapper />
        </>
    );
}

export default Home;
