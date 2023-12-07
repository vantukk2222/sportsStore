import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '~/redux/reducers/Category/getAllCategories';

const Categories = () => {
    const dispatch = useDispatch();
    const { dataCate, loadingCate, errorCate } = useSelector((state) => state.categories);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);
    useEffect(() => {
        setCategories(dataCate);
    }, [dataCate]);

    return (
        <>
            <div className="category">
                {categories.map((value, index) => {
                    return (
                        <div className="box f_flex" key={index}>
                            <span>{value.name}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Categories;
