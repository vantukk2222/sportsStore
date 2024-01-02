import React from 'react'
import "../Admin.css"
import MenuAdmin from '../MenuAdmin'
import UserAdmin from './UserAdmin'


const AdminUser = () => {
    return (
        <section className='shop'>
            <div className='d_flex'>
                <MenuAdmin />
                <div className='contentWidth'>
                    <UserAdmin/>
                </div>
            </div>
        </section>
    )
}

export default AdminUser