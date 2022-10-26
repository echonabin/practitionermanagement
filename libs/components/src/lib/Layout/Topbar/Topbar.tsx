import { FiBell, FiSearch } from 'react-icons/fi';

const Topbar = () => {
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
          src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Topbar;
