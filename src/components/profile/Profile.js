import React from "react"
import MenuProfile from "./MenuProfile";
import "./Profile.css"
import EditProfile from "./EditProfile";
const Profile = () => {
    return (
        <>
            <section className='shop background'>
                <div className='container d_flex'>
                    <MenuProfile />

                    <div className='contentWidth'>

                        <div className='heading d_flex'>
                            <div className='heading-left row  f_flex'>
                                <h2>HỒ SƠ CỦA TÔI</h2>
                            </div>

                        </div>
                        <div className='product-content  grid1'>
                            <EditProfile />

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile;
