import axios from 'axios';
const urlApi = import.meta.env.VITE_API_URL;

export async function getLists(token: string) {
  const promise = axios.get(`${urlApi}/lists`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return promise;
}

export async function createList(token: string, listData: any) {
  const bodyToken = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(`${urlApi}/lists/create`, listData, bodyToken);
}

export async function getOneListAndContents(token: string, listId: number) {
  const promise = axios.get(`${urlApi}/lists/${listId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return promise;
}

export async function deleteList(token: string, listId: number) {
  const promise = axios.delete(`${urlApi}/lists/${listId}/remove`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return promise;
}
