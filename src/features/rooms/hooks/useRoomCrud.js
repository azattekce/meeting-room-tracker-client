import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchRooms, createRoom, editRoom, removeRoom } from '../roomsSlice';

export const useRoomCrud = () => {
  const dispatch = useDispatch();

  const { rooms, loading, error } = useSelector(state => state.rooms);

  const loadRooms = useCallback(() => {
    return dispatch(fetchRooms()).unwrap();
  }, [dispatch]);

  const addRoom = useCallback((data) => {
    return dispatch(createRoom(data)).unwrap();
  }, [dispatch]);

  const updateRoom = useCallback((id, data) => {
    return dispatch(editRoom({ id, data })).unwrap();
  }, [dispatch]);

  const deleteRoom = useCallback((id) => {
    return dispatch(removeRoom(id)).unwrap();
  }, [dispatch]);

  return { 
    rooms, 
    loading, 
    error, 
    loadRooms,
    addRoom, 
    updateRoom, 
    deleteRoom 
  };
};
