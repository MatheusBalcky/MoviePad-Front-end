import axios from 'axios';

export interface signUpData {
  email: string;
  password: string;
  passwordConfirm: string;
}

export type signInData = Omit<signUpData, 'passwordConfirm'>

export async function signUp(signUpData: signUpData) {
  const urlApi = `${import.meta.env.VITE_API_URL}/signup`;

  const promise = axios.post(urlApi, signUpData);
  return promise;
}

export async function signIn(signInData: signInData) {
  const urlApi = `${import.meta.env.VITE_API_URL}/signin`;

  const promise = axios.post(urlApi, signInData);
  return promise;
}

export async function tokenVerify(token: string) {
  const urlApi = `${import.meta.env.VITE_API_URL}/verifyToken`;
  const promise = axios.post(urlApi, '',{ headers: { Authorization: `Bearer ${token}`}});
  return promise;
}
