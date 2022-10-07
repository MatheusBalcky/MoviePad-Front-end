import styled from 'styled-components';

interface IModal {
  modalConfig: { status: boolean; question: string };
  setModalConfig: Function;
  yesFunction: Function;
}

export default function Modal(props: IModal) {
  const { status, question } = props.modalConfig;
  const { setModalConfig } = props;

  function closeModal() {
    setModalConfig({ status: true, question });
  }

  function confirmModal() {
    props.yesFunction();
    closeModal();
  }

  return (
    <Background onClick={closeModal} hidden={status}>
      <Container>
        <h1>{question}</h1>
        <Buttons>
          <button onClick={confirmModal}>Yes</button>
          <button onClick={closeModal}>No</button>
        </Buttons>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff85;
  position: fixed;
  top: 0;
  z-index: 2;
`;

const Container = styled.div`
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  align-items: center;
  width: 280px;
  height: 180px;
  border-radius: 19px;
  background-color: #f7c84f;
  h1 {
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;

  button {
    border: none;
    background-color: white;
    font-size: 1em;
    width: 70px;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      filter: opacity(60%);
    }
  }
`;
