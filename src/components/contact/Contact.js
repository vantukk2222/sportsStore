import React from 'react';
import './contact.css'; // Import your CSS file

const Contactt = () => {
    return (
        <section className="wrapper">
            <h2 className="common-heading">LIÊN HỆ DT5 SPORT</h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8373423325825!2d108.14731717468425!3d16.07392833931304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218d68dff9545%3A0x714561e9f3a7292c!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBLaG9hIC0gxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1698381506197!5m2!1svi!2s"
                width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="mymap" referrerPolicy="no-referrer-when-downgrade"></iframe>

            <div className="container">
                <div className="contact-form">
                    <form action="https://formspree.io/f/xaygvadg" method="POST" className="contact-inputs">
                        <input type="text" placeholder="username" name="username" required autoComplete="off" />
                        <input type="email" name="Email" placeholder="Email" autoComplete="off" required />
                        <textarea name="Message" cols="30" rows="10" required autoComplete="off" placeholder="Nhập tin nhắn của bạn"></textarea>
                        <input type="submit" value="GỬI" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contactt;
