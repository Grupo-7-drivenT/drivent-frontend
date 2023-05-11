import api from './api';

export async function getAllTicketTypes() {
  const response = await api.get('/tickets/types');
  return response.data;
}
//
