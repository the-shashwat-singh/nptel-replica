import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RecentActivity = ({ activities = [] }) => {
  const { user } = useAuth();
  const currentEmail = user?.email || 'ss7495@srmist.edu.in';
  const isShashwat = !user?.email || currentEmail === 'ss7495@srmist.edu.in';

  return (
    <div className="card border border-light-subtle rounded-3 shadow-sm overflow-hidden" data-purpose="recent-activity-panel">
      {/* Standard Card Header (padding 0.5rem 1rem, title 1.1rem, fw 600) */}
      <div
        className="card-header bg-nptel-maroon text-white d-flex align-items-center"
        style={{ padding: '0.5rem 1rem', fontSize: '1.1rem', fontWeight: 600 }}
      >
        <i className="bi bi-clock-history"></i> Recent Activity
      </div>

      <div className="card-body p-4">
        {activities.length === 0 ? (
          <div className="text-muted small text-center py-3">No recent activity found.</div>
        ) : (
          activities.map((item, index) => (
            <div
              key={item.id || index}
              className={`d-flex align-items-center justify-content-between ${
                index > 0 ? 'pt-3 border-top' : ''
              }`}
            >
              <div>
                <h5 className="card-title fs-6 fw-medium text-dark mb-1">
                  {item.title}
                </h5>
                <div className="text-muted small">
                  {item.subtitle || `${item.code} - ${item.session}`}
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                {isShashwat && (
                  <span
                    className="badge bg-warning text-dark fw-bold d-inline-flex align-items-center"
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.55rem' }}
                  >
                    <i className="bi bi-trophy-fill me-1"></i>Top 5%
                  </span>
                )}
                <span className={`badge text-bg-${item.badge_type || 'success'} px-2.5 py-1.5 fw-medium`}>
                  {item.badge_text || item.status || 'Enrolled'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Slim card footer (padding 0.5rem 1rem) with light grey background */}
      <div
        className="card-footer"
        style={{ padding: '0.5rem 1rem', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}
      >
        <Link className="btn btn-outline-primary btn-sm fw-semibold" to="/enrollments/">
          View All Courses →
        </Link>
      </div>
    </div>
  );
};

export default RecentActivity;
