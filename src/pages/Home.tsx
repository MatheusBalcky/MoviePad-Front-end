import Header from '../components/Header';
import userDataContext from '../contexts/userDataContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { tokenVerify } from '../services/authentications';

export default function Home() {
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const tokenLocal = localStorage.getItem('tokenMoviePad');

  useEffect(() => {
    if (!tokenLocal) {
      return navigate('/signin');
    }
    tokenVerify(tokenLocal)
      .then( res => {
        setUserData({ ...res.data });
      })
      .catch((err: AxiosError) => {
        console.log(err)
        localStorage.removeItem('tokenMoviePad');
        return navigate('/signin');
      });
  }, []);

  return (
    <>
      <Header />
      <h1>PÁGINA HOME</h1>
    </>
  );
}
