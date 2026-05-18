import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CollegeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Submitted');
  const [remarks, setRemarks] = useState('');

  // Mock Data for a specific college
  const college = {
    id: id,
    name: 'Govt College, Ambala',
    aishe: 'C-12345',
    type: 'Govt',
    district: 'Ambala',
    score: 85,
    classification: 'Platinum',
    data: {
      institutional: {
        established: '1950',
        principalsName: 'Dr. R.K. Sharma',
        totalArea: '50 Acres',
      },
      indicators: [
        { name: 'Internship Programs', value: 'Yes', marks: 10, doc: 'internship_report.pdf' },
        { name: 'Research Publications', value: '15', marks: 15, doc: 'research_list.pdf' },
        { name: 'Innovation Cell', value: 'Yes', marks: 10, doc: 'ic_certificate.pdf' },
        { name: 'Faculty with PhD', value: '60%', marks: 20, doc: 'faculty_list.pdf' },
        { name: 'Student Feedback System', value: 'Yes', marks: 10, doc: 'feedback_summary.pdf' },
      ]
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // In a real app, you would save this to the backend
    alert(`Status changed to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button and Score */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div>
          <button
            onClick={() => navigate('/admin/colleges')}
            className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to List
          </button>
          <h2 className="text-2xl font-bold text-slate-800 mt-2">{college.name}</h2>
          <p className="text-sm text-slate-500">AISHE: {college.aishe} | Type: {college.type} | District: {college.district}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-xs text-slate-500 uppercase font-medium">Total Score</p>
            <p className="text-3xl font-bold text-accent">{college.score}</p>
          </div>
          <div className={`px-4 py-2 rounded-lg font-semibold ${
            college.classification === 'Platinum' ? 'bg-purple-100 text-purple-800' :
            college.classification === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
            'bg-slate-100 text-slate-800'
          }`}>
            {college.classification}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Data Views */}
        <div className="lg:cols-span-2 space-y-6">
          {/* Institutional Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Institutional Information</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <dt className="text-sm font-medium text-slate-500">Established</dt>
                <dd className="mt-1 text-sm text-slate-900">{college.data.institutional.established}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Principal's Name</dt>
                <dd className="mt-1 text-sm text-slate-900">{college.data.institutional.principalsName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Total Area</dt>
                <dd className="mt-1 text-sm text-slate-900">{college.data.institutional.totalArea}</dd>
              </div>
            </dl>
          </div>

          {/* NEP Indicators */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">NEP Indicators & Evaluation</h3>
            <div className="overflow-hidden border border-slate-200 rounded-md">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Indicator</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Value</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Marks</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Document</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {college.data.indicators.map((ind, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{ind.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{ind.value}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{ind.marks}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-accent hover:underline">
                        <a href={`#${ind.doc}`} onClick={(e) => { e.preventDefault(); alert(`Downloading ${ind.doc}`); }}>
                          {ind.doc}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Review Panel */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 sticky top-24">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Review Panel</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Current Status</label>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    status === 'Approved' ? 'bg-green-100 text-green-800' :
                    status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                    status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {status}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="remarks" className="block text-sm font-medium text-slate-700">Remarks / Comments</label>
                <textarea
                  id="remarks"
                  rows="4"
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                  placeholder="Add notes for the college or internal use..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleStatusChange('Approved')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange('Under Review')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                >
                  Send Back for Review
                </button>
                <button
                  onClick={() => handleStatusChange('Rejected')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
