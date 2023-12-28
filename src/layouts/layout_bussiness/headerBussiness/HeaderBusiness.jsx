import { Link } from 'react-router-dom';
import './headerbusiness.css';
import logoImage from './logooo.png';

const HeaderBusiness = () => {
    return (
        <>
            <section className="headlogin">
                <div className="header-container">
                    <Link to="/">
                        <img src={logoImage} className="imgheaderlogin" alt="Logo" />
                    </Link>
                    <label className="dn">
                        <h3>KÊNH NGƯỜI BÁN</h3>
                    </label>

                    <label className="label-left lableheaderlogin">
                        <Link to="/contact"> Bạn cần giúp đỡ gì?</Link>
                    </label>
                </div>
            </section>
        </>
    );
};

export default HeaderBusiness;
