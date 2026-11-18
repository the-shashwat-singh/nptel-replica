import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickActions';
import UpcomingDeadlines from '../components/UpcomingDeadlines';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_courses: 1,
    certificates: 1,
    active_enrollments: 0,
    pending_exams: 0
  });

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Data Base Management System',
      subtitle: 'noc26-cs117 - Jul-Dec 2026',
      badge_text: 'Enrolled',
      badge_type: 'success'
    }
  ]);

  useEffect(() => {
    fetch('/api/dashboard/summary')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (data.stats) {
          setStats(data.stats);
        }
        if (data.recent_activity && data.recent_activity.length > 0) {
          setActivities(data.recent_activity);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch from /api/dashboard/summary, using fallback defaults:', err);
      });
  }, []);

  return (
    <main className="container my-4 flex-grow-1" data-purpose="main-layout">
      {/* Page Title */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <i
          className="bi bi-speedometer2"
          style={{
            fontSize: '2.5rem',
            color: 'rgb(33, 37, 41)',
            verticalAlign: 'middle',
            marginRight: '0.5rem'
          }}
        ></i>
        <h1
          className="mb-0"
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'rgb(33, 37, 41)'
          }}
        >
          My Dashboard
        </h1>
      </div>

      {/* Metrics Cards Grid */}
      <div className="row mb-4" data-purpose="stats-cards">
        <StatCard
          title="Total Courses"
          value={stats.total_courses}
          icon="bi-book"
          cardClass="stat-card-courses"
        />
        <StatCard
          title="Certificates"
          value={stats.certificates}
          icon="bi-award"
          cardClass="stat-card-cert"
        />
        <StatCard
          title="Active Enrollments"
          value={stats.active_enrollments}
          icon="bi-clipboard-check"
          cardClass="stat-card-enroll"
        />
        <StatCard
          title="Pending Exams"
          value={stats.pending_exams}
          icon="bi-pencil-square"
          cardClass="stat-card-exams"
        />
      </div>

      {/* Two-Column Main Content Section */}
      <div className="row g-4 align-items-start">
        {/* Left Column: Recent Activity (Spans 8 cols on lg) */}
        <div className="col-12 col-lg-8">
          <RecentActivity activities={activities} />
        </div>

        {/* Right Column: Quick Actions & Deadlines (Spans 4 cols on lg) */}
        <div className="col-12 col-lg-4 d-flex flex-column gap-4">
          <QuickActions />
          <UpcomingDeadlines deadlines={[]} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
