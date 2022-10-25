import { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to practitioner-ui!</title>
      </Head>
      <main className="app">
        <ToastContainer />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
