import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUser } from 'redux/slices/usersSlice';

export type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  isCheck: boolean;
  error: null | string;
  loading: boolean;
};

export type LoginFormData = {
  email: string;
  password: string;
  error: null | string;
  loading: boolean;
};

const token: string = 'token';

const axiosFetch = axios.create({
  baseURL: '/api/v1',
});
//axios interceptor to control error response
axiosFetch.interceptors.request.use(
  (config) => {
    config.headers.common['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log(error.response);
    }
    return Promise.reject(error);
  },
);

export const useRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = (location.state as any)?.from?.pathname || '/';

  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    password: '',
    isCheck: false,
    error: null,
    loading: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, password, isCheck, email } = formData;

    if (!name || !email || !password) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: 'All fields must be filled in.',
      }));
      return;
    }

    if (!isCheck) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: 'Please agree to our Terms of Service and Privacy Policy.',
      }));
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      error: null,
      loading: true,
    }));

    try {
      const { data } = await axios.post(`/api/v1/auth/register`, formData);
      const { user } = data;

      dispatch(setUser({ name: user.name, email: user.email, uid: user.uid }));
      navigate(fromPage, { replace: true });
    } catch (error: any) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: error,
        loading: false,
      }));
    }
  };

  return { handleSubmit, formData, setFormData };
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = (location.state as any)?.from?.pathname || '/';

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: 'All fields must be filled in',
      }));

      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      error: null,
      loading: true,
    }));

    try {
      const { data } = await axios.post(`/api/v1/auth/login`, formData);
      const { user } = data;
      dispatch(setUser({ name: user.name, email: user.email, uid: user.uid }));
      navigate(fromPage, { replace: true });
    } catch (error: any) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: error,
        loading: false,
      }));
    }
  };

  return { formData, setFormData, handleSubmit };
};
