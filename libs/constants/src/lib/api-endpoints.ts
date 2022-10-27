export const API_ENDPOINTS = {
  host_url: 'http://localhost:4444',
  base_url: '/api',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
  },
  practitioner: {
    get: '/practitioners',
    getOne: '/practitioner/:id',
    create: '/practitioner',
    update: '/practitioner/:id',
    delete: '/practitioner/:id',
    hardDelete: '/practitioner/hard-delete/:id',
  },
};
