import styled from 'styled-components';
import Header from '../components/Header';
import BoxAuth from '../components/BoxAuth';
import { Link, useNavigate } from 'react-router-dom';
import SignInForm from '../components/SigninForm';
import { useEffect } from 'react';

export default function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('tokenMoviePad');
    if (token) return navigate('/home');
  }, []);

  return (
    <Background>
      <Header />
      <BackgroundAuth>
        <BoxAuth>
          <h1>Sign in below!</h1>

          <br />
          <SignInForm />
          <br />
          <Link to="/signup">
            <Span>
              Don't have an account? <br /> Sign up
            </Span>
          </Link>
        </BoxAuth>
      </BackgroundAuth>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
`;

const BackgroundAuth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  border: 1px solid rgba(212, 212, 212, 1);
  padding: 8px;
  border-radius: 9px;
  font-size: 1.1em;
  width: 100%;
  &:placeholder-shown {
    font-style: italic;
  }
`;

const Button = styled.button`
  cursor: pointer;
  background-color: black;
  color: white;
  border: none;
  border-radius: 9px;
  padding: 5px 40px;
  &:hover {
    background-color: #2f2f2f;
  }
`;

const Span = styled.p`
  text-align: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
