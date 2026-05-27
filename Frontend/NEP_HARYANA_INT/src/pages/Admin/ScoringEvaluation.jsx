import { useState, useEffect } from 'react';
import { 
  Award, 
  School, 
  Plus, 
  Trash2, 
  FileText, 
  ArrowRightLeft,
  ChevronDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { 
  getColleges, 
  calculateTotalScore, 
  getClassification, 
  PARAMETERS,
  CATEGORIES
} from '../../utils/mockData';

const ScoringEvaluation = () => {
  const [allColleges, setAllColleges] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showSelectorDropdown, setShowSelectorDropdown] = useState(null); // index to insert

  useEffect(() => {
    const list = getColleges() || [];
    setAllColleges(list);
    // Pre-populate with first 3 colleges for immediate visual delight
    if (list.length >= 3) {
      setSelectedIds([list[0].id, list[1].id, list[2].id]);
    } else if (list.length > 0) {
      setSelectedIds(list.map(c => c.id));
    }
  }, []);

  // Filter to currently compared colleges
  const selectedColleges = selectedIds
    .map(id => allColleges.find(c => c.id === id))
    .filter(Boolean);

  // Add a college to comparison list
  const handleSelectCollege = (index, newId) => {
    const nextSelected = [...selectedIds];
    nextSelected[index] = newId;
    
    // Filter duplicates
    const uniqueSelected = [...new Set(nextSelected)];
    setSelectedIds(uniqueSelected);
    setShowSelectorDropdown(null);
  };

  // Remove a college from comparison list
  const handleRemoveCollege = (idToRemove) => {
    setSelectedIds(prev => prev.filter(id => id !== idToRemove));
  };

  // Trigger browser printing for PDF saving
  const handlePrint = () => {
    window.print();
  };

  // Build Category Chart Data (Categories as subjects, scores of selected colleges as values)
  const chartData = Object.keys(CATEGORIES).map(catName => {
    const categoryInfo = CATEGORIES[catName];
    const row = {
      subject: catName,
      max: categoryInfo.max
    };
    selectedColleges.forEach(c => {
      let scoreInCat = 0;
      categoryInfo.params.forEach(paramId => {
        scoreInCat += c.scores[paramId] || 0;
      });
      row[c.name] = scoreInCat;
    });
    return row;
  });

  // Calculate highest and lowest for each parameter to color code the comparison table
  const getCellHighlight = (paramId, score, colIndex) => {
    if (selectedColleges.length < 2) return ''; // Only color code if comparing 2 or more
    
    const scores = selectedColleges.map(c => Number(c.scores[paramId]) || 0);
    const maxVal = Math.max(...scores);
    const minVal = Math.min(...scores);
    
    // If all scores are equal, don't highlight
    if (maxVal === minVal) return 'bg-slate-50 text-slate-700';

    if (score === maxVal) {
      return 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-100';
    }
    if (score === minVal) {
      return 'bg-red-50 text-red-700 border border-red-100';
    }
    return 'bg-slate-50/50 text-slate-600';
  };

  const RADAR_COLORS = ['#1D4ED8', '#0F766E', '#7C3AED'];

  return (
    <div className="space-y-8 animate-fadeIn print:bg-white print:p-0 print:m-0 print:space-y-4">
      {/* Title section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm gap-4 print:hidden">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Scoring Analysis & Benchmarking</h1>
          <p className="text-xs text-slate-400 font-medium">Select up to 3 colleges to run a side-by-side comparative evaluation.</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md shadow-blue-500/10 cursor-pointer transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>Export Comparison PDF</span>
        </button>
      </div>

      {/* Institutional Selector Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3">
        {[0, 1, 2].map((slotIndex) => {
          const col = selectedColleges[slotIndex];
          const availableToCompare = allColleges.filter(
            c => !selectedIds.includes(c.id) || (col && c.id === col.id)
          );

          return (
            <div key={slotIndex} className="relative bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between min-h-[140px] print:border print:shadow-none">
              {col ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-extrabold uppercase bg-blue-50 border border-blue-100 text-[#1D4ED8] px-2 py-0.5 rounded">
                        Bench slot {slotIndex + 1}
                      </span>
                      <button
                        onClick={() => handleRemoveCollege(col.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer print:hidden"
                        title="Remove institution"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-xs font-bold text-slate-800 truncate" title={col.name}>{col.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold">AISHE: {col.aishe}</p>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total score</span>
                      <span className="text-lg font-black text-slate-800">{calculateTotalScore(col.scores)} / 100</span>
                    </div>
                    <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-sm ${getClassification(calculateTotalScore(col.scores)).bg}`}>
                      {getClassification(calculateTotalScore(col.scores)).name}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 py-4 print:hidden">
                  <button
                    onClick={() => setShowSelectorDropdown(slotIndex)}
                    className="flex flex-col items-center justify-center space-y-2 text-slate-400 hover:text-[#1D4ED8] group cursor-pointer transition-colors"
                  >
                    <div className="p-3 bg-slate-50 border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 rounded-2xl transition-all">
                      <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#1D4ED8]">Add Institution</span>
                  </button>
                </div>
              )}

              {/* Selection dropdown layer */}
              {showSelectorDropdown === slotIndex && (
                <div className="absolute inset-0 bg-white rounded-2xl p-4 z-10 border border-blue-200 shadow-lg flex flex-col">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-black text-slate-800">Select College</span>
                    <button 
                      onClick={() => setShowSelectorDropdown(null)}
                      className="text-[10px] font-bold text-red-500 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                    {availableToCompare.map(avail => (
                      <button
                        key={avail.id}
                        onClick={() => handleSelectCollege(slotIndex, avail.id)}
                        className="w-full text-left text-[11px] font-semibold text-slate-600 hover:text-[#1D4ED8] hover:bg-blue-50 p-2 rounded-lg transition-colors truncate"
                      >
                        {avail.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedColleges.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Bar Chart (takes 1 col) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col min-h-[350px] print:break-inside-avoid print:shadow-none print:border">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <ArrowRightLeft className="w-4.5 h-4.5 text-slate-500" />
                <span>Category Benchmarks</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-bold mb-4">Category scores comparison across compared institutions</p>
            </div>
            
            <div className="flex-1 w-full min-h-[340px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                  />
                  <YAxis 
                    domain={[0, 40]}
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value, name, props) => [`${value} / ${props.payload.max} pts`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '15px', fontWeight: 600, color: '#475569' }} iconSize={10} />
                  {selectedColleges.map((col, idx) => (
                    <Bar
                      key={col.id}
                      name={col.name.substring(0, 15) + '...'}
                      dataKey={col.name}
                      fill={RADAR_COLORS[idx]}
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comparison Matrix Table (takes 2 cols) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm lg:col-span-2 print:shadow-none print:border">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Award className="w-4.5 h-4.5 text-slate-500" />
              <span>Comparative Scores Matrix</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-bold mb-4">
              Detailed metrics grid. Relative highlights: <span className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-black border border-emerald-100">Green = Highest Score</span> and <span className="text-red-700 bg-red-50 px-1 py-0.5 rounded font-black border border-red-100">Red = Lowest Score</span>.
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Parameter Name (Max Marks)
                    </th>
                    {selectedColleges.map(c => (
                      <th key={c.id} scope="col" className="px-4 py-3 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider max-w-[150px] truncate" title={c.name}>
                        {c.name.length > 25 ? c.name.substring(0, 25) + '...' : c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 text-xs">
                  {PARAMETERS.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-700 flex items-center gap-1.5 leading-tight">
                          <span className="text-[8px] bg-slate-200 text-slate-500 font-black px-1 py-0.5 rounded uppercase shrink-0">P-{p.num}</span>
                          <span className="truncate max-w-[280px]" title={p.name}>{p.name}</span>
                          <span className="text-[9px] text-slate-400">({p.max})</span>
                        </div>
                      </td>
                      {selectedColleges.map((c, idx) => {
                        const score = c.scores[p.id] || 0;
                        return (
                          <td key={c.id} className={`px-4 py-3 font-extrabold ${getCellHighlight(p.id, score, idx)}`}>
                            {score}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {/* Summary score row */}
                  <tr className="bg-slate-50/80 font-black text-slate-800">
                    <td className="px-4 py-4 text-[10px] uppercase tracking-wider">
                      Aggregate Evaluated Score
                    </td>
                    {selectedColleges.map(c => (
                      <td key={c.id} className="px-4 py-4 text-sm font-extrabold text-[#1D4ED8]">
                        {calculateTotalScore(c.scores)} / 100
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center space-y-3">
          <ArrowRightLeft className="w-10 h-10 text-slate-300" />
          <p className="text-sm font-bold text-slate-500">Please select institutions in comparison slots to visualize dashboard benchmarks.</p>
        </div>
      )}
    </div>
  );
};

export default ScoringEvaluation;
