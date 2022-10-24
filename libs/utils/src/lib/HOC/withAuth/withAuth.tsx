import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as React from 'react';
import { getCookie } from 'cookies-next';

const withAuth = (Component: React.ComponentType) => {
  return (props: React.PropsWithChildren<any>) => {
    const router = useRouter();
    const token = getCookie('accessToken')?.toString();
    useEffect(() => {
      if (!token) router.push('/login');
    });
    return token ? <Component {...props} /> : null;
  };
};

export default withAuth;
