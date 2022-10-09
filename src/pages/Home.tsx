import HeaderMenu from '../components/HeaderMenu';
import { useNavigate } from 'react-router-dom';
import HomeFeed from '../components/HomeFeed';
import VerifyTokenComponent from '../components/VerifyToken';

export default function Home() {
  const navigate = useNavigate();

  function goToCreateList() {
    navigate('/createlist');
  }

  return (
    <>
      <VerifyTokenComponent/>
      <HeaderMenu
        page="home"
        menuOptions={<li onClick={goToCreateList}>Add new list</li>}
      />
      <HomeFeed />
    </>
  );
}
