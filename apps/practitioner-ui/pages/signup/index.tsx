import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, SignupForm } from '@practitionermanagement/components';

const Signup = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Practitioner Management | Login</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen">
        {/* Login Modal */}
        <div className="border-[1px] border-gray-300 flex flex-col px-10 py-10 rounded-lg w-1/2 shadow">
          <p className="font-poppins font-medium text-3xl text-center text-gray-700">
            Create an account
          </p>
          <p className="text-center text-gray-500 font-poppins font-thin mt-3">
            Already have an account?{' '}
            <span
              className="cursor-pointer underline hover:text-blue-500"
              onClick={() => router.push('/login')}
            >
              Login
            </span>
          </p>
          <div className="pt-8">
            <SignupForm />
          </div>
          <div className="flex mt-6 items-center space-x-2 place-self-center">
            <span className="w-40 h-[1px] bg-gray-300"></span>
            <p className="text-center text-gray-500">OR</p>
            <span className="w-40 h-[1px] bg-gray-300"></span>
          </div>
          <div className="mt-4 place-self-center w-full">
            <Button
              varient="secondary"
              title="Login"
              className="rounded-full w-full"
              onClick={() => router.push('/login')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
