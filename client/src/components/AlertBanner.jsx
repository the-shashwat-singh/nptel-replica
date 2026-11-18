import React from 'react';
import { useLocation } from 'react-router-dom';

const AlertBanner = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === '/login' ||
    location.pathname === '/login/' ||
    location.pathname === '/auth/login' ||
    location.pathname === '/auth/login/';

  return (
    <div
      className="text-center py-2 px-3"
      style={{ backgroundColor: '#f7e6ea', color: 'var(--nptel-primary, #800020)' }}
    >
      <i className="bi bi-info-circle" aria-hidden="true"></i>{' '}
      Previous semester scores and certificates have been migrated to this website!
      Please check yours, and if anything is missing or incorrect, cross-verify against the{' '}
      <a
        href="https://archive.nptel.ac.in/noc/B2C/"
        style={{ color: 'inherit', fontWeight: 600 }}
      >
        old website (archive.nptel.ac.in)
      </a>
      , and if you still find an issue,{' '}
      {isLoginPage ? (
        'log in and use Report a problem.'
      ) : (
        <>
          <button
            type="button"
            className="btn btn-link p-0 align-baseline fw-semibold"
            style={{ color: 'var(--nptel-primary, #800020)' }}
            data-bs-toggle="modal"
            data-bs-target="#feedbackReportModal"
          >
            report a problem
          </button>
          .
        </>
      )}
    </div>
  );
};

export default AlertBanner;
