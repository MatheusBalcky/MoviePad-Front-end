import HeaderMenu from '../components/HeaderMenu';
import userDataContext from '../contexts/userDataContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { tokenVerify } from '../services/authentications';
import HomeFeed from '../components/HomeFeed';

export default function Home() {
  const { setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const tokenLocal = localStorage.getItem('tokenMoviePad');

  useEffect(() => {
    if (!tokenLocal) return navigate('/signin');

    tokenVerify(tokenLocal)
      .then((res: AxiosResponse) => {
        setUserData(res.data);
      })
      .catch((err: AxiosError) => {
        localStorage.removeItem('tokenMoviePad');
        return navigate('/signin');
      });
  }, []);

  function goToCreateList() {
    navigate('/createlist');
  }

  return (
    <>
      <HeaderMenu
        page="home"
        menuOptions={<li onClick={goToCreateList}>Add new list</li>}
      />
      <HomeFeed />
    </>
  );
}
