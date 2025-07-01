// hooks/useUsers.js
import { useEffect, useState } from 'react';
import { userService } from '../userService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const loadUsers = async () => {
    const res = await userService.getUsers();
    setUsers(res.data);
  };

  const loadRoles = async () => {
    const res = await userService.getRoles();
    setRoles(res.data);
  };

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  return {
    users,
    setUsers,
    roles,
    loadUsers,
    loadRoles
  };
};
