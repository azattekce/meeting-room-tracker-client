// components/UserTable.jsx
import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Kullanıcı Adı</th>
          <th>Ad Soyad</th>
          <th>E-posta</th>
          <th>GSM</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.user_id}>
            <td>{user.username}</td>
            <td>{user.firstname} {user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.gsm}</td>
            <td>
              <div className="btn-group">
                <button className="btn btn-primary btn-sm me-2" onClick={() => onEdit(user)}>Düzenle</button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(user.user_id)}>Sil</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
