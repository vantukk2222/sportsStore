import FlashDeals from '~/components/Home/flashDeals/FlashDeals';
import MainPage from './MainPage/MainPage';
import TopCate from './top_product/TopCate';
import NewArrivals from './newarrivals/NewArrivals';
import Discount from './discount/Discount';
import Shop from './shops/Shop';
import Annocument from './annocument/Annocument';
import Wrapper from './wrapper/Wrapper';

function Home() {
    return (
        <>
            <MainPage />
            <FlashDeals />
            {/* <TopCate />
            <NewArrivals />
            <Discount /> */}
            <Shop />
            <Annocument />
            <Wrapper />
        </>
    );
}

export default Home;
