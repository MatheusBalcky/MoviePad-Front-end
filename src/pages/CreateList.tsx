import HeaderMenu from '../components/HeaderMenu';
import styled from 'styled-components';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import * as listsService from '../services/lists';
import { useState } from 'react';

export default function CreateList() {
  const checkStyle = { fontSize: '2.5em' };
  const tokenLocal = localStorage.getItem('tokenMoviePad');
  const [title, setTitle] = useState('');
  const [iconList, setIconList] = useState('');

  function createListFunc(e: any) {
    e.preventDefault();
    const promise = listsService.createList(tokenLocal!, { title, iconList });
    promise
      .then((resp) => {
        alert('List created with success!');
        setTitle('');
        setIconList('');
      })
      .catch((err) => {
        alert('Error on create new list');
      });
  }

  return (
    <>
      <HeaderMenu backbutton="/home" page="createList" />
      <Background>
        <Container>
          <Form onSubmit={(e) => createListFunc(e)}>
            <h3>Create List</h3>
            <br />

            <label>List title</label>
            <Input
              value={title}
              type="text"
              required
              maxLength={35}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <label>Icon List</label>
            <Input
              value={iconList}
              type="text"
              about="icon"
              maxLength={5}
              onChange={(e) => {
                setIconList(e.target.value);
              }}
            />

            <Button>
              <IoCheckmarkCircleSharp style={checkStyle} />
            </Button>
          </Form>
        </Container>
      </Background>
    </>
  );
}

const Background = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 10px;
  border-radius: 5px;
  background-color: #ebebeb;
  width: 280px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.293);
  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    font-weight: bold;
  }
  h3 {
    width: 100%;
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2em;
  }
`;

const Input = styled.input`
  border: none;
  width: ${(props) => (props.about === 'icon' ? '40px' : '')};
  border-radius: 3px;
  padding: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  border: none;
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: none;
  width: fit-content;
  cursor: pointer;
  &:hover {
    filter: opacity(50%);
  }
`;
