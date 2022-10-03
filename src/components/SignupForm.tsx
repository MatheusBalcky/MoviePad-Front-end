import * as schemas from '../schemas/authSchemas';
import styled from 'styled-components';
import * as apiAuth from '../services/authentications';
import { useFormik } from 'formik';
import { useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: schemas.signUpSchema,
    onSubmit: signUpFunc,
  });

  function signUpFunc(values: apiAuth.signUpData, actions: any) {
    apiAuth
      .signUp(values)
      .then((res: AxiosResponse) => {
        navigate('/signin');
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 409)
          setErrorMessage('This email already exists!');
        if( error.response?.status === 422)
          setErrorMessage('You need to use a valid email!')
        actions.setSubmitting(false);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        disabled={isSubmitting}
        name="email"
        type="email"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="E-mail"
        required
        className={errors.email && touched.email ? 'input-error' : ''}
      />
      {errors.email && touched.email ? <Err>{errors.email}</Err> : ''}

      <Input
        disabled={isSubmitting}
        name="password"
        type="password"
        placeholder="Password"
        required
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {errors.password && touched.password ? <Err>{errors.password}</Err> : ''}

      <Input
        disabled={isSubmitting}
        name="passwordConfirm"
        type="password"
        placeholder="Confirm password"
        required
        value={values.passwordConfirm}
        onBlur={handleBlur}
        onChange={handleChange}
        className={
          errors.passwordConfirm && touched.passwordConfirm ? 'input-error' : ''
        }
      />
      {errors.passwordConfirm && touched.passwordConfirm ? (
        <Err>{errors.passwordConfirm}</Err>
      ) : (
        ''
      )}

      <Err>{errorMessage}</Err>
      <Button disabled={isSubmitting} type="submit" data-cy="test">
        Sign Up
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  border: 1px solid #adadad;
  &:focus {
    outline: 1px solid #adadad;
  }
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
  &:disabled {
    background-color: #b8b8b8;
    cursor: default;
  }
`;

const Err = styled.span`
  width: 100%;
  color: red;
  font-size: 0.9em;
`;
