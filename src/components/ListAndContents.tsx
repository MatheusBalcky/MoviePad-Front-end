import styled from 'styled-components';
import { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AddContentSearch } from './AddContentSearch';

interface IListAndContents {
  token: string;
  listData: any;
  setRenderList: Function;
}

export default function ListAndContents(props: IListAndContents) {
  const { token, listData, setRenderList } = props;
  const { listId, iconList, listTitle, contents } = listData;
  const [searchBarHidden, setSearchBarHidden] = useState(true);
  const styledPlustButton = { fontSize: '3em' };

  function Contents() {
    return contents.map((item: any, index: number) => {
      return (
        <Link
          key={index}
          to={`/lists/${listId}/content/${item.contentIdAtContents}`}
        >
          <BoxContent>
            <ImgContent itemProp={item.contentImgUrl} />
            <h1>{item.contentTitle}</h1>
          </BoxContent>
        </Link>
      );
    });
  }

  return (
    <Background>

      <Content>
        <Header>
          <span>{iconList}</span>
          <h2>{listTitle}</h2>
        </Header>

        <ListContent>
          <BoxContent onClick={() => setSearchBarHidden(!searchBarHidden)}>
            <IoAddCircleOutline style={styledPlustButton} />
            <h1>Add new content</h1>
          </BoxContent>

          <Contents />

        </ListContent>
      </Content>

      <AddContentSearch
        token={token}
        renderList={setRenderList}
        listId={listData.listId}
        hiddenFunc={setSearchBarHidden}
        hidden={searchBarHidden}
      />

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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 5px;
  margin: 5px;
  gap: 7px;
`;

const ListContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #ebebeb;
  width: 100px;
  height: 140px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.293);
  padding: 10px;
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
  h1 {
    font-weight: 300;
    font-style: italic;
    font-size: 1em;
    text-align: center;
  }
`;

const ImgContent = styled.div`
  box-sizing: border-box;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.itemProp ? `url(${props.itemProp})` : '')};
  background-position: center;
  background-size: cover;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: bold;
  gap: 5px;
  font-size: 1.6em;
`;
