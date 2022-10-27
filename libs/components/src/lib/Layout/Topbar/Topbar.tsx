import { FiBell, FiSearch } from 'react-icons/fi';
import { getCookie } from 'cookies-next';

const Topbar = () => {
  const profileUrl = getCookie('userProfile') as string;
  return (
    <div className="w-full pt-4 flex items-center justify-between bg-white sticky top-0">
      <div className="relative flex items-center">
        <FiSearch className="text-gray-500 absolute left-3" />
        <input
          type="search"
          name=""
          id=""
          placeholder="Search"
          className="border-[1px] border-gray-200 rounded-full h-10 pl-10 font-poppins focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex items-center space-x-3">
        <FiBell className="text-gray-300 text-3xl transform rotate-[20deg] hover:rotate-0 transition-all ease-linear duration-200 hover:text-blue-500 cursor-pointer" />
        <img
          src={profileUrl.replace(
            'practitionerbucket1.practitionerbucket1',
            'practitionerbucket1'
          )}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Topbar;
