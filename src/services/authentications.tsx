import axios from 'axios';
export interface signUpData {
  email: string;
  password: string;
  passwordConfirm: string;
}

export type signInData = Omit<signUpData, 'passwordConfirm'>;

const urlApi = import.meta.env.VITE_API_URL;

export async function signUp(signUpData: signUpData) {
  const promise = axios.post(`${urlApi}/signup`, signUpData);
  return promise;
}

export async function signIn(signInData: signInData) {
  const promise = axios.post(`${urlApi}/signin`, signInData);
  return promise;
}

export async function tokenVerify(token: string) {
  const promise = axios.post(`${urlApi}/verifyToken`, '', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return promise;
}
