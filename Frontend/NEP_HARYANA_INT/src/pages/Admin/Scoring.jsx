import { useState, useEffect } from 'react';
import { 
  Award, 
  BarChart3, 
  Check, 
  ChevronRight, 
  Plus, 
  RotateCcw, 
  TrendingUp, 
  Users, 
  X, 
  Info,
  Scale
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { fetchAdminInstitutions } from '../../api/admin';
import { PARAMETERS } from '../../utils/mockData';

const Scoring = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchAdminInstitutions();
        setColleges(res.institutions || []);
      } catch (err) {
        console.error("Failed to load institutions for scoring:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else {
      if (selectedIds.length >= 3) {
        alert("You can compare up to 3 colleges at a time.");
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-fadeIn">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">Loading Appraisal Scores...</p>
      </div>
    );
  }

  // Fallback: If no data is available
  if (colleges.length === 0) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Scoring Analysis & Comparison</h1>
            <p className="text-xs text-slate-400 font-medium">Compare institutional scores parameter-wise.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center space-y-4 max-w-2xl mx-auto mt-12">
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-100">
            <Info className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800">No Institutional Data Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              There are currently no college submissions available in the database. When colleges submit their self-appraisal forms, their parameter-wise scoring logs will appear here for comparison and audit.
            </p>
          </div>
          <div className="pt-2">
            <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Waiting for Submissions
            </span>
          </div>
        </div>
      </div>
    );
  }

  const selectedColleges = colleges.filter(c => selectedIds.includes(c.id));

  // Prepare radar/bar data for parameter comparison
  const comparisonData = PARAMETERS.map(p => {
    const item = {
      paramCode: `P-${p.num}`,
      paramName: p.name,
      maxScore: p.max
    };
    selectedColleges.forEach((col, idx) => {
      item[`college_${idx}`] = col.scores[p.id] || 0;
      item[`collegeName_${idx}`] = col.name;
    });
    return item;
  });

  const COLORS = ['#1D4ED8', '#7C3AED', '#0F766E'];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Titleblock */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Scoring Analysis & Comparison</h1>
          <p className="text-xs text-slate-400 font-medium">Select up to 3 institutions to evaluate parameter-wise points and side-by-side grades.</p>
        </div>
        {selectedIds.length > 0 && (
          <button
            onClick={handleClearSelection}
            className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100/80 border border-red-100 py-2 px-3.5 rounded-xl cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Comparison</span>
          </button>
        )}
      </div>

      {/* Selectors grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Roster list for selection */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col max-h-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Institutions Roster</h3>
            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
              {selectedIds.length}/3 Selected
            </span>
          </div>

          <div className="overflow-y-auto space-y-2 flex-1 pr-1">
            {colleges.map((col) => {
              const isSelected = selectedIds.includes(col.id);
              const score = col.score || 0;
              const grade = col.award_category || "No Award";
              return (
                <div 
                  key={col.id}
                  onClick={() => handleToggleSelect(col.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex justify-between items-center gap-3 ${
                    isSelected 
                      ? 'bg-blue-50/60 border-blue-300 shadow-sm shadow-blue-500/5' 
                      : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/60 hover:border-slate-300'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-bold text-slate-700 truncate" title={col.name}>{col.name}</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[9px] bg-slate-200 text-slate-500 font-black px-1 py-0.2 rounded font-mono uppercase">{col.aishe}</span>
                      <span className="text-[9px] text-slate-400 font-bold">{score} Marks</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center space-x-2">
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                      grade === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                      grade === 'Gold' ? 'bg-amber-100 text-amber-700' :
                      grade === 'Silver' ? 'bg-slate-100 text-slate-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {grade}
                    </span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected side-by-side profile cards */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4">Comparison Cohort</h3>
            {selectedColleges.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <Scale className="w-12 h-12 text-slate-300 animate-pulse" />
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Select institutions from the list to compare details.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedColleges.map((col, idx) => {
                  const score = col.score || 0;
                  const grade = col.award_category || "No Award";
                  return (
                    <div key={col.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col justify-between space-y-4 relative">
                      <button 
                        onClick={() => handleToggleSelect(col.id)}
                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-200 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <div className="space-y-1">
                        <span className="w-2.5 h-2.5 rounded-full inline-block mb-1" style={{ backgroundColor: COLORS[idx] }}></span>
                        <h4 className="text-xs font-extrabold text-slate-800 line-clamp-2 pr-4">{col.name}</h4>
                        <span className="text-[9px] text-slate-400 font-semibold uppercase font-mono">AISHE: {col.aishe}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200/60 flex justify-between items-end">
                        <div>
                          <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest">Total score</span>
                          <span className="text-xl font-black text-slate-800 leading-none">{score} <span className="text-[10px] text-slate-400 font-medium">/100</span></span>
                        </div>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${
                          grade === 'Platinum' ? 'bg-purple-100 border-purple-200 text-purple-700' :
                          grade === 'Gold' ? 'bg-amber-100 border-amber-200 text-amber-700' :
                          grade === 'Silver' ? 'bg-slate-100 border-slate-200 text-slate-600' :
                          'bg-red-100 border-red-200 text-red-600'
                        }`}>
                          {grade}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {selectedColleges.length > 0 && (
            <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-semibold flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              <span>Scroll down to see the parameter breakdown comparison graphs.</span>
            </div>
          )}
        </div>

      </div>

      {/* Graphs Comparison section */}
      {selectedColleges.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Radar Chart (visual layout) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Score Footprint (Radar)</h3>
              <p className="text-xs text-slate-400 font-medium mb-4">Comparing multi-dimensional performance patterns across all parameters.</p>
            </div>
            <div className="h-80 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={comparisonData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="paramCode" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 8]} />
                  {selectedColleges.map((col, idx) => (
                    <Radar
                      key={col.id}
                      name={col.name.length > 25 ? col.name.substring(0, 25) + '...' : col.name}
                      dataKey={`college_${idx}`}
                      stroke={COLORS[idx]}
                      fill={COLORS[idx]}
                      fillOpacity={0.15}
                    />
                  ))}
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart parameter score breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Parameter Score Comparison</h3>
              <p className="text-xs text-slate-400 font-medium mb-4">Detailed side-by-side points breakdown for active evaluation markers.</p>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="paramCode" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                  {selectedColleges.map((col, idx) => (
                    <Bar
                      key={col.id}
                      name={col.name.length > 25 ? col.name.substring(0, 25) + '...' : col.name}
                      dataKey={`college_${idx}`}
                      fill={COLORS[idx]}
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Scoring;
