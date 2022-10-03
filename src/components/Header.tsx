import styled from 'styled-components';
import logoMoviePad from '../assets/LOGO.svg';

export default function Header() {
  return (
    <Background>
      <ImgMoviePad src={logoMoviePad} />
    </Background>
  );
}

const Background = styled.div`
  background-color: #f7c84f;
  display: flex;
  justify-content: center;
`;

const ImgMoviePad = styled.img`
  width: 220px;
`;
