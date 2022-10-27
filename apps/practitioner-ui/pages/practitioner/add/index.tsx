import React from 'react';
import Head from 'next/head';
import { PractitionerForm } from '@practitionermanagement/components';
import { withAuth } from '@practitionermanagement/utils';

const AddPractitioner = () => {
  return (
    <>
      <Head>
        <title>Practitioner Management | Login</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen">
        {/* Login Modal */}
        <div className="border-[1px] border-gray-300 flex flex-col px-10 py-10 rounded-lg w-1/2 shadow">
          <p className="font-poppins font-medium text-3xl text-center text-gray-700">
            Create a practitioner
          </p>
          <div className="pt-8">
            <PractitionerForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(AddPractitioner);
