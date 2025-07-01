// src/features/room/hooks/useRooms.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRooms } from '../roomsSlice';

export const useRooms = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return {
    rooms,
    loading,
    error
  };
};