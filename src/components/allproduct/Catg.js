import { useEffect, useState } from 'react';
import Loading from '../loading/Loading';
import getUnAuth from '~/API/get';
import { useNavigate } from 'react-router';

const Catg = () => {
    const [gcategoryItems, setGCategoryItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const group_cate = sessionStorage.getItem('group_cate');
    const group_category = group_cate ? JSON.parse(group_cate) : null;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(`category/get-category-group`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setGCategoryItems(response);
                sessionStorage.setItem('group_cate', JSON.stringify(response));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        if (!group_category) fetchData();
        else {
            setGCategoryItems(group_category);
        }
    }, []);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryClick = (index) => {
        const isSelected = selectedCategories.includes(index);

        if (isSelected) {
            setSelectedCategories(selectedCategories.filter((catIndex) => catIndex !== index));
        } else {
            setSelectedCategories([...selectedCategories, index]);
        }
    };
    return (
        <div className="category">
            <div className="chead d_flex">
                <h1>Category</h1>
            </div>
            {gcategoryItems ? (
                <div>
                    {gcategoryItems.map((value, index) => (
                        <div key={index} className="category-item">
                            <span
                                onClick={() => handleCategoryClick(index)}
                                className={`category-name ${selectedCategories.includes(index) ? 'selected' : ''}`}
                            >
                                {value.name}
                            </span>
                            {selectedCategories.includes(index) && (
                                <div className="category-options">
                                    {value.categorySet.map((option, optionIndex) => (
                                        <div
                                            className="option"
                                            key={optionIndex}
                                            onClick={() => {
                                                navigate(`/allproduct/${option.id}`);
                                            }}
                                        >
                                            {option.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Catg;
