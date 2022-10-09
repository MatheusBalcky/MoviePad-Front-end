import HeaderMenu from '../components/HeaderMenu';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomeFeed from '../components/HomeFeed';
import VerifyTokenComponent from '../components/VerifyToken';
import * as listsService from '../services/lists';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';

export default function Home() {
  const tokenLocal = localStorage.getItem('tokenMoviePad');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [loadFeed, setLoadFeed] = useState(false);

  useEffect(getLists, []);

  function goToCreateList() {
    navigate('/createlist');
  }

  function getLists() {
    const promise = listsService.getLists(tokenLocal!);
    promise
      .then((res) => {
        setLists(res.data);
        setLoadFeed(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function RenderFeedOfLists() {
    if (loadFeed) return <HomeFeed lists={lists} />;

    return (
      <CenterDiv>
        <TailSpin
          height="80"
          width="80"
          color="#F7C84F"
          radius="1"
          visible={true}
        />
      </CenterDiv>
    );
  }

  return (
    <>
      <VerifyTokenComponent />
      <HeaderMenu
        page="home"
        menuOptions={<li onClick={goToCreateList}>Add new list</li>}
      />
      <RenderFeedOfLists />
    </>
  );
}

const CenterDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
