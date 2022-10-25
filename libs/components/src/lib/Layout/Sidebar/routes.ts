import { FiPieChart, FiUser, FiUserPlus } from 'react-icons/fi';

export const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: FiPieChart,
  },
  {
    name: 'List Practitioners',
    path: '/practitioner/list',
    icon: FiUser,
  },
  {
    name: 'Create Practitioners',
    path: '/practitioner/add',
    icon: FiUserPlus,
  },
];
