import axios from 'axios';
export interface signUpData {
  email: string;
  password: string;
  passwordConfirm: string;
}

export type signInData = Omit<signUpData, 'passwordConfirm'>;

const urlApi = import.meta.env.VITE_API_URL;

export function headersToken(token: string) {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}

export async function signUp(signUpData: signUpData) {
  return axios.post(`${urlApi}/signup`, signUpData);
}

export async function signIn(signInData: signInData) {
  return axios.post(`${urlApi}/signin`, signInData);
}

export async function tokenVerify(token: string) {
  return axios.post(`${urlApi}/verifyToken`, '', headersToken(token));
}
