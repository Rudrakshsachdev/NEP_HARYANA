import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const AdminLayout = ({ title }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header title={title} />
      <div className="pl-20 transition-all duration-300 ease-in-out flex-1 flex flex-col">
        <main className="pt-16 p-6 flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
