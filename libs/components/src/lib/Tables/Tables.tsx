import * as React from 'react';
import { useTable } from 'react-table';
import PractitionerRows from './Rows/PractitionerRows';

const _data = [
  {
    id: 1,
    Profile:
      'https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    Name: 'John Doe',
    Email: 'johndoe@gmail.com',
    Contact: '1234567890',
    Address: '1234, Street, City, State, Country',
  },
  {
    id: 2,
    Profile:
      'https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    Name: 'John Doe',
    Email: 'johndoe@gmail.com',
    Contact: '1234567890',
    Address: '1234, Street, City, State, Country',
  },
  {
    id: 3,
    Profile:
      'https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    Name: 'John Doe',
    Email: 'johndoe@gmail.com',
    Contact: '1234567890',
    Address: '1234, Street, City, State, Country',
  },
];

const Table = ({ columns, data }: any) => {
  const _columns = React.useMemo(
    () => [
      {
        Header: 'Profile',
        accessor: 'Profile',
      },
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Email',
        accessor: 'Email',
      },
      {
        Header: 'Contact',
        accessor: 'Contact',
      },
      {
        Header: 'Address',
        accessor: 'Address',
      },
    ],
    []
  );
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: _columns,
      data: _data,
    });

  // Render the UI for your table
  return (
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="py-3 rounded-md">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-white">
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="hover:bg-gray-100 cursor-pointer"
            >
              <PractitionerRows cell={row.cells} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
