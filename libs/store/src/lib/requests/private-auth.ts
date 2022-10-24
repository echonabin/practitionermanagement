import axios from 'axios';
import { baseUrl } from './baseUrls.json';

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
    const accessToken = localStorage.getItem('accessToken');
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
    const refreshToken = localStorage.getItem('refreshToken');
    if (
      refreshToken &&
      error?.response?.status === 401 &&
      error?.response?.data?.message === 'jwt expired'
    ) {
      return axios
        .get(`${baseUrl}auth/refresh?token=${refreshToken}`)
        .then((res: any) => {
          if (res.status === 200) {
            const tokenData: RefreshTokenResponse = res.data;
            localStorage.setItem('accessToken', tokenData.jwtToken);
            return privateAgent(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export { privateAgent, publicAgent };
