import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  password: yup.string().min(8).required('Password is required!'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Password confirm must to be equal!')
    .required('Password confirm is required!'),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  password: yup.string().min(8).required('Password is required!'),
});
