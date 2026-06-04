import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  School,
  Award,
  FileSpreadsheet,
  Settings as SettingsIcon,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const links = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Review Applications', path: '/admin/reviews', icon: UserCheck },
    { name: 'College List', path: '/admin/colleges', icon: School },
    { name: 'Scoring & Comparison', path: '/admin/scoring', icon: Award },
    { name: 'Reports', path: '/admin/reports', icon: FileSpreadsheet },
    { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <div className="peer fixed inset-y-0 left-0 w-20 hover:w-64 bg-[#1E3A5F] text-white flex flex-col z-20 shadow-xl border-r border-slate-700/30 transition-all duration-300 ease-in-out group overflow-hidden">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 border-b border-slate-700/50 bg-[#172e4c]">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-[#1D4ED8] text-white shadow-md shadow-blue-500/20 shrink-0">
            <Award className="w-6 h-6 animate-pulse" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <h1 className="text-sm font-bold tracking-wider uppercase leading-none">HSHEC NEP</h1>
            <span className="text-[10px] text-blue-300 font-semibold uppercase tracking-widest">Excellence Awards</span>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5">
        <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Evaluation Console
        </span>
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path ||
              (link.path !== '/admin' && location.pathname.startsWith(link.path));
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                      ? 'bg-[#1D4ED8] text-white shadow-lg shadow-blue-600/30 font-semibold'
                      : 'text-slate-300 hover:bg-[#1D4ED8] hover:text-white hover:shadow-lg hover:shadow-blue-600/30'
                    }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`} />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {link.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Admin Profile Footer */}
      <div className="p-4 border-t border-slate-700/50 bg-[#172e4c]/50">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1D4ED8] to-[#3b82f6] flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 shrink-0">
            <UserCheck className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <p className="text-xs font-semibold text-white truncate">{user?.full_name || "Admin Officer"}</p>
            <p className="text-[10px] text-blue-300 font-medium truncate">{user?.role === "admin" ? "DHE Admin" : "Evaluator"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20 cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Lock Console
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
