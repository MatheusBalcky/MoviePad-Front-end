import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderMenu from '../components/HeaderMenu';
import VerifyTokenComponent from '../components/VerifyToken';
import * as listsService from '../services/lists';
import { CenterDiv } from './Home';
import styled from 'styled-components';

export default function ContentPage() {
  const { contentId, listId } = useParams();
  const token = localStorage.getItem('tokenMoviePad');
  const [loadContent, setLoadContent] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [buttonsSideBarDisabled, setButtonsSideBarDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(getContent, []);

  function getContent() {
    listsService
      .getOneContentFromAList(token!, Number(listId), Number(contentId))
      .then((res) => {
        console.log(res);
        setContent(res.data);
        setLoadContent(true);
      })
      .catch(({ response }) => {
        setContent(response.status);
        setLoadContent(true);
        setButtonsSideBarDisabled(true)
      });
  }

  function removeContent() {
    console.log('removing');
    listsService.deleteOneContentFromAList(token!, Number(listId), Number(contentId))
    .then( res =>{
      alert('Content removed from list with success!')
      navigate(`/lists/${listId}`);
    })
    .catch( err =>{
      alert('Error while remove this content!')
    })
  }

  function RenderContent() {
    if (loadContent && content?.title) {
      return (
        <Background>
          <Container>
            <Header>
              <ContentImage itemProp={content.pictureUrl}/>

              <ContentTitleYear>
                <h1>{content.title}</h1>
                <span>{content.releaseYear.slice(0, 4)}</span>
              </ContentTitleYear>
            </Header>
            <Description>
              {content.description}
            </Description>
          </Container>
        </Background>
      );
    } else if (loadContent && content == 404) {
      return (
        <CenterDiv>
          <h1>Content not found!</h1>
        </CenterDiv>
      );
    }
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
        page="contentPage"
        backbutton={`/lists/${listId}`}
        menuOptions={
          <button disabled={buttonsSideBarDisabled} onClick={removeContent}>
            Remove this content
          </button>
        }
      />
      <RenderContent />
    </>
  );
}

const Background = styled.div`
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  box-sizing: border-box;
  background-color: #ebebeb;
  border-radius: 16px;
  width: 100%;
  padding: 10px;
`;

const Header = styled.header`
  display: flex;
  height: 191px;
`;

const ContentImage = styled.div`
  border-radius: 16px;
  min-width: 130px;
  height: 190px;
  background: ${(props) => (props.itemProp ? `url(${props.itemProp})` : '')};
  background-position: center;
  background-size: cover;
`;

const ContentTitleYear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 15px;
  h1{
    font-weight: bold;
    text-align: center;
  }
  span{
    font-weight: lighter;
    font-style: italic;
  }
`;

const Description = styled.h2`
  box-sizing: border-box;
  text-align: center;
  padding: 20px;
  width: 100%;
  font-weight: lighter;
`
