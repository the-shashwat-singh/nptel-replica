import React from 'react';

const FloatingReportButton = () => {
  return (
    <aside data-purpose="floating-support-action">
      <button
        type="button"
        className="btn rounded-pill text-white shadow-sm"
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: 1050,
          backgroundColor: '#800020',
          fontSize: '1rem',
          fontWeight: 500,
          padding: '0.5rem 1.25rem',
          border: 'none',
          display: 'inline-flex',
          alignItems: 'center'
        }}
        data-bs-toggle="modal"
        data-bs-target="#feedbackReportModal"
        aria-label="Report a problem"
      >
        <i className="bi bi-bug"></i> Report a problem
      </button>
    </aside>
  );
};

export default FloatingReportButton;
