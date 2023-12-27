// AccountInfo.js
import React from 'react';

const AccountInfo = ({ accountNumber, balance, ownerName, accounts, onEdit, onDelete }) => {
  return (
    <>
      <div className='AccountInfo'>
        <h2>Thông tin tài khoản</h2>
        <p>Số tài khoản: {accountNumber}</p>
        <p>Số dư: {balance}</p>
        <p>Chủ tài khoản: {ownerName}</p>
      </div>

      <h2>Danh sách tài khoản</h2>
      {accounts.map((acc) => (
        <div key={acc.accountNumber} className='AccountInfo'>
          <ul>
            <li>
              <p>Số tài khoản: {acc.accountNumber}</p>
              <p>Số dư: {acc.balance}</p>
              <p>Chủ tài khoản: {acc.ownerName}</p>
              <div className="action-buttons">
                <button onClick={() => onEdit(acc)}>Sửa</button>
                <button onClick={() => onDelete(acc.accountNumber)}>Xóa</button>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default AccountInfo;
