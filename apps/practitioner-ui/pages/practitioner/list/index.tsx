import React from 'react';
import { Loading, Table } from '@practitionermanagement/components';
import {
  privateAgent,
  usePractitionerData,
} from '@practitionermanagement/store';
import Head from 'next/head';
import { withAuth } from '@practitionermanagement/utils';

const ListPractitioner = () => {
  const {
    data,
    getPractitionerData,
    loading,
    setLoading,
    setError,
    refresh,
    setRefresh,
  } = usePractitionerData();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Profile',
        accessor: 'profileImage',
      },
      {
        Header: 'Name',
        accessor: 'fullname',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Contact',
        accessor: 'contact',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Action',
        accessor: '',
      },
    ],
    []
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await privateAgent.get('/practitioners');
        getPractitionerData(res.data);
        setLoading();
      } catch (error) {
        setError(error.message);
        setLoading();
      }
    };
    fetchData();
    refresh && setRefresh(false);
  }, [refresh]);

  return (
    <>
      <Head>
        <title>Practitioner List</title>
      </Head>
      <h1 className="text-3xl font-semibold font-poppins text-gray-700">
        Practitioners
      </h1>
      <div className="w-full bg-slate-100">
        {loading ? (
          <div className="flex justify-center items-center h-screen bg-white">
            <Loading />
          </div>
        ) : (
          <Table data={data.practitioners ?? []} columns={columns} />
        )}
      </div>
    </>
  );
};

export default withAuth(ListPractitioner);
