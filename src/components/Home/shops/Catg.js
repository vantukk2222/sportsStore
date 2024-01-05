import Loading from '~/components/loading/Loading';

const Catg = ({ handleClick, categoryItems }) => {
    return (
        <>
            <div className="category">
                <div className="chead d_flex">
                    <h1>DANH MỤC </h1>
                </div>
                {categoryItems ? (
                    categoryItems.map((value, index) => {
                        return (
                            <div className="box f_flex" key={index} onClick={() => handleClick(value.categorySet)}>
                                <span>{value.name}</span>
                            </div>
                        );
                    })
                ) : (
                    <Loading />
                )}
            </div>
        </>
    );
};

export default Catg;
