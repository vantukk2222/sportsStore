// Public routes
import Cart from '~/components/Cart/Cart';
import Home from '~/components/Home';
import Login from '~/components/Login_Signup/Login';
import Register from '~/components/Login_Signup/Register';
import Contact from '~/components/contact/Contact';
import defaultLayout from '~/layouts/defaultLayout/defaultLayout';
import layout_login from '~/layouts/layout_login/layout_login';
import notFound from '~/components/NotFound/notFound';
const publicRoutes = [
    { path: '/', component: Home, layout: defaultLayout },
    { path: '/login', component: Login, layout: layout_login },
    { path: '/register', component: Register },
    { path: '/contact', component: Contact, layout: defaultLayout },
    { path: '*', component: notFound, layout: defaultLayout },
];

const privateRoutes = [
    { path: '/', component: Home, layout: defaultLayout },
    { path: '/cart', component: Cart, layout: defaultLayout },
    { path: '/contact', component: Contact, layout: defaultLayout },
    { path: '*', component: notFound },
];

export { publicRoutes, privateRoutes };
