import create from 'zustand';
import { deleteCookie } from 'cookies-next';

type authData = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  profileUrl: string;
  jwtToken: string;
  refreshToken?: {
    token: string;
    expires: string;
    isActive: boolean;
  };
  message?: string;
};

type registerData = {
  message: string;
};

interface authState {
  data: authData;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    profileUrl: string;
  };
  loading: boolean;
  error: string;
  message: string;
  registerUser: (data: registerData) => void;
  loginUser: (data: authData) => void;
  logoutUser: () => void;
  refreshToken: (data: authData) => void;
  setLoading: () => void;
  setError: (error: string) => void;
  resetErr: () => void;
}

export const useAuthData = create<authState>((set) => ({
  // Initial state
  loading: true,
  user: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    profileUrl: '',
  },
  data: {} as authData,
  message: '',
  error: '',
  registerUser: (data: registerData) => {
    set((state) => ({
      ...state,
      message: data.message,
      loading: true,
    }));
  },
  loginUser: (data: authData) => {
    set((state) => ({
      ...state,
      data: data,
      user: {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        profileUrl: data.profileUrl,
      },
      loading: true,
    }));
  },
  logoutUser: () => {
    set((state) => ({
      ...state,
      data: {} as authData,
      loading: true,
    }));
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
  },
  refreshToken: (data: authData) => {
    set((state) => ({
      ...state,
      data: data,
      loading: true,
    }));
  },
  setLoading: () => {
    set((state) => ({
      ...state,
      loading: false,
    }));
  },
  setError: (error: string) => {
    set((state) => ({
      ...state,
      error: error,
    }));
  },
  resetErr: () => {
    setTimeout(() => {
      set((state) => ({
        ...state,
        error: '',
      }));
    }, 3000);
  },
}));
