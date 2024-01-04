import React from 'react'
import "../Admin.css"
import MenuAdmin from '../MenuAdmin'
import ProductAdmin from './ProductAdmin'


const AdminProduct = () => {
    return (
        <section className='shop'>
            <div className='d_flex'>
                <MenuAdmin />
                <div className='contentWidth'>
                   
                    <ProductAdmin/>
                </div>
            </div>
        </section>
    )
}

export default AdminProduct