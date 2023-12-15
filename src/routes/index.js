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
const vistorRoutes = [
    { path: '/', component: Home, layout: defaultLayout },
    { path: '/shop/:id', component: Shop, layout: defaultLayout },
    { path: '*', component: notFound },
    { path: `/product/:id`, component: ProductDetail, layout: defaultLayout },
];
const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/contact', component: Contact, layout: defaultLayout },
];

const privateRoutes = [
    { path: '/cart', component: Cart, layout: defaultLayout },
    { path: '/contact', component: Contact, layout: defaultLayout },
];

export { publicRoutes, privateRoutes, vistorRoutes };
