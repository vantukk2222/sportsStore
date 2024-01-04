import { useState } from 'react';
import Loading from '../loading/Loading';

const Catg = () => {
    const data = [
        {
            cateImg: './images/category/cat-1.png',
            cateName: 'ÁO THỂ THAO',
            options: ['Option 1', 'Option 2', 'Option 3'],
        },
        {
            cateImg: './images/category/cat-1.png',
            cateName: 'ÁO THỂ THAO',
            options: ['Option 1', 'Option 2', 'Option 3'],
        },
        {
            cateImg: './images/category/cat-1.png',
            cateName: 'ÁO THỂ THAO',
            options: ['Option 1', 'Option 2', 'Option 3'],
        },
        // ... (similar structure for other categories)
    ];

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
            {data ? (
                <div>
                    {data.map((value, index) => (
                        <div key={index} className="category-item">
                            <span
                                onClick={() => handleCategoryClick(index)}
                                className={`category-name ${selectedCategories.includes(index) ? 'selected' : ''}`}
                            >
                                {value.cateName}
                            </span>
                            {selectedCategories.includes(index) && (
                                <div className="category-options">
                                    {value.options.map((option, optionIndex) => (
                                        <div className="option" key={optionIndex}>
                                            {option}
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
