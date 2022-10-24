/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as React from 'react';

const withAuth = (Component: React.ComponentType) => {
  return (props: React.PropsWithChildren<any>) => {
    const router = useRouter();
    const token = localStorage.getItem('token');
    // @ts-ignore
    useEffect(() => {
      if (!token) {
        return router.push('/login');
      }
      localStorage.setItem('token', token);
    });
    return <Component {...props} />;
  };
};

export default withAuth;
