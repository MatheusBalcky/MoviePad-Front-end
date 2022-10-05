import styled from 'styled-components';

export function BoxList(props: any) {
  return (
    <Background>
      <IconsTop>
        <span>{props.iconList}</span>
        <p>{props.moviesAmount}</p>
      </IconsTop>
      <TitleList>{props.titleList}</TitleList>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 10px;
  border-radius: 5px;
  background-color: #ebebeb;
  width: 120px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.293);
  &:hover {
    cursor: pointer;
    animation: float 1s infinite;
  }
  @keyframes float {
    0% {
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.293);
      transform: translatey(0px);
    }
    50% {
      box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.2);
      transform: translatey(-3px);
    }
    100% {
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.293);
      transform: translatey(0px);
    }
  }
`;

const IconsTop = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    filter: opacity(50%);
  }
`;

const TitleList = styled.h2`
  color: black;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8em;
`;
