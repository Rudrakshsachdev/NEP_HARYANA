import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AdminOverview = () => {
  // Mock Data
  const kpis = [
    { title: 'Total Colleges', value: '150', color: 'bg-blue-500' },
    { title: 'Submissions', value: '120', color: 'bg-green-500' },
    { title: 'Under Review', value: '25', color: 'bg-yellow-500' },
    { title: 'Approved', value: '85', color: 'bg-purple-500' },
    { title: 'Rejected', value: '10', color: 'bg-red-500' },
  ];

  const barData = [
    { name: 'College A', score: 85 },
    { name: 'College B', score: 72 },
    { name: 'College C', score: 90 },
    { name: 'College D', score: 65 },
    { name: 'College E', score: 88 },
  ];

  const pieData = [
    { name: 'Platinum', value: 20 },
    { name: 'Gold', value: 50 },
    { name: 'Silver', value: 30 },
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  const activities = [
    { id: 1, action: 'New submission from Govt College, Ambala', time: '10 mins ago' },
    { id: 2, action: 'Status changed to Approved for RK College', time: '1 hour ago' },
    { id: 3, action: 'New submission from DAV College, Karnal', time: '2 hours ago' },
    { id: 4, action: 'Status changed to Rejected for MLN College', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">{kpi.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{kpi.value}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${kpi.color}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">College-wise Scores</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#1D4ED8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Classification Breakdown</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, index) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {index !== activities.length - 1 ? (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></span>
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center ring-8 ring-white">
                        <span className="text-sm font-medium text-slate-500">{activity.id}</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-slate-800">{activity.action}</p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-slate-500">
                        <time>{activity.time}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
