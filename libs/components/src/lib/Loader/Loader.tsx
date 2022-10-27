import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[50vh]">
      <InfinitySpin width="200" />
      <p className="text-xl font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
