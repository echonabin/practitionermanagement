import create from 'zustand';

type Practitioner = {
  _id: string;
  fullname: string;
  email: string;
  contact: string;
  dob: string;
  workingDays: string;
  startTime: string;
  endTime: string;
  address: string;
  createdBy: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  isIcu: boolean;
};

type practitionerData = {
  message: string;
  practitioners: Practitioner[];
};

type registerData = {
  message: string;
};

interface practitionerState {
  data: practitionerData;
  singlePractitioner: Practitioner;
  loading: boolean;
  error: string;
  message: string;
  registerPractitioner: (data: registerData) => void;
  getPractitionerData: (data: practitionerData) => void;
  getSinglePractitioner: (data: Practitioner) => void;
  setLoading: () => void;
  setError: (error: string) => void;
  resetErr: () => void;
  refresh: boolean;
  setRefresh: (status: boolean) => void;
}

export const usePractitionerData = create<practitionerState>((set) => ({
  // Initial state
  loading: true,
  refresh: false,
  singlePractitioner: {} as Practitioner,
  data: {} as practitionerData,
  message: '',
  error: '',
  registerPractitioner: (data: registerData) => {
    set((state) => ({
      ...state,
      message: data.message,
    }));
  },
  getPractitionerData: (data: practitionerData) => {
    set((state) => ({
      ...state,
      data: data,
    }));
  },
  getSinglePractitioner: (data: Practitioner) => {
    set((state) => ({
      ...state,
      singlePractitioner: data,
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
  setRefresh: (status: boolean) => {
    set((state) => ({
      ...state,
      refresh: status,
    }));
  },
}));
