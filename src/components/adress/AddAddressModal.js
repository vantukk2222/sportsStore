import React, { useState } from 'react';
import Modal from 'react-modal';

const AddAddressModal = ({ isOpen, onRequestClose, onAddAddress }) => {
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    onAddAddress(newAddress);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Address Modal"
    >
      <h2>THÊM ĐỊA CHỈ MỚI</h2>
      <label>
        Họ và tên người nhận:&nbsp;
        <input
  className='modalinput'
  type="text"
  name="name"
  value={newAddress.name}
  onChange={handleChange}
/>

      </label>&nbsp;&nbsp;
      <label>
        Số điện thoại:&nbsp;
        <input
  className='modalinput'
  type="text"
  name="phone"
  value={newAddress.phone}
  onChange={handleChange}
/>
      </label>&nbsp;&nbsp;
      <label>
        Địa chỉ:&nbsp;
        <input
  className='modalinput'
  type="text"
  name="address"
  value={newAddress.address}
  onChange={handleChange}
/>
      </label>&nbsp;&nbsp;
      <button className='add-address-button' onClick={handleAdd}>Lưu</button>
    </Modal>
  );
};

export default AddAddressModal;
