import './App.css';
import { publicRoutes, privateRoutes,vistorRoutes } from '~/routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
function App() {
    const [login, setLogin] = useState(false);
    const [routers, setRouters] = useState([...vistorRoutes,...publicRoutes]);
    const storage = useRef(localStorage.getItem('authToken'));
    useEffect(() => {
        if (storage.current) {
            setLogin(true);
        }
    }, [storage.current]);
    useEffect(() => {
        login ? setRouters([...vistorRoutes,...privateRoutes]) : setRouters([...vistorRoutes,...publicRoutes]);
    }, [login]);
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
