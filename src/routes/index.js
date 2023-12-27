// Public routes
import Cart from '~/components/Cart/Cart';
import Home from '~/components/Home';
import Login from '~/components/Login_Signup/Login';
import Register from '~/components/Login_Signup/Register';
import notFound from '~/components/NotFound/notFound';
import Shop from '~/components/Shop/Shop';
import Checkout from '~/components/checkout/Checkout';
import Contact from '~/components/contact/Contact';
import Order from '~/components/order/Order';
import ProductDetail from '~/components/productdetail/ProductDetail';
import Profile from '~/components/profile/Profile';
import SearchProduct from '~/components/search/SearchProduct';
import SearchallShop from '~/components/search/searchallShop/SearchallShop';
import defaultLayout from '~/layouts/defaultLayout/defaultLayout';
import layout_login from '~/layouts/layout_login/layout_login';
import layout_res from '~/layouts/layout_login/layout_res';
const VRoutes = [
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
];

export { VRoutes };
