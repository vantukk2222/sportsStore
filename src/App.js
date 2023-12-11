import './App.css';
import { publicRoutes, privateRoutes, vistorRoutes } from '~/routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState, useRef } from 'react';
function App() {
    const [login, setLogin] = useState(false);
    const [routers, setRouters] = useState([...vistorRoutes, ...publicRoutes]);
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
                                        <Page />
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
