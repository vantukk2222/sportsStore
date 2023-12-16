import './App.css';
import { publicRoutes, privateRoutes, vistorRoutes } from '~/routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState, useRef } from 'react';
function App() {
    const [routers, setRouters] = useState([...vistorRoutes, ...publicRoutes]);
    const [CartItem, setCartItem] = useState([]);
    const storage = localStorage.getItem('authToken');
    console.log(storage);
    useEffect(() => {
        if (storage) {
            setRouters([...vistorRoutes, ...privateRoutes]);
        }
    }, [storage]);
    const addToCart = (product) => {
        const productExit = CartItem.find((item) => item.id === product.id);

        if (productExit) {
            setCartItem(
                CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)),
            );
        } else {
            setCartItem([...CartItem, { ...product, qty: 1 }]);
        }
    };
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routers.map((route, index) => {
                        const Page = route.component;
                        let Layout = !route.layout ? Fragment : route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page addToCart={addToCart} />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
