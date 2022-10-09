import styled from "styled-components";
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect , useContext} from 'react'
import { tokenVerify } from '../services/authentications';
import userDataContext from '../contexts/userDataContext';

export default function VerifyTokenComponent(){
  const tokenLocal = localStorage.getItem('tokenMoviePad');
  const navigate = useNavigate();
  const { setUserData } = useContext(userDataContext);

  useEffect(() => {
    if (!tokenLocal) return navigate('/signin');

    tokenVerify(tokenLocal)
      .then((res: AxiosResponse) => {
        setUserData(res.data);
      })
      .catch((err: AxiosError) => {
        localStorage.removeItem('tokenMoviePad');
        return navigate('/signin');
      });
  }, []);

  return (<Span></Span>);
}

const Span = styled.span`
  display: none;
`