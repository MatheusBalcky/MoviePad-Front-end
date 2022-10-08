import axios from 'axios';
const urlApi = import.meta.env.VITE_API_URL;
import { headersToken } from './authentications';

export async function getLists(token: string) {
  return axios.get(`${urlApi}/lists`, headersToken(token));
}

export async function createList(token: string, listData: any) {
  return axios.post(`${urlApi}/lists/create`, listData, headersToken(token));
}

export async function getOneListAndContents(token: string, listId: number) {
  return axios.get(`${urlApi}/lists/${listId}`, headersToken(token));
}

export async function deleteList(token: string, listId: number) {
  return axios.delete(`${urlApi}/lists/${listId}/remove`, headersToken(token));
}

export async function addNewContent(
  token: string,
  listId: number,
  content: object
) {
  return axios.post(
    `${urlApi}/lists/${listId}/addcontent`,
    content,
    headersToken(token)
  );
}
