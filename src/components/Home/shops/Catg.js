import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '~/redux/reducers/Category/getAllCategories';

const Catg = ({ handleClick }) => {
    const dispath = useDispatch();
    const { dataCate, loadingCate, erroCate } = useSelector((state) => state.categories);
    useEffect(() => {
        dispath(fetchCategories());
    }, []);
    return (
        <>
            <div className="category">
                <div className="chead d_flex">
                    <h1>Category </h1>
                </div>
                {dataCate.map((value, index) => {
                    return (
                        <div className="box f_flex" key={index} onClick={() => handleClick(value.categorySet)}>
                            <span>{value.name}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Catg;
