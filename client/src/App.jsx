import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AlertBanner from './components/AlertBanner';
import Footer from './components/Footer';
import FloatingReportButton from './components/FloatingReportButton';
import ReportModal from './components/ReportModal';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MyCourses from './pages/MyCourses';
import Certificates from './pages/Certificates';
import CourseScores from './pages/CourseScores';
import Halltickets from './pages/Halltickets';
import Achievements from './pages/Achievements';
import Analytics from './pages/Analytics';
import Marksheet from './pages/Marksheet';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

const LogoutHandler = () => {
  const { logout } = useAuth();
  React.useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/auth/login/" replace />;
};

const PlaceholderPage = ({ title }) => (
  <main className="container my-5 flex-grow-1">
    <div className="card shadow-sm p-4">
      <h2 className="h4 text-dark mb-3">{title}</h2>
      <p className="text-secondary mb-0">This section is currently being updated for the July - Dec 2026 semester.</p>
    </div>
  </main>
);

function MainLayout() {
  return (
    <>
      {/* Top Navigation */}
      <Navbar />

      {/* Alert Notice Banner */}
      <AlertBanner />

      {/* Main Routed Page Content */}
      <div className="flex-grow-1 d-flex flex-column">
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login/" replace />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard/" replace />} />
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/auth/login" element={<Navigate to="/auth/login/" replace />} />
          <Route path="/auth/login/" element={<Login />} />
          <Route path="/auth/logout" element={<Navigate to="/auth/logout/" replace />} />
          <Route path="/auth/logout/" element={<LogoutHandler />} />

          {/* Enrollments / Courses */}
          <Route path="/enrollments" element={<Navigate to="/enrollments/" replace />} />
          <Route path="/enrollments/" element={<MyCourses />} />
          <Route path="/courses" element={<Navigate to="/enrollments/" replace />} />

          {/* Certificates */}
          <Route path="/certificates" element={<Navigate to="/certificates/" replace />} />
          <Route path="/certificates/" element={<Certificates />} />

          {/* Scores View */}
          <Route path="/enrollments/7642059" element={<Navigate to="/enrollments/7642059/" replace />} />
          <Route path="/enrollments/7642059/" element={<CourseScores />} />
          <Route path="/enrollments/scores/noc26-cs117" element={<Navigate to="/enrollments/7642059/" replace />} />
          <Route path="/enrollments/scores/noc26-cs117/" element={<CourseScores />} />
          <Route path="/scores" element={<Navigate to="/enrollments/7642059/" replace />} />
          <Route path="/scores/" element={<Navigate to="/enrollments/7642059/" replace />} />

          {/* Halltickets */}
          <Route path="/enrollments/halltickets" element={<Navigate to="/enrollments/halltickets/" replace />} />
          <Route path="/enrollments/halltickets/" element={<Halltickets />} />
          <Route path="/halltickets" element={<Navigate to="/enrollments/halltickets/" replace />} />

          {/* Profile & Sub-pages */}
          <Route path="/profile" element={<Navigate to="/profile/" replace />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/profile/achievements" element={<Navigate to="/profile/achievements/" replace />} />
          <Route path="/profile/achievements/" element={<Achievements />} />
          <Route path="/achievements" element={<Navigate to="/profile/achievements/" replace />} />
          <Route path="/achievements/" element={<Navigate to="/profile/achievements/" replace />} />
          <Route path="/profile/analytics" element={<Navigate to="/profile/analytics/" replace />} />
          <Route path="/profile/analytics/" element={<Analytics />} />
          <Route path="/analytics" element={<Navigate to="/profile/analytics/" replace />} />
          <Route path="/profile/marksheet" element={<Navigate to="/profile/marksheet/" replace />} />
          <Route path="/profile/marksheet/" element={<Marksheet />} />
          <Route path="/marksheet" element={<Navigate to="/profile/marksheet/" replace />} />
          <Route path="/marksheet/" element={<Navigate to="/profile/marksheet/" replace />} />

          {/* LC Dropdown Pages */}
          <Route path="/lc/change-request" element={<Navigate to="/lc/change-request/" replace />} />
          <Route path="/lc/change-request/" element={<PlaceholderPage title="LC - Request Changes" />} />
          <Route path="/lc/apply" element={<Navigate to="/lc/apply/" replace />} />
          <Route path="/lc/apply/" element={<PlaceholderPage title="LC - Register LC" />} />
          <Route path="/lc/applications" element={<Navigate to="/lc/applications/" replace />} />
          <Route path="/lc/applications/" element={<PlaceholderPage title="LC - My LC Applications" />} />
          <Route path="/lc/change-requests" element={<Navigate to="/lc/change-requests/" replace />} />
          <Route path="/lc/change-requests/" element={<PlaceholderPage title="LC - My LC Change Requests" />} />

          <Route path="*" element={<Navigate to="/dashboard/" replace />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      <FloatingReportButton />

      {/* Report a Problem Modal */}
      <ReportModal />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

export default App;
