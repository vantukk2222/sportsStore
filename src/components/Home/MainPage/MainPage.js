import React from 'react';
import './Home.css';
import SliderHome from './Slider';

const MainPage = () => {
    return (
        <>
            <section className="home slide">
                <div className="container d_flex slide">
                    <SliderHome />
                    
                </div>
            </section>
        </>
    );
};

export default MainPage;
