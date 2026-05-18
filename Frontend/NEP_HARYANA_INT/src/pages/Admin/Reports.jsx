const Reports = () => {
  const handleDownload = (type) => {
    alert(`Downloading ${type} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Report Generation Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Generate Reports</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Date Range</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md">
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Classification</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md">
              <option>All</option>
              <option>Platinum</option>
              <option>Gold</option>
              <option>Silver</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">District</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md">
              <option>All</option>
              <option>Ambala</option>
              <option>Karnal</option>
              <option>Kurukshetra</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => handleDownload('Summary')}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              Generate Summary
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => handleDownload('Excel')}
            className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          >
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Export to Excel
          </button>
          <button
            onClick={() => handleDownload('PDF')}
            className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          >
            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Export to PDF
          </button>
        </div>
      </div>

      {/* Individual Reports */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Individual College Reports</h3>
        <div className="overflow-hidden border border-slate-200 rounded-md">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">College</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Last Submission</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Govt College, Ambala</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">2026-05-15</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-accent hover:underline cursor-pointer" onClick={() => handleDownload('Individual')}>Download</td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">RK College, Kurukshetra</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">2026-05-14</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-accent hover:underline cursor-pointer" onClick={() => handleDownload('Individual')}>Download</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
