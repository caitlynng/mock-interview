import axios, { AxiosResponse, AxiosError } from 'axios';

const token = sessionStorage.getItem('uid');
const baseURL = import.meta.env.VITE_BASE_API
const axiosFetch = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosFetch.interceptors.response.use(
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

export default axiosFetch;
