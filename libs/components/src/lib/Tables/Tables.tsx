import * as React from 'react';
import { useTable } from 'react-table';
import PractitionerRows from './Rows/PractitionerRows';

const Table = ({ columns, data }: any) => {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data,
    });

  // Render the UI for your table
  return (
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup, id) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={id}>
            {headerGroup.headers.map((column, id) => (
              <th
                {...column.getHeaderProps()}
                className="py-3 rounded-md"
                key={id}
              >
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
              key={i}
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
