// Public routes
import Cart from '~/components/Cart/Cart';
import Home from '~/components/Home';
import Login from '~/components/Login_Signup/Login';
import Register from '~/components/Login_Signup/Register';
import Contact from '~/components/contact/Contact';
import defaultLayout from '~/layouts/defaultLayout/defaultLayout';
import layout_login from '~/layouts/layout_login/layout_login';
const publicRoutes = [
    { path: '/', component: Home, layout: defaultLayout },
    { path: '/login', component: Login, layout: layout_login },
    { path: '/register', component: Register, layout: null },
    { path: '/cart', component: Cart, layout: defaultLayout },
    { path: '/contact', component: Contact, layout: defaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
