import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const btnStyle = {
    fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 500,
    letterSpacing: 'normal',
    borderRadius: '6px',
    padding: '0.375rem 0.75rem',
    height: '38px',
    boxSizing: 'border-box'
  };

  return (
    <div className="card border-0 rounded-3 shadow-sm overflow-hidden" data-purpose="quick-actions-panel">
      {/* Standard Card Header (padding 0.5rem 1rem, title 1.1rem, fw 600) */}
      <div
        className="card-header bg-nptel-green text-white d-flex align-items-center"
        style={{ padding: '0.5rem 1rem', fontSize: '1.1rem', fontWeight: 600 }}
      >
        <i className="bi bi-award me-2"></i>Quick Actions
      </div>

      {/* Action Buttons: d-grid with gap-2 (0.5rem gap) measuring exactly 384px x 38px */}
      <div className="card-body p-3 d-grid gap-2 bg-white">
        <Link
          className="btn btn-outline-success d-flex align-items-center justify-content-center gap-2 text-decoration-none w-100"
          to="/certificates/"
          style={btnStyle}
        >
          <i className="bi bi-download"></i>
          <span>Download Certificates</span>
        </Link>

        <Link
          className="btn btn-outline-achieve d-flex align-items-center justify-content-center gap-2 text-decoration-none w-100"
          to="/profile/achievements/"
          style={btnStyle}
        >
          <i className="bi bi-trophy"></i>
          <span>My Achievements</span>
        </Link>

        <Link
          className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 text-decoration-none w-100"
          to="/profile/analytics/"
          style={btnStyle}
        >
          <i className="bi bi-graph-up"></i>
          <span>My Analytics</span>
        </Link>

        <Link
          className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 text-decoration-none w-100"
          to="/profile/"
          style={btnStyle}
        >
          <i className="bi bi-person"></i>
          <span>My Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
