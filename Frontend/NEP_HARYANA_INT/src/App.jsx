import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Signin from './pages/Signin/Signin'
import Dashboard from './pages/Dashboard/Dashboard'

// Admin Pages
import AdminLayout from './components/Admin/AdminLayout'
import AdminOverview from './pages/Admin/AdminOverview'
import CollegeManagement from './pages/Admin/CollegeManagement'
import CollegeDetail from './pages/Admin/CollegeDetail'
import ScoringEvaluation from './pages/Admin/ScoringEvaluation'
import Reports from './pages/Admin/Reports'
import Settings from './pages/Admin/Settings'

function App() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isAdmin = location.pathname.startsWith('/admin');

  const hideNavFooter = isDashboard || isAdmin;

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout title="Admin Dashboard" />}>
          <Route index element={<AdminOverview />} />
          <Route path="colleges" element={<CollegeManagement />} />
          <Route path="colleges/:id" element={<CollegeDetail />} />
          <Route path="scoring" element={<ScoringEvaluation />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      {!hideNavFooter && <Footer />}
    </>
  )
}

export default App
