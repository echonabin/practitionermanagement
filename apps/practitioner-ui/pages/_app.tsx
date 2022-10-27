import { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { Layout } from '@practitionermanagement/components';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Welcome to practitioner-ui!</title>
      </Head>
      <main className="app">
        <ToastContainer />
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          !router.pathname.includes('/login') &&
          !router.pathname.includes('/signup') ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )
        }
      </main>
    </>
  );
}

export default CustomApp;
