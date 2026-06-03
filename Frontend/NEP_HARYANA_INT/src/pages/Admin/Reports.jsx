import { useState, useEffect } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  FileText, 
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { PARAMETERS } from '../../utils/mockData';
import { fetchAdminInstitutions } from '../../api/admin';

const Reports = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering & Search state
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchAdminInstitutions();
        setColleges(res.institutions || []);
      } catch (err) {
        console.error("Failed to load reports data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Extract unique districts for filters
  const districts = ['all', ...new Set(colleges.map(c => c.district))].sort();

  // Reset Filters
  const handleReset = () => {
    setSearch('');
    setSelectedType('all');
    setSelectedDistrict('all');
    setSelectedStatus('all');
  };

  // Filtered dataset
  const filteredColleges = colleges.filter(c => {
    const totalScore = c.score || 0;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.aishe.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'all' ? true : c.type === selectedType;
    const matchesDistrict = selectedDistrict === 'all' ? true : c.district === selectedDistrict;
    const matchesStatus = selectedStatus === 'all' ? true : c.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesDistrict && matchesStatus;
  });

  // Client-Side CSV Exporter
  const handleExportCSV = () => {
    if (filteredColleges.length === 0) {
      alert("No data available to export.");
      return;
    }

    // Build Headers
    const headers = [
      'AISHE Code',
      'Institution Name',
      'Management Type',
      'District',
      'Award Status',
      'Total Marks (100)',
      'Grade Awarded',
      ...PARAMETERS.map(p => `P-${p.num} (${p.max})`)
    ];

    // Build Rows
    const rows = filteredColleges.map(c => {
      const totalScore = c.score || 0;
      const grade = c.award_category || 'No Award';
      
      const paramScores = PARAMETERS.map(p => c.scores[p.id] || 0);

      // Escape fields with commas or quotes
      const nameEscaped = `"${c.name.replace(/"/g, '""')}"`;
      
      return [
        c.aishe,
        nameEscaped,
        c.type,
        c.district,
        c.status,
        totalScore,
        grade,
        ...paramScores
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NEP_Excellence_Awards_Master_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  // PDF Export via Browser Print Setup
  const handleExportPDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">Loading Reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn print:bg-white print:p-0 print:m-0">
      
      {/* Page Title & Export Operations */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm gap-4 print:hidden">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Master Ledger & Reporting</h1>
          <p className="text-xs text-slate-400 font-medium">Export raw audit parameters and marks for state academic committees.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm cursor-pointer transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV Sheet</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md shadow-blue-500/10 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Generate PDF Audit Ledger</span>
          </button>
        </div>
      </div>

      {/* Query Filter panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 print:hidden">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-4.5 h-4.5 text-slate-500" />
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Audit Query Filters</h3>
          </div>
          <button 
            onClick={handleReset}
            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-red-500 transition-colors font-bold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search college, AISHE..."
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1D4ED8] placeholder-slate-400 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Type filter */}
          <div>
            <select
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 px-3.5 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1D4ED8] cursor-pointer"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Management Type: All</option>
              <option value="Govt">Govt Managed</option>
              <option value="Aided">Govt Aided</option>
              <option value="Self-Financing">Self-Financing</option>
            </select>
          </div>

          {/* District filter */}
          <div>
            <select
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 px-3.5 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1D4ED8] cursor-pointer capitalize"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="all">District: All Locations</option>
              {districts.filter(d => d !== 'all').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div>
            <select
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-2 px-3.5 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1D4ED8] cursor-pointer"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Appraisal Status: All</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Approved">Approved</option>
              <option value="Sent Back">Sent Back</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Spreadsheet grid */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 overflow-hidden print:border-none print:shadow-none print:p-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
            Ledger View ({filteredColleges.length} Records)
          </h3>
          <span className="text-[10px] text-slate-400 font-bold print:hidden">Horizontal scroll to view all 22 parameters</span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="divide-x divide-slate-200">
                <th scope="col" className="sticky left-0 bg-slate-50 z-10 px-4 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest min-w-[200px] border-r border-slate-200 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                  Institution Name
                </th>
                <th scope="col" className="px-4 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest shrink-0">AISHE</th>
                <th scope="col" className="px-4 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest">Type</th>
                <th scope="col" className="px-4 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest">District</th>
                <th scope="col" className="px-4 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest">Total Score</th>
                <th scope="col" className="px-4 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-widest">Award Grade</th>
                {PARAMETERS.map(p => (
                  <th key={p.id} scope="col" className="px-3 py-3 text-center text-[9px] font-black text-slate-600 uppercase tracking-wider shrink-0 min-w-[50px]" title={p.name}>
                    P-{p.num} <span className="text-[7px] text-slate-400 block font-normal">max {p.max}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 text-xs">
              {filteredColleges.map((c) => {
                const totalScore = c.score || 0;
                const grade = c.classification || { name: c.award_category || "No Award", bg: "bg-red-100 border-red-200 text-red-700" };
                
                return (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors divide-x divide-slate-100">
                    <td className="sticky left-0 bg-white z-10 px-4 py-3 font-bold text-slate-800 border-r border-slate-200 shadow-[2px_0_5px_rgba(0,0,0,0.05)] max-w-[200px] truncate" title={c.name}>
                      {c.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500 font-medium">{c.aishe}</td>
                    <td className="px-4 py-3 font-bold text-slate-600">{c.type}</td>
                    <td className="px-4 py-3 text-slate-600 font-medium">{c.district}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        c.status === 'Approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                        c.status === 'Pending Review' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                        c.status === 'Sent Back' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                        'bg-red-50 border-red-100 text-red-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-extrabold text-slate-800">{totalScore}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${grade.bg}`}>
                        {grade.name}
                      </span>
                    </td>
                    {PARAMETERS.map(p => {
                      const score = c.scores[p.id] || 0;
                      return (
                        <td key={p.id} className="px-3 py-3 text-center font-bold text-slate-500">
                          {score}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default Reports;
