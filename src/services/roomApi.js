import api from './api';

export async function getAllRooms(token, choosedHotelId) {
  console.log(choosedHotelId, 'api');
  const response = await api.get(`/hotels/${+choosedHotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
