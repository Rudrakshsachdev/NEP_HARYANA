import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = ({ title }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Header title={title} />
      <div className="pl-20 transition-all duration-300 ease-in-out">
        <main className="pt-16 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
