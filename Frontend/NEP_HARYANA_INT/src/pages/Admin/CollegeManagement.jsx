import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CollegeManagement = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');

  // Mock Data
  const colleges = [
    { id: 1, name: 'Govt College, Ambala', aishe: 'C-12345', type: 'Govt', district: 'Ambala', status: 'Submitted', score: 85, classification: 'Platinum' },
    { id: 2, name: 'RK College, Kurukshetra', aishe: 'C-12346', type: 'Private', district: 'Kurukshetra', status: 'Approved', score: 72, classification: 'Gold' },
    { id: 3, name: 'DAV College, Karnal', aishe: 'C-12347', type: 'Aided', district: 'Karnal', status: 'Under Review', score: 90, classification: 'Platinum' },
    { id: 4, name: 'MLN College, Yamunanagar', aishe: 'C-12348', type: 'Govt', district: 'Yamunanagar', status: 'Rejected', score: 45, classification: 'Silver' },
    { id: 5, name: 'Govt College, Panchkula', aishe: 'C-12349', type: 'Govt', district: 'Panchkula', status: 'Submitted', score: 65, classification: 'Silver' },
  ];

  const filteredColleges = colleges.filter((college) => {
    return (
      (search === '' || college.name.toLowerCase().includes(search.toLowerCase()) || college.aishe.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === '' || college.status === statusFilter) &&
      (classFilter === '' || college.classification === classFilter)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              id="search"
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
              placeholder="Search by name or AISHE code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option value="">All Classifications</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">College Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">AISHE Code</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">District</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Score</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Classification</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredColleges.map((college) => (
                <tr
                  key={college.id}
                  className="hover:bg-slate-50 cursor-pointer"
                  onClick={() => navigate(`/admin/colleges/${college.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{college.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{college.aishe}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{college.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{college.district}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(college.status)}`}>
                      {college.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{college.score}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getClassificationColor(college.classification)}`}>
                      {college.classification}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollegeManagement;
