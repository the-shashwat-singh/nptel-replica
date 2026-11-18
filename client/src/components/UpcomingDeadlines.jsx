import React from 'react';

const UpcomingDeadlines = ({ deadlines = [] }) => {
  return (
    <div className="card border border-light-subtle rounded-3 shadow-sm overflow-hidden" data-purpose="deadlines-panel">
      {/* Standard Card Header (padding 0.5rem 1rem, title 1.1rem, fw 600) */}
      <div
        className="card-header bg-warning text-white d-flex align-items-center"
        style={{ padding: '0.5rem 1rem', fontSize: '1.1rem', fontWeight: 600 }}
      >
        <i className="bi bi-exclamation-triangle"></i> Upcoming Deadlines
      </div>

      {/* Body: py-4 (1.5rem padding), default 16px normal weight, text-center */}
      <div className="card-body py-4 text-center" style={{ fontSize: '16px', fontWeight: 400, color: '#212529' }}>
        {deadlines.length === 0 ? (
          'No upcoming deadlines'
        ) : (
          deadlines.map((d, i) => (
            <div key={i} className="text-start">
              {d.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
