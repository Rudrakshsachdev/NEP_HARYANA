const ScoringEvaluation = () => {
  // Mock Data
  const categories = [
    { name: 'Academic Performance', score: 80, max: 100 },
    { name: 'Faculty Strength', score: 60, max: 100 },
    { name: 'Research Activities', score: 45, max: 100 },
    { name: 'Infrastructure', score: 90, max: 100 },
    { name: 'NEP Implementation', score: 75, max: 100 },
  ];

  const topColleges = [
    { rank: 1, name: 'DAV College, Karnal', score: 90 },
    { rank: 2, name: 'Govt College, Ambala', score: 85 },
    { rank: 3, name: 'RK College, Kurukshetra', score: 72 },
    { rank: 4, name: 'Govt College, Panchkula', score: 65 },
    { rank: 5, name: 'MLN College, Yamunanagar', score: 45 },
  ];

  const comparison = [
    { name: 'DAV College', academic: 90, faculty: 80, research: 70, infra: 100, nep: 90 },
    { name: 'Govt College, Ambala', academic: 80, faculty: 70, research: 60, infra: 90, nep: 80 },
    { name: 'RK College', academic: 70, faculty: 60, research: 50, infra: 80, nep: 70 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Bars */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Category-wise Score Breakdown</h3>
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{cat.name}</span>
                  <span className="text-sm font-medium text-slate-500">{cat.score}/{cat.max}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-accent h-2.5 rounded-full"
                    style={{ width: `${(cat.score / cat.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Performing */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Performing Institutions</h3>
          <div className="flow-root">
            <ul className="divide-y divide-slate-200">
              {topColleges.map((college) => (
                <li key={college.rank} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                      college.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                      college.rank === 2 ? 'bg-slate-200 text-slate-800' :
                      college.rank === 3 ? 'bg-orange-100 text-orange-800' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {college.rank}
                    </span>
                    <span className="text-sm font-medium text-slate-900">{college.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-accent">{college.score} pts</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Side-by-Side Comparison</h3>
        <div className="overflow-hidden border border-slate-200 rounded-md">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">College</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Academic</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Faculty</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Research</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Infra</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">NEP</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {comparison.map((comp, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{comp.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{comp.academic}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{comp.faculty}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{comp.research}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{comp.infra}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{comp.nep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScoringEvaluation;
