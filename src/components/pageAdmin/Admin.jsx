import './Admin.css';
import Dashboard from './Dashboard/Dashboard';
import MenuAdmin from './MenuAdmin';

const Admin = () => {
    return (
        <section className="shop">
            <div className="d_flex">
                <MenuAdmin />
                <div className="contentWidth">
                    <div className="heading d_flex"></div>
                    <Dashboard />
                </div>
            </div>
        </section>
    );
};

export default Admin;
