import './Admin.css';
import AdminProduct from './Product/AdminProduct';

const Admin = () => {
    return (
        <section className="shop">
            <div className="d_flex">
                <div className="contentWidth">
                    <div className="heading d_flex"></div>
                    <AdminProduct />
                </div>
            </div>
        </section>
    );
};

export default Admin;
