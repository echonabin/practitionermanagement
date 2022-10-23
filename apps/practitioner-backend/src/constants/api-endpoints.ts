export const API_ENDPOINTS = {
  base_url: '/api',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
  },
  practitioner: {
    get: '/practitioner',
    getOne: '/practitioner/:id',
    create: '/practitioner',
    update: '/practitioner/:id',
    delete: '/practitioner/:id',
  },
};
