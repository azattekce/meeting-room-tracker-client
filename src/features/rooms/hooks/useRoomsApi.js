import { useState, useEffect } from 'react';
import { getRooms, getRoom, addRoom as addRoomService, updateRoom as updateRoomService, deleteRoom as deleteRoomService } from '../../../api/roomService';

export const useRoomsApi = () => {
  const [rooms, setRooms] = useState([]);

  const loadRooms = async () => {
    try {
      const res = await getRooms();
      setRooms(res.data);
    } catch (error) {
      console.error('Error loading rooms:', error);
      setRooms([]);
    }
  };

  // API fonksiyonlarını wrapper'larla sarın
  const addRoom = async (roomData) => {
    try {
      console.log("Sending data:", roomData); // Gönderilen veriyi kontrol edin

      const response = await addRoomService(roomData);
      return response.data;
    } catch (error) {
      console.error('Error adding room:', error);
      throw error;
    }
  };

  const updateRoom = async (id, roomData) => {
    try {
      const response = await updateRoomService(id, roomData);
      return response.data;
    } catch (error) {
      console.error('Error updating room:', error);
      throw error;
    }
  };

  const deleteRoom = async (id) => {
    try {
      const response = await deleteRoomService(id);
      return response.data;
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return {
    rooms, 
    setRooms,
    loadRooms,
    addRoom, 
    updateRoom, 
    deleteRoom,
    getRoom
  };
};

export default useRoomsApi;