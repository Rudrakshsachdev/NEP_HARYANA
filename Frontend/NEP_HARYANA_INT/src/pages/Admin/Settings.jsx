import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Calendar, 
  UserPlus, 
  Sliders, 
  ShieldCheck, 
  Save, 
  Trash2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { PARAMETERS } from '../../utils/mockData';

const Settings = () => {
  // Evaluation Window dates
  const [startDate, setStartDate] = useState('2026-06-01');
  const [endDate, setEndDate] = useState('2026-07-31');

  // Account Management state
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Dr. Ramesh Kumar', role: 'State Coordinator', dept: 'Higher Education Dept', status: 'Active' },
    { id: 2, name: 'Dr. Sunita Sen', role: 'Academic Auditor', dept: 'HSHEC Committee', status: 'Active' },
    { id: 3, name: 'Prof. Anil Gupta', role: 'NEP Policy Analyst', dept: 'Curriculum Council', status: 'Inactive' }
  ]);

  // Modal to add account
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAccName, setNewAccName] = useState('');
  const [newAccRole, setNewAccRole] = useState('Academic Auditor');
  const [newAccDept, setNewAccDept] = useState('');

  useEffect(() => {
    // Retrieve configuration from LocalStorage if preset
    const savedWindow = localStorage.getItem('nep_awards_eval_window');
    if (savedWindow) {
      try {
        const parsed = JSON.parse(savedWindow);
        if (parsed.start) setStartDate(parsed.start);
        if (parsed.end) setEndDate(parsed.end);
      } catch (e) {
        console.error(e);
      }
    }

    const savedAccounts = localStorage.getItem('nep_awards_accounts');
    if (savedAccounts) {
      try {
        setAccounts(JSON.parse(savedAccounts));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSaveConfig = () => {
    localStorage.setItem('nep_awards_eval_window', JSON.stringify({
      start: startDate,
      end: endDate
    }));
    localStorage.setItem('nep_awards_accounts', JSON.stringify(accounts));
    alert("System settings successfully committed to local registry.");
  };

  const handleAddAccount = (e) => {
    e.preventDefault();
    if (!newAccName.trim() || !newAccDept.trim()) {
      alert("Please fill out all credentials.");
      return;
    }

    const newAcc = {
      id: Date.now(),
      name: newAccName,
      role: newAccRole,
      dept: newAccDept,
      status: 'Active'
    };

    const nextAccounts = [...accounts, newAcc];
    setAccounts(nextAccounts);
    localStorage.setItem('nep_awards_accounts', JSON.stringify(nextAccounts));

    // Reset inputs
    setNewAccName('');
    setNewAccDept('');
    setShowAddModal(false);
  };

  const handleDeleteAccount = (id) => {
    if (confirm("Are you sure you want to deactivate and remove this administrative role?")) {
      const nextAccounts = accounts.filter(a => a.id !== id);
      setAccounts(nextAccounts);
      localStorage.setItem('nep_awards_accounts', JSON.stringify(nextAccounts));
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">System Settings & Configurations</h1>
          <p className="text-xs text-slate-400 font-medium">Control appraisal scheduling, evaluator rosters, and scoring criteria frameworks.</p>
        </div>
        <button
          onClick={handleSaveConfig}
          className="flex items-center gap-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md shadow-blue-500/10 cursor-pointer transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Configurations</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Scheduling & Account Controls) - takes 2 cols */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Scheduling Window Dates */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
              <Calendar className="w-5 h-5 text-slate-500" />
              <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider">Evaluation Window Schedule</h3>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-amber-900">Appraisal Scheduling Controls</h4>
                <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                  The evaluation window controls when colleges in Haryana can submit self-assessment data. Closing the window locks submissions, moving the workflow into Council verification mode.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Submission Window Starts</label>
                <input
                  type="date"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 px-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1D4ED8]"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Submission Window Ends</label>
                <input
                  type="date"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 px-3.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1D4ED8]"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Account Roster Console */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-slate-500" />
                <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider">Evaluation Council Roster</h3>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-extrabold uppercase py-2 px-3 rounded-lg cursor-pointer transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Role</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                    <th scope="col" className="px-4 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Auditing Role</th>
                    <th scope="col" className="px-4 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Department</th>
                    <th scope="col" className="px-4 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th scope="col" className="px-4 py-3 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 text-xs">
                  {accounts.map(acc => (
                    <tr key={acc.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-800">{acc.name}</td>
                      <td className="px-4 py-3 font-semibold text-slate-600">{acc.role}</td>
                      <td className="px-4 py-3 text-slate-500 font-medium">{acc.dept}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                          acc.status === 'Active' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-100 border-slate-200 text-slate-400'
                        }`}>
                          {acc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDeleteAccount(acc.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column (Parameters List Framework) - takes 1 col */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 h-fit">
          <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
            <Sliders className="w-5 h-5 text-slate-500" />
            <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider">Evaluation Weights</h3>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl flex items-start gap-2.5">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
              Below are the active parameters used in the Excel scorecard. Scores are evaluated against these max caps.
            </p>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {PARAMETERS.map(p => (
              <div key={p.id} className="p-3 bg-slate-50/50 hover:bg-slate-50 rounded-xl border border-slate-200/50 flex justify-between items-center gap-3 transition-colors">
                <div className="space-y-0.5 truncate">
                  <span className="text-[8px] bg-slate-200 text-slate-500 font-black px-1 py-0.5 rounded mr-1.5 uppercase">P-{p.num}</span>
                  <span className="text-xs font-bold text-slate-700 truncate inline-block max-w-[150px]" title={p.name}>{p.name}</span>
                </div>
                <span className="text-xs font-black text-slate-800 bg-white border border-slate-200 px-2 py-1 rounded shrink-0">{p.max} Pts</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddAccount} className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-zoomIn">
            <div className="px-6 py-4 bg-[#1E3A5F] text-white flex justify-between items-center">
              <h3 className="text-sm font-bold tracking-tight">Create Evaluator Account</h3>
              <button 
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-xs font-bold hover:text-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Evaluator Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 px-3.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1D4ED8]"
                  placeholder="e.g. Dr. Harpreet Singh"
                  value={newAccName}
                  onChange={(e) => setNewAccName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Designated Auditing Role</label>
                <select
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 px-3.5 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1D4ED8] cursor-pointer"
                  value={newAccRole}
                  onChange={(e) => setNewAccRole(e.target.value)}
                >
                  <option value="Academic Auditor">Academic Auditor</option>
                  <option value="State Coordinator">State Coordinator</option>
                  <option value="NEP Policy Analyst">NEP Policy Analyst</option>
                  <option value="Chief Evaluation Officer">Chief Evaluation Officer</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Department / Council</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 px-3.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1D4ED8]"
                  placeholder="e.g. HSHEC Audit Board"
                  value={newAccDept}
                  onChange={(e) => setNewAccDept(e.target.value)}
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <button 
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default Settings;
