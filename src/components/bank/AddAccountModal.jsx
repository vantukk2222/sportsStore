// AddAccountModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

const AddAccountModal = ({ isOpen, onRequestClose, onAddAccount }) => {
  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    balance: "",
    ownerName: '',
  });

  const handleChange = (e) => {
    try {
      setNewAccount({
        ...newAccount,
        [e.target.name]: e.target.value,
      });
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  const handleAdd = () => {
    onAddAccount(newAccount);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Account Modal"
    >
      <h2>Thêm tài khoản ngân hàng</h2>
      <label>
        Số tài khoản:&nbsp;
        <input
          type="text"
          className='modalinput'   
          name="accountNumber"       
          value={newAccount.accountNumber}
          onChange={handleChange}
        />
      </label>&nbsp;
      <label>
        Số dư:&nbsp;
        <input
          type="number"
          className='modalinput' 
          name='balance'         
          value={newAccount.balance}
          onChange={handleChange}
        />
      </label>&nbsp;
      <label>
        Tên chủ tài khoản:&nbsp;
        <input
          type="text"
          className='modalinput'       
          name='ownerName'   
          value={newAccount.ownerName}
          onChange={handleChange}
        />
      </label>&nbsp;&nbsp;
      <button className="add-address-button" onClick={handleAdd}>Thêm tài khoản</button>
    </Modal>
  );
};

export default AddAccountModal;
