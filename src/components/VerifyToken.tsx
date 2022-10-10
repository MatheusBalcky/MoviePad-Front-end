import styled from 'styled-components';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { signUp, tokenVerify } from '../services/authentications';
import userDataContext from '../contexts/userDataContext';

interface IVerifyTokenComponent {
  route?: string;
  page?: string;
}

export default function VerifyTokenComponent(props: IVerifyTokenComponent) {
  const { route, page } = props;
  const tokenLocal = localStorage.getItem('tokenMoviePad');
  const navigate = useNavigate();
  const { setUserData } = useContext(userDataContext);

  useEffect(() => {
    if (!tokenLocal && page === 'signup') return;
    if (!tokenLocal) return navigate('/signin');

    tokenVerify(tokenLocal!)
      .then((res: AxiosResponse) => {
        setUserData(res.data);
        localStorage.setItem('tokenMoviePad', res.data.token);
        if (route) navigate(route);
      })
      .catch((err: AxiosError) => {
        localStorage.removeItem('tokenMoviePad');
        return navigate('/signin');
      });
  }, []);
  return <Span></Span>;
}

const Span = styled.span`
  display: none;
`;
