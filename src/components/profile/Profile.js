import MenuProfile from '../menuprofile/MenuProfile';
import EditProfile from './EditProfile';
import './Profile.css';
const Profile = () => {
    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <MenuProfile />

                    <div className="contentWidth">
                        <div className="heading d_flex">
                            <div className="heading-left row  f_flex">
                                <h2>HỒ SƠ CỦA TÔI</h2>
                            </div>
                        </div>
                        <div className="product-content ">
                            <EditProfile />
                        </div>
                        <div></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
