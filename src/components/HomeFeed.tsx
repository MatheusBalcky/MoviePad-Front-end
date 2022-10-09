import styled from 'styled-components';
import { BoxList } from './BoxList';
import { Link, useNavigate } from 'react-router-dom';
import { ReactElement } from 'react';

interface IHomeFeed {
  lists: any[];
}
interface IlistObject {
  id: number;
  userId: number;
  title: string;
  iconList: string;
  createdAt: string;
  amount: number;
}

export default function HomeFeed(props: IHomeFeed) {
  const navigate: any = useNavigate();
  const { lists } = props;

  function RenderLists(): any {
    if (lists.length === 0)
      return (<Button onClick={() => navigate('/createlist')}>New list</Button>);

    return lists.map((item: IlistObject, index) => {
      return (
        <Link key={index} to={`/lists/${item.id}`}>
          <BoxList
            iconList={item.iconList}
            moviesAmount={item.amount}
            titleList={item.title}
          />
        </Link>
      );
    });
  }

  return (
    <Background>
      <Content>
        <RenderLists />
      </Content>
    </Background>
  );
}

const Background = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  display: flex;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  margin: 5px;
`;

const Button = styled.button`
  border: none;
  color: black;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.293);
  padding: 20px;
  border-radius: 5px;
  background-color: #ebebeb;
  width: 120px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.293);
  font-weight: bold;
  font-size: 1em;
  animation: float 2s infinite;
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
  &:hover {
    filter: opacity(60%);
    cursor: pointer;
  }
`;
