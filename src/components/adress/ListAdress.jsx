import React from 'react';

const ListAddress = ({ addresses }) => {
  const handleUpdate = (name) => {
    console.log(`Đã cập nhật địa chỉ: ${name}`);
  };

  const handleDelete = (name) => {
    console.log(`Đã xóa địa chỉ: ${name}`);
  };

 
  return (
    <>
      {addresses.map((address, index) => (
        <div key={index} className='adressprofile'>
          <div className='adress'>
            <div className='adressname'>
              <h3>{address.name}</h3> &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className='adressadress'>
            <p>{address.phone}</p>
              <p>{address.address}</p>
            </div>
          </div>
          <div className='address-actions'>
            <button onClick={() => handleUpdate(address.name)}>Cập nhật</button>
            <button onClick={() => handleDelete(address.name)}>Xóa</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListAddress;
