import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers, fetchRoles, createUser, editUser, removeUser } from '../userSlice';

 export const useUserCrud = () => {
  const dispatch = useDispatch();

  const { users, roles, loading, error } = useSelector(state => state.user);

  // İlk yükleme
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, [dispatch]);

  const addUser = (data) => dispatch(createUser(data)).unwrap();
  const updateUser = (id, data) => dispatch(editUser({ id, data })).unwrap();
  const deleteUser = (id) => dispatch(removeUser(id)).unwrap();

  return { users, roles, loading, error, addUser, updateUser, deleteUser };
};

