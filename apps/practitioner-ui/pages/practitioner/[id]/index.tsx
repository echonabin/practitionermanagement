import React, { useEffect } from 'react';
import Head from 'next/head';
import { withAuth } from '@practitionermanagement/utils';
import {
  privateAgent,
  usePractitionerData,
} from '@practitionermanagement/store';
import { useRouter } from 'next/router';
import { Loading } from '@practitionermanagement/components';
import moment from 'moment';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';

const SinglePractitioner = () => {
  const {
    getSinglePractitioner,
    loading,
    setLoading,
    setError,
    singlePractitioner,
  } = usePractitionerData();
  const { id } = useRouter().query;
  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        try {
          const res = await privateAgent.get(`/practitioner/${id}`);
          getSinglePractitioner(res.data.practitioner);
          setLoading();
        } catch (error) {
          setError(error.message);
          setLoading();
        }
      }
    };
    fetchData();
  }, [id]);
  console.log(singlePractitioner);

  const {
    fullname,
    email,
    contact,
    address,
    profileImage,
    dob,
    createdAt,
    workingDays,
    startTime,
    endTime,
    isIcu,
  } = singlePractitioner;
  return (
    <>
      <Head>
        <title>{fullname}</title>
      </Head>
      {loading || !profileImage ? (
        <Loading />
      ) : (
        <div>
          <div className="w-full">
            <div className="grid grid-cols-12 w-full items-center space-x-4">
              <h1 className="text-3xl font-semibold font-poppins text-gray-700 col-span-3">
                Practitioner Profile
              </h1>
              <div className="h-[1px] bg-gray-200 w-full col-span-9" />
            </div>
            <div className="py-6 w-full">
              <div className="px-4 py-4 shadow-2xl grid grid-cols-12 w-full divide-x-[1px] items-center">
                {/* profile */}
                <div className="col-span-2 flex flex-col justify-center space-y-2 place-self-center mt-10">
                  <img
                    src={profileImage.replace(
                      'practitionerbucket1.practitionerbucket1',
                      'practitionerbucket1'
                    )}
                    width={80}
                    height={80}
                    className="rounded-full"
                    alt=""
                  />
                  <p className="font-semibold text-lg">{fullname}</p>
                </div>
                <div className="col-span-10 grid row-span-3 pl-6">
                  <p className="text-gray-500 pb-2">Personal Details</p>
                  <div className="flex space-x-4 pb-2 border-b-[1px]">
                    <p className="font-poppins font-medium text-gray-400">
                      Email:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {email}
                      </span>
                    </p>
                    <p className="font-poppins font-medium text-gray-400">
                      Contact:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {contact}
                      </span>
                    </p>
                    <p className="font-poppins font-medium text-gray-400">
                      Address:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {address}
                      </span>
                    </p>
                    <p className="font-poppins font-medium text-gray-400">
                      Is ICU:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {isIcu ? 'Yes' : 'No'}
                      </span>
                    </p>
                    <div className="font-poppins font-medium text-gray-400 flex items-center">
                      ICU:{' '}
                      <span className="text-gray-700 font-normal pl-3 text-3xl">
                        {isIcu ? (
                          <FiToggleRight className="text-green-400" />
                        ) : (
                          <FiToggleLeft className="text-red-400" />
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 pb-2">More Info</p>
                  <div className="flex space-x-4 pb-2 border-b-[1px]">
                    <p className="font-poppins font-medium text-gray-400">
                      Date of Birth:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {moment(dob).format('MMMM Do YYYY')}
                      </span>
                    </p>
                    <p className="font-poppins font-medium text-gray-400">
                      Registered:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {moment(createdAt).startOf('day').fromNow()};
                      </span>
                    </p>
                  </div>
                  <p className="text-gray-500 pb-2">Working Info</p>
                  <div className="flex space-x-4 border-b-[1px] pb-2">
                    <p className="font-poppins font-medium text-gray-400">
                      Working Days:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {workingDays}
                      </span>
                    </p>
                    <p className="font-poppins font-medium text-gray-400">
                      Start Time:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {startTime}
                      </span>
                    </p>
                    <p className="font-poppins font-medium text-gray-400">
                      End time:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {endTime}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(SinglePractitioner);
