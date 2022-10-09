import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderMenu from '../components/HeaderMenu';
import ListAndContents from '../components/ListAndContents';
import Modal from '../components/Modal';
import VerifyTokenComponent from '../components/VerifyToken';
import * as listsService from '../services/lists';

export default function ListPage() {
  const token = localStorage.getItem('tokenMoviePad')
  const { listId } = useParams();
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = useState({
    status: true,
    question: '',
  });

  function openModal() {
    setModalConfig({
      status: false,
      question: 'Do you really want to remove this list?',
    });
  }

  function removeListFunc() {
    listsService.deleteList(token!, Number(listId))
    .then( res => {
      alert('List removed!');
      navigate('/home');
    })
    .catch( err =>{
      alert('Error on remove list!')
    });
  }

  return (
    <>
      <VerifyTokenComponent />
      <HeaderMenu
        page="list"
        backbutton={'/home'}
        menuOptions={<li onClick={openModal}>Remove this list</li>}
      />
      <ListAndContents token={token!} listId={Number(listId)} />
      <Modal
        yesFunction={removeListFunc}
        setModalConfig={setModalConfig}
        modalConfig={modalConfig}
      />
    </>
  );
}
