import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Overview', path: '/admin' },
    { name: 'College Management', path: '/admin/colleges' },
    { name: 'Scoring & Evaluation', path: '/admin/scoring' },
    { name: 'Reports', path: '/admin/reports' },
    { name: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <h1 className="text-xl font-bold text-accent">HSHEC Admin</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center p-3 rounded-lg hover:bg-slate-800 transition-colors ${
                  location.pathname === link.path ? 'bg-accent text-white' : 'text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
            A
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-slate-500">admin@hshec.gov.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
