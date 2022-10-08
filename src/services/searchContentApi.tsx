import axios from 'axios';
const URLAPI_TMDB = import.meta.env.VITE_TMDB_URLAPI_SEARCH;


export async function searchContents(searchText: string, page: number) {
  const promise = axios.get(
    `${URLAPI_TMDB}&query=${searchText}&page=${page}&include_adult=false`
  );

  return promise
}