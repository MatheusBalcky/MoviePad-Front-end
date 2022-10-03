import styled from 'styled-components';

export default function BoxAuth(props: any) {
  return (
    <Background>
      {props.children}
    </Background>
  );
}

const Background = styled.div`
  padding: 25px 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ebebeb;
  gap: 10px;
  margin: 0px 10px;
  width: 100%;
  max-width: 300px;

  h1,
  button,
  p {
    font-family: 'Rasa', serif;
    font-size: 1.3em;
  }
`;
