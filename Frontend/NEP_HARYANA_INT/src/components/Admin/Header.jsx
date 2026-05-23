import { Bell, Calendar, RotateCcw } from 'lucide-react';
import { resetDatabase } from '../../utils/mockData';

const Header = ({ title }) => {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the evaluation database to defaults? This will erase all approved statuses and customized scores.")) {
      resetDatabase();
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-10 shadow-sm shadow-slate-100">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
      </div>

      <div className="flex items-center space-x-6">
        {/* Date Display */}
        <div className="hidden md:flex items-center text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/60 rounded-full py-1.5 px-3.5 space-x-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>{today}</span>
        </div>

        {/* Reset Database for testing */}
        <button
          onClick={handleReset}
          title="Reset Demo Database"
          className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/50 hover:border-amber-300 rounded-lg py-1.5 px-3 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo DB</span>
        </button>

        {/* Notification bell */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/40">
          <span className="sr-only">Notifications</span>
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* User profile dropdown */}
        <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
          <div className="w-9 h-9 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-[#1D4ED8] font-bold text-sm">
            RK
          </div>
          <div className="hidden lg:block text-left">
            <span className="block text-xs font-bold text-slate-800 leading-tight">Dr. Ramesh Kumar</span>
            <span className="block text-[10px] text-slate-400 font-semibold leading-none">Chief Evaluator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
