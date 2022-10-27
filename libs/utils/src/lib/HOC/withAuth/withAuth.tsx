import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as React from 'react';
import { getCookie } from 'cookies-next';

const withAuth = (Component: React.ComponentType) => {
  return (props: React.PropsWithChildren<any>) => {
    const router = useRouter();
    const token = getCookie('accessToken')?.toString();
    const [loaded, setLoaded] = React.useState(false);
    const [isSignup, setIsSignup] = React.useState(router.query.signup);
    useEffect(() => {
      if (!token && isSignup && !loaded) {
        router.push('/signup');
        setLoaded(true);
      } else if (!token && !loaded) {
        router.push('/login');
        setLoaded(true);
      }
      if (
        (token && router.pathname === '/login') ||
        (token && router.pathname === '/signup')
      ) {
        router.push('/dashboard');
      }
      // if (token && router.pathname === '/signup') {
      //   router.push('/');
      // }
    });
    return <Component {...props} />;
  };
};

export default withAuth;
