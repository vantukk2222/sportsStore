// Public routes
import Cart from '~/components/Cart/Cart';
import Home from '~/components/Home';
import Login from '~/components/Login_Signup/Login';
import Register from '~/components/Login_Signup/Register';
import Contact from '~/components/contact/Contact';
import defaultLayout from '~/layouts/defaultLayout/defaultLayout';
import layout_login from '~/layouts/layout_login/layout_login';
import notFound from '~/components/NotFound/notFound';
import Shop from '~/components/Shop/Shop';
import ProductDetail from '~/components/productdetail/ProductDetail';
import layout_res from '~/layouts/layout_login/layout_res';
import SearchProduct from '~/components/search/SearchProduct';
import SearchallShop from '~/components/search/searchallShop/SearchallShop';
import Profile from '~/components/profile/Profile';
const VRoutes = [
    { path: '/shop/:id', component: Shop, layout: defaultLayout },
    { path: '*', component: notFound, layout: defaultLayout },
    { path: `/product/:id`, component: ProductDetail, layout: defaultLayout },
    { path: '/contact', component: Contact, layout: defaultLayout },
    { path: '/', component: Home, layout: defaultLayout },
    { path: '/login', component: Login, layout: layout_login },
    { path: '/register', component: Register, layout: layout_res },
    { path: '/cart', component: Cart, layout: defaultLayout },
    { path: '/searchProduct/:name', component: SearchProduct, layout: defaultLayout },
    { path: '/searchShop/:name', component: SearchallShop, layout: defaultLayout },
    { path: '/profile', component: Profile, layout: defaultLayout },
];

export { VRoutes };
