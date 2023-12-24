import './Header.css';
import Head from './Head';
import Search from './Search';
import React, { useState, useEffect } from 'react';
import getUnAuth from '~/API/get';
import Loading from '~/components/loading/Loading';
const Header = () => {
    const s = JSON.parse(localStorage.getItem('User'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userName, setUsername] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response = await getUnAuth(`user/get-by-username/${s}`);
            
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setUsername(response.name);
                const id = response.id;
                localStorage.setItem(
                    'User',
                    JSON.stringify({
                        id: response.id,
                        un: s,
                        name: response.name,
                    }),
                );
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        if (s) {
            if (!s?.name) fetchData();
            else setUsername(s?.name);
        }
    }, [s]);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Head userName={userName} />
                    <Search id={s?.id}/>
                </>
            )}
        </>
    );
};

export default Header;
