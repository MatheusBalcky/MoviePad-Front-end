import styled from 'styled-components';
import logoMoviePad from '../assets/LOGO.svg';
import { IoArrowBack, IoEllipsisVertical } from 'react-icons/io5';
import Sidebar from './Sidebar';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IHeaderMenuProps {
  page?: String;
  menuOptions?: ReactElement
  backbutton?: String
}

export default function HeaderMenu(props: IHeaderMenuProps) {
  const navigate: any = useNavigate();
  const [statusSidebar, setSidebar] = useState(true);
  const styleIconArrow = {
    color: 'black',
    fontSize: '1.5em',
    cursor: 'pointer',
    display: props.page === 'home' ? 'none' : 'inherit',
  };
  const styleIconElipsis = {
    color: 'black',
    fontSize: '1.5em',
    cursor: 'pointer',
  };

  function openMenu() {
    setSidebar(!statusSidebar);
  }

  return (
    <>
      <Background>
        <ComponentsHeader>
          <ImgMoviePad src={logoMoviePad} />
          <ComponentsRight>
            <IoArrowBack
              onClick={() => navigate(props.backbutton)}
              style={styleIconArrow}
            />
            <IoEllipsisVertical style={styleIconElipsis} onClick={openMenu} />
          </ComponentsRight>
        </ComponentsHeader>
      </Background>
      <Sidebar
        menuOptions={props.menuOptions}
        stateBar={[statusSidebar, setSidebar]}
      ></Sidebar>
    </>
  );
}

const Background = styled.div`
  background-color: #f7c84f;
  display: flex;
  justify-content: center;
`;

const ComponentsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 15px;
`;

const ComponentsRight = styled.div`
  display: flex;
  gap: 10px;
  svg:hover {
    filter: opacity(20%);
  }
`;

const ImgMoviePad = styled.img`
  width: 180px;
  margin-left: -40px;
`;
