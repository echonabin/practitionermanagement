import { FiEdit, FiTrash } from 'react-icons/fi';
import { Cell } from 'react-table';
import router from 'next/router';

interface PractitionerProps {
  cell: any;
}

const PractitionerRows = (props: PractitionerProps) => {
  const cell = props.cell as Cell[];
  const renderProfile = (cell: Cell) => {
    if (cell.column.Header === 'Profile') {
      return (
        <div className="flex items-center space-x-2 ml-4">
          <img
            src={cell.value}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      );
    }
  };
  return (
    <>
      {cell.map((c) => {
        return (
          <td
            {...c.getCellProps()}
            className="text-center border-b-[1px] py-3 text-gray-700 font-poppins"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onClick={() => router.push(`/practitioner/${c.row.original.id}`)}
          >
            {c.column.Header === 'Profile'
              ? renderProfile(c)
              : c.render('Cell')}
          </td>
        );
      })}
      <td>
        <FiEdit className="text-blue-500 text-xl cursor-pointer hover:scale-105 transition-all ease-linear duration-200" />
      </td>
      <td>
        <FiTrash className="text-red-500 text-xl cursor-pointer hover:scale-105 transition-all ease-linear duration-200" />
      </td>
    </>
  );
};

export default PractitionerRows;
