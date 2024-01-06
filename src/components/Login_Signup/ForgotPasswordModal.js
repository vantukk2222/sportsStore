import { useState } from 'react';
const ForgotPasswordModal = ({ onClose }) => {
    const [email, setEmail] = useState('');

    const modalStyle = {
        width: '400px',
        fontSize: '16px',
    };

    const inputContainerStyle = {
        position: 'relative',
        marginBottom: '15px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '2px solid #ccc',
        borderRadius: '5px',
        outline: 'none',
    };

    const inputFocusStyle = {
        borderColor: '#007bff',
    };

    const buttonStyle = {
        backgroundColor: 'green',
        color: '#fff',
        padding: '10px 15px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const buttonStylee = {
        backgroundColor: 'red',
        color: '#fff',
        padding: '10px 15px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const handleForgotPassword = () => {};

    return (
        <div className="modal-overlay">
            <div className="modalnewproduct" style={modalStyle}>
                <h2>Quên mật khẩu</h2>
                <p>Nhập email của bạn để lấy lại mật khẩu:</p>
                <div style={inputContainerStyle}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={Object.assign({}, inputStyle, email && inputFocusStyle)}
                    />
                </div>
                <button style={buttonStyle} onClick={handleForgotPassword}>
                    Submit
                </button>
                &nbsp;&nbsp;&nbsp;
                <button style={buttonStylee} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};
export default ForgotPasswordModal;
