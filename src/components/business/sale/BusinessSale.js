import React from 'react'
import MenuBusiness from '../MenuBusiness'
import Sale from './Sale'


const BusinessSale = () => {
    return (
        <>
            <section className='shop background'>
                <div className='container d_flex'>
                    <MenuBusiness />
                    <div className='contentWidth'>
                        <div className='heading d_flex'>
                        </div>
                        <div className='heading d_flex'>
                            <div className='heading-left row  f_flex'>
                                <h2>QUẢN LÝ SỰ KIỆN</h2>
                            </div>
                        </div>
                        <Sale />
                    </div>
                </div>
            </section>
        </>
    )
}

export default BusinessSale