import React from 'react'
import "../Admin.css"
import MenuAdmin from '../MenuAdmin'
import RevenueAdmin from './RevenueAdmin'


const AdminRevenue = () => {
    return (
        <section className='shop '>
            <div className='d_flex'>
                <MenuAdmin />
                <div className='contentWidth'>
                 
                    <RevenueAdmin/>
                </div>
            </div>
        </section>
    )
}

export default AdminRevenue