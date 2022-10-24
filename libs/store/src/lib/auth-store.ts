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
  loading: boolean;
  registerUser: (data: registerData) => void;
  loginUser: (data: authData) => void;
  logoutUser: () => void;
  refreshToken: (data: authData) => void;
  setLoading: () => void;
}

export const useAuthData = create<authState>((set) => ({
  // Initial state
  loading: true,
  data: {} as authData,
  message: '',
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
}));
