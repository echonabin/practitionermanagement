import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, LoginForm } from '@practitionermanagement/components';
import { withAuth } from '@practitionermanagement/utils';

const Login = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Practitioner Management | Login</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen">
        {/* Login Modal */}
        <div className="border-[1px] border-gray-300 flex flex-col px-10 py-10 rounded-lg w-2/6 shadow">
          <p className="font-poppins font-medium text-3xl text-center text-gray-700">
            Sign in
          </p>
          <div className="pt-8">
            <LoginForm />
          </div>
          <div className="flex mt-6 items-center space-x-2 place-self-center">
            <span className="w-40 h-[1px] bg-gray-300"></span>
            <p className="text-center text-gray-500">OR</p>
            <span className="w-40 h-[1px] bg-gray-300"></span>
          </div>
          <div className="mt-4 place-self-center w-full">
            <Button
              varient="secondary"
              title="Create an account"
              className="rounded-full w-full"
              onClick={() => router.push('/signup?signup=true')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Login);
