import Cart from '~/components/Cart/Cart';
import Home from '~/components/Home';
import Login from '~/components/Login_Signup/Login';
import Register from '~/components/Login_Signup/Register';
import notFound from '~/components/NotFound/notFound';
import Shop from '~/components/Shop/Shop';
import AllProduct from '~/components/allproduct/AllProduct';
import Business from '~/components/business/Business';
import BusinessProduct from '~/components/business/product/BusinessProduct';
import BusinessRevenue from '~/components/business/revenue/BusinessRevenue';
import BusinessSale from '~/components/business/sale/BusinessSale';
import BusinessTrack from '~/components/business/track/BusinessTrack';
import Checkout from '~/components/checkout/Checkout';
import Contact from '~/components/contact/Contact';
import Order from '~/components/order/Order';
import AdminProduct from '~/components/pageAdmin/Product/AdminProduct';
import AdminRevenue from '~/components/pageAdmin/Revenue/AdminRevenue';
import AdminUser from '~/components/pageAdmin/UserAdmin/AdminUser';
import ProductDetail from '~/components/productdetail/ProductDetail';
import Profile from '~/components/profile/Profile';
import MyRevenue from '~/components/revenue/MyRevenue';
import SearchProduct from '~/components/search/SearchProduct';
import SearchallShop from '~/components/search/searchallShop/SearchallShop';
import defaultLayout from '~/layouts/defaultLayout/defaultLayout';
import layout_admin from '~/layouts/layout_bussiness/layout_admin';
import layout_bussiness from '~/layouts/layout_bussiness/layout_bussiness';
import layout_login from '~/layouts/layout_login/layout_login';
import layout_res from '~/layouts/layout_login/layout_res';
const CRoutes = [
    { path: '/shop/:id', component: Shop, layout: defaultLayout },
    { path: '*', component: notFound, layout: defaultLayout },
    { path: `/product/:id`, component: ProductDetail, layout: defaultLayout },
    { path: '/contact', component: Contact, layout: defaultLayout },
    { path: '/', component: Home, layout: defaultLayout },
    { path: '/login', component: Login, layout: layout_login },
    { path: '/register', component: Register, layout: layout_res },
    { path: '/cart', component: Cart, layout: defaultLayout },
    { path: '/checkout', component: Checkout, layout: defaultLayout },
    { path: '/searchProduct/:name', component: SearchProduct, layout: defaultLayout },
    { path: '/searchShop/:name', component: SearchallShop, layout: defaultLayout },
    { path: '/profile', component: Profile, layout: defaultLayout },
    { path: '/order', component: Order, layout: defaultLayout },
    { path: '/allproduct/:category', component: AllProduct, layout: defaultLayout },
];
const BRoutes = [
    { path: '/', component: Business, layout: layout_bussiness },
    { path: '/login', component: Login, layout: layout_login },
    { path: '/register', component: Register, layout: layout_res },
    { path: '/profile', component: Profile, layout: layout_bussiness },
    { path: '/business/product', component: BusinessProduct, layout: layout_bussiness },
    { path: '/business/revenue', component: BusinessRevenue, layout: layout_bussiness },
    { path: '/business/sale', component: BusinessSale, layout: layout_bussiness },
    { path: '/business/track', component: BusinessTrack, layout: layout_bussiness },
    { path: '/myrevenue', component: MyRevenue, layout: layout_bussiness },
];
const ARoutes = [
    { path: '/', component: AdminUser, layout: layout_admin },
    { path: '/login', component: Login, layout: layout_login },
    { path: '/profile', component: Profile, layout: layout_admin },
    { path: '/register', component: Register, layout: layout_res },
    { path: '/admin/revenue', component: AdminRevenue, layout: layout_admin },
    { path: '/admin/product', component: AdminProduct, layout: layout_admin },
];
export { ARoutes, BRoutes, CRoutes };
