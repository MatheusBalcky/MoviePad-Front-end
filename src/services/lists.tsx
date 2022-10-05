import axios from 'axios';
const urlApi = import.meta.env.VITE_API_URL;


export async function getLists(token: string) {
  const promise = axios.get(`${urlApi}/lists`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return promise
}

export async function createList(token: string, listData: any) {
  const bodyToken = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(`${urlApi}/lists/create`, listData, bodyToken);
}