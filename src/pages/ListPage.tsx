import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import HeaderMenu from '../components/HeaderMenu';
import ListAndContents from '../components/ListAndContents';
import VerifyTokenComponent from '../components/VerifyToken';
import { TailSpin } from 'react-loader-spinner';
import * as listsService from '../services/lists';
import { toast } from 'react-toastify';

export default function ListPage() {
  const token = localStorage.getItem('tokenMoviePad');
  const navigate = useNavigate();
  const { listId } = useParams();
  const [buttonsSideBarDisabled, setButtonsSideBarDisabled] = useState(false);
  const [listData, setListData] = useState<any>();
  const [renderList, setRenderList] = useState(0);
  const [loadList, setLoadList] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    status: true,
    question: '',
  });

  useEffect(getListAndContents, [renderList]);

  function openModal() {
    setModalConfig({
      status: false,
      question: 'Do you really want to remove this list?',
    });
  }

  function removeListFunc() {
    listsService
      .deleteList(token!, Number(listId))
      .then((res) => {
        toast('List removed with success', {
          position: 'bottom-right',
          autoClose: 3500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          type: 'info',
        });
        navigate('/');
      })
      .catch((err) => {
        alert('Error on remove list!');
      });
  }

  function getListAndContents() {
    listsService
      .getOneListAndContents(token!, Number(listId))
      .then((res) => {
        setListData(res.data);
        setLoadList(true);
      })
      .catch((err) => {
        console.log(err);
        setLoadList(true);
        setButtonsSideBarDisabled(true);
      });
  }

  function RenderList() {
    if (loadList && listData !== undefined) {
      return (
        <ListAndContents
          token={token!}
          listData={listData}
          setRenderList={setRenderList}
        />
      );
    } else if (loadList && listData === undefined) {
      return (
        <CenterDiv>
          <h1>List not found!</h1>
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
        page="list"
        backbutton={'/'}
        menuOptions={
          <button disabled={buttonsSideBarDisabled} onClick={openModal}>
            Remove this list
          </button>
        }
      ></HeaderMenu>

      <RenderList />

      <Modal
        yesFunction={removeListFunc}
        setModalConfig={setModalConfig}
        modalConfig={modalConfig}
      ></Modal>
    </>
  );
}

const CenterDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  h1 {
    font-weight: bold;
    font-size: 1.5em;
  }
`;
