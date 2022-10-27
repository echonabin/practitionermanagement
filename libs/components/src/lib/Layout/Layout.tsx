import Sidebar from './Sidebar';
import Topbar from './Topbar/Topbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full px-9 py-2 space-y-8 pl-[24%]">
        <Topbar />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
