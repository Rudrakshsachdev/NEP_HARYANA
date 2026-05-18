import { useState } from 'react';

const Settings = () => {
  const [openDate, setOpenDate] = useState('2026-05-01');
  const [closeDate, setCloseDate] = useState('2026-06-01');

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Deadlines */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Submission Deadlines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Opening Date</label>
            <input
              type="date"
              className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
              value={openDate}
              onChange={(e) => setOpenDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Closing Date</label>
            <input
              type="date"
              className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
              value={closeDate}
              onChange={(e) => setCloseDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Evaluation Criteria */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Manage Evaluation Criteria</h3>
        <p className="text-sm text-slate-500 mb-4">Define indicators and maximum marks for evaluation.</p>
        
        <div className="overflow-hidden border border-slate-200 rounded-md">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Indicator Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Max Marks</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Internship Programs</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">10</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-accent hover:underline cursor-pointer">Edit</td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Research Publications</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">15</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-accent hover:underline cursor-pointer">Edit</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
          Add New Indicator
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
        >
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
