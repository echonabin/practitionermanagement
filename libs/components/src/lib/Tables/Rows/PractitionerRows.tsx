import * as React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Cell } from 'react-table';
import router from 'next/router';
import DeleteModal from '../../Modal';
import { privateAgent } from '@practitionermanagement/store';
import { usePractitionerData } from '@practitionermanagement/store';

interface PractitionerProps {
  cell: any;
}

const PractitionerRows = (props: PractitionerProps) => {
  const [open, setOpen] = React.useState(false);
  const cell = props.cell as Cell[];
  const [currentSelected, setCurrentSelected] = React.useState('');
  const { setRefresh } = usePractitionerData();

  const handleDelete = async (id: string) => {
    if (currentSelected !== '') {
      const resp = await privateAgent.delete(`/practitioner/${id}`);
      if (resp.status === 200) {
        setRefresh(true);
        setOpen(false);
      }
    }
  };

  React.useEffect(() => {
    if (open) {
      DeleteModal({
        confirmHandler: () => handleDelete(currentSelected),
        refreshHandler: () => setRefresh(true),
      });
      setOpen(false);
    }
  }, [open]);

  const renderProfile = (cell: Cell) => {
    if (cell.column.Header === 'Profile') {
      return (
        <div className="flex items-center space-x-2 ml-4">
          <img
            src={cell.value.replace(
              'practitionerbucket1.practitionerbucket1',
              'practitionerbucket1'
            )}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      );
    }
  };

  const renderAction = (cell: Cell) => {
    return (
      <>
        <td>
          <FiEdit className="text-blue-500 text-xl cursor-pointer hover:scale-105 transition-all ease-linear duration-200" />
        </td>
        <td>
          <FiTrash
            className="text-red-500 text-xl cursor-pointer hover:scale-105 transition-all ease-linear duration-200"
            onClick={() => {
              setOpen(true);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setCurrentSelected(cell.row.original._id);
            }}
          />
        </td>
      </>
    );
  };

  return (
    <>
      {cell.map((c, i) => {
        return (
          <>
            <td
              {...c.getCellProps()}
              className="text-center border-b-[1px] py-3 text-gray-700 font-poppins"
              key={i}
            >
              {c.column.Header === 'Profile' ? (
                renderProfile(c)
              ) : c.column.Header !== 'Action' ? (
                <div
                  onClick={() =>
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    router.push(`/practitioner/${c.row.original._id}`)
                  }
                >
                  {c.render('Cell')}
                </div>
              ) : (
                renderAction(c)
              )}
            </td>
          </>
        );
      })}
    </>
  );
};

export default PractitionerRows;
