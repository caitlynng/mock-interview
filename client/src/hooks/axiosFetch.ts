import axios, { AxiosResponse, AxiosError } from 'axios';

const axiosFetch = async () => {
  const authData = localStorage.getItem('auth');
  let token = null;

  if (authData) {
    token = JSON.parse(authData);
  }

  while (!token) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const baseURL = import.meta.env.VITE_BASE_API;
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token.uid}`,
    },
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        console.log(error.response);
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default axiosFetch;
