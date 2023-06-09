import api from './api';

export async function getAllActivities(token) {
  const response = await api.get('/activity', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postMatriculation(body, token) {
  await api.post('/activity', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
