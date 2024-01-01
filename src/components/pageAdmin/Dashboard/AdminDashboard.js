import React from 'react'
import "../Admin.css"
import MenuAdmin from '../MenuAdmin'
import Dashboard from './Dashboard'


const AdminDashboard = () => {
    return (
        <section className='shop'>
            <div className=' d_flex'>
                <MenuAdmin />
                <div className='contentWidth'>
                    <div className='heading d_flex'>
                        <div className='heading-left row  f_flex'>
                        </div>
                    </div>
                    <Dashboard/>
                </div>
            </div>
        </section>
    )
}

export default AdminDashboard