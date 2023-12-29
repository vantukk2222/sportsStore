import './Header.css';
import Head from './Head';
import Search from './Search';
import React, { useState, useEffect } from 'react';

const Header = () => {
    return (
        <>
            <Head />
            <Search  />
        </>
    );
};

export default Header;
