// hooks/useUserApi.js
import { useState, useEffect } from 'react';
import { getUsers, getRoles, addUser, updateUser, deleteUser } from '../../../api/userService';

export const useUserApi = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const loadRoles = async () => {
    const res = await getRoles();
    setRoles(res.data);
  };

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  return {
    users, setUsers,
    roles, setRoles,
    loadUsers, loadRoles,
    addUser, updateUser, deleteUser,
  };
};
