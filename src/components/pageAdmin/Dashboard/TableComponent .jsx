// TableComponent.js
import React from 'react';

const data = [
  { id: 1, name: 'User 1', email: 50, image: 'https://example.com/user1.jpg' },
  { id: 2, name: 'User 2', email: 70, image: 'https://example.com/user2.jpg' },
  { id: 3, name: 'User 3', email: 120, image: 'https://example.com/user3.jpg' },
];

const TableComponent = () => {
  return (
    <div className="table-container">
      <h2>USER Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>

            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
            
              <td>{item.id}</td>
              <td><img src={item.image} alt={`User ${item.id}`} className="user-image" /></td>

              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
