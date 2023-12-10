// LoadingSpinner.js
import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-spinner-container">
            <ReactLoading className="loading-spinner" type={'spin'} color={'#3498db'} height={50} width={50} />
        </div>
    );
};

export default Loading;
