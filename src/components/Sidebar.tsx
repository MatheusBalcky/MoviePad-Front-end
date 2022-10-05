import styled from 'styled-components';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function Sidebar(props: any) {
  const [ statusSidebar, setSidebar ] = props.stateBar;
  const navigate = useNavigate();
  const styleIconArrow = {
    color: 'white',
    fontSize: '1.9em',
    cursor: 'pointer',
  };

  function closeSidebar() {
    setSidebar(!statusSidebar);
  }

  function logOut (){
     localStorage.removeItem('tokenMoviePad');
     navigate('/signin');
  }

  return (
    <Background hidden={statusSidebar}>
      <Container>
        <HeaderSidebar>
          <IoArrowBack onClick={closeSidebar} style={styleIconArrow} />
        </HeaderSidebar>
        <hr />
        <ContentList>
          <ul>{props.menuOptions}</ul>
          <button onClick={logOut}>Log Out</button>
        </ContentList>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  background-color: #00000064;
  position: fixed;
  top: 0px;
  width: 100%;
  height: 99.99%;
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.98);
  position: fixed;
  height: 100%;
  top: 0px;
  right: 0px;
  width: 240px;
  animation: showSidebar 1s;
  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 240px;
    }
  }
  hr {
    width: 90%;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  button {
    background: none;
    border: none;
    color: white;
  }
  button,
  li {
    font-family: 'Roboto';
    font-size: 1.2em;
    font-weight: bold;
    &:hover {
      filter: opacity(30%);
      cursor: pointer;
    }
  }
`;

const HeaderSidebar = styled.div`
  box-sizing: border-box;
  width: 100%;
  color: white;
  padding: 10px 20px;
  transform: rotate(180deg);
  &:hover{
    filter: opacity(30%);
  }
`;

const ContentList = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
  color: white;
  padding: 10px;
`;
