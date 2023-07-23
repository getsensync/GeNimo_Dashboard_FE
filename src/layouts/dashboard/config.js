import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import WrenchScrewdriverIcon from '@heroicons/react/24/solid/WrenchScrewdriverIcon';
import BookOpenIcon from '@heroicons/react/24/solid/BookOpenIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import MapIcon from '@mui/icons-material/Map';
import { SvgIcon } from '@mui/material';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';

export const items = [
  {
    title: 'Overview',
    path: '/',
    roles: ['admin', 'operator'],
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Customers',
    path: '/customers',
    roles: ['admin'],
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Spots',
    path: '/spots',
    roles: ['admin'],
    icon: (
      <SvgIcon fontSize="small">
        <MapIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Logs',
    path: '/logs',
    roles: ['admin', 'operator'],
    icon: (
      <SvgIcon fontSize="small">
        <BookOpenIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Triggers',
    path: '/trigger',
    roles: ['admin', 'operator'],
    icon: (
      <SvgIcon fontSize="small">
        <WrenchScrewdriverIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    roles:[],
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    roles:[],
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Login',
    path: '/auth/login',
    roles:[],
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Register',
    path: '/auth/register',
    roles:[],
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Error',
    path: '/404',
    roles:[],
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    )
  }
];
