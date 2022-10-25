import Image from 'next/image';
import logo from 'public/assets/logo-image.png';
import { IconType } from 'react-icons';
import { routes } from './routes';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  const isActive = (route: string) => {
    if (route === router.pathname) {
      return true;
    }
    return false;
  };
  return (
    <div className="w-1/5 bg-white shadow-xl border-r-[1px] max-h-screen min-h-screen px-6 py-6">
      <Image alt="logo" className="w-6" src={logo} />
      <div className="mt-8">
        <p className="text-gray-500 font-poppins uppercase">Medicine</p>
        <div className="pt-5 space-y-4">
          {routes.map((route) => {
            const Icon = route.icon as IconType;
            return (
              <div
                className={`flex items-center space-x-2 cursor-pointer ${
                  isActive(route.path)
                    ? 'text-blue-500 hover:text-blue-400'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
                onClick={() => router.push(route.path)}
              >
                <Icon />
                <span className="font-poppins font-medium">{route.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
