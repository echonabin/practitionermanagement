import axios from 'axios';
import router from 'next/router';
import { baseUrl } from './baseUrls';
import { getCookie, removeCookies, setCookie } from 'cookies-next';
import { toast } from 'react-toastify';

type RefreshTokenResponse = {
  jwtToken: string;
};

const privateAgent = axios.create({
  baseURL: baseUrl,
});

const publicAgent = axios.create({
  baseURL: baseUrl,
});

privateAgent.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken && config.headers)
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor to refresh token on receiving token expired error
privateAgent.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    const refreshToken = getCookie('refreshToken');
    console.log(error);
    if (
      refreshToken &&
      error?.response?.status === 401 &&
      error?.response?.data?.errors[0].message === 'jwt expired'
    ) {
      return axios
        .get(`${baseUrl}/auth/refresh?token=${refreshToken}`)
        .then((res: any) => {
          if (res.status === 200) {
            const tokenData: RefreshTokenResponse = res.data;
            setCookie('accessToken', tokenData.jwtToken);
            return privateAgent(originalRequest);
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            removeCookies('accessToken');
            removeCookies('refreshToken');
            toast('Session expired, please login again', {
              type: 'error',
            });
            router.push('/login');
          }
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);

export { privateAgent, publicAgent };
