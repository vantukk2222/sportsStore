import MenuProfile from '../menuprofile/MenuProfile';
import EditRevenue from './EditRevenue';
import './MyRevenue.css';
const MyRevenue = () => {
    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <MenuProfile />

                    <div className="contentWidth">
                        <EditRevenue />
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyRevenue;
