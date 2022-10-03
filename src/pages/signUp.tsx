import styled from 'styled-components';
import Header from '../components/Header';
import BoxAuth from '../components/BoxAuth';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignupForm';

export default function SignUp() {
  return (
    <Background>
      <Header />
      <BackgroundAuth>
        <BoxAuth>
          <h1>Sign up below!</h1>

          <br />
          <SignUpForm />
          <br />

          <Link to="/signin">
            <Span>
              Already have an account? <br /> Sign in.
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

const Span = styled.p`
  text-align: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
