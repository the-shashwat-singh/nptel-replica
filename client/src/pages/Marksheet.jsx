import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserScoreData } from '../data/userData';

const Marksheet = () => {
  const { user } = useAuth();
  const currentEmail = user?.email || 'ss7495@srmist.edu.in';
  const userData = getUserScoreData(currentEmail);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="container my-4 flex-grow-1" data-purpose="marksheet-layout">
      {/* Top action bar (hidden in print) */}
      <div className="d-flex justify-content-between align-items-center mb-4 no-print" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <Link to="/profile/analytics/" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left me-1"></i>Back to My Analytics
        </Link>
        <div className="d-flex gap-2">
          <a
            href={userData.marksheetPdf}
            download={`NPTEL_Mark_Sheet_${userData.name.replace(/\s+/g, '_')}.pdf`}
            className="btn btn-primary btn-sm"
          >
            <i className="bi bi-download me-1"></i>Download PDF
          </a>
          <button onClick={handlePrint} className="btn btn-outline-primary btn-sm">
            <i className="bi bi-printer me-1"></i>Print
          </button>
        </div>
      </div>

      {/* Official Mark Sheet Document Container matching reference image */}
      <div
        className="card shadow-sm border p-4 p-md-5 mx-auto bg-white"
        style={{
          maxWidth: '850px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        {/* Title: NPTEL — Consolidated Mark Sheet */}
        <h2
          className="fw-bold mb-1"
          style={{ color: '#0d6efd', fontSize: '1.6rem', letterSpacing: '-0.3px' }}
        >
          NPTEL — Consolidated Mark Sheet
        </h2>
        <div className="text-secondary small mb-4" style={{ fontSize: '0.9rem' }}>
          National Programme on Technology Enhanced Learning
        </div>

        {/* Candidate Details */}
        <div className="mb-4" style={{ fontSize: '0.875rem' }}>
          <table className="table table-borderless table-sm mb-0" style={{ maxWidth: '500px' }}>
            <tbody>
              <tr>
                <td className="fw-bold ps-0 text-dark" style={{ width: '100px', paddingBottom: '4px' }}>
                  Name:
                </td>
                <td className="text-dark ps-0" style={{ paddingBottom: '4px' }}>
                  {userData.name}
                </td>
              </tr>
              <tr>
                <td className="fw-bold ps-0 text-dark" style={{ paddingBottom: '4px' }}>
                  Email:
                </td>
                <td className="text-dark ps-0" style={{ paddingBottom: '4px' }}>
                  {userData.email}
                </td>
              </tr>
              <tr>
                <td className="fw-bold ps-0 text-dark">
                  Generated:
                </td>
                <td className="text-dark ps-0">
                  November 18, 2026 08:59
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Scores Table (Only for DBMS as requested) */}
        <div className="table-responsive mb-3">
          <table
            className="table table-bordered align-middle text-center mb-0"
            style={{ borderColor: '#dee2e6', fontSize: '0.85rem' }}
          >
            <thead style={{ backgroundColor: '#ffffff' }}>
              <tr style={{ color: '#212529', fontWeight: 600 }}>
                <th className="text-start py-2 px-3" style={{ width: '28%' }}>
                  Course
                </th>
                <th className="py-2" style={{ width: '12%' }}>
                  NOC ID
                </th>
                <th className="py-2" style={{ width: '12%' }}>
                  Semester
                </th>
                <th className="py-2" style={{ width: '12%' }}>
                  Assignment /<br />25
                </th>
                <th className="py-2" style={{ width: '12%' }}>
                  Exam /<br />75
                </th>
                <th className="py-2" style={{ width: '12%' }}>
                  Final /<br />100
                </th>
                <th className="py-2" style={{ width: '12%' }}>
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-start py-3 px-3 fw-normal text-dark">
                  Data Base Management System
                </td>
                <td className="py-3 text-dark">
                  noc26-<br />cs117
                </td>
                <td className="py-3 text-dark">
                  Jul-Dec<br />2026
                </td>
                <td className="py-3 text-dark">
                  {userData.assignment}
                </td>
                <td className="py-3 text-dark">
                  {userData.exam}
                </td>
                <td className="py-3 text-dark">
                  {userData.finalScore}
                </td>
                <td className="py-3 fw-bold" style={{ color: '#198754' }}>
                  PASS
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Disclaimer / Notice below table */}
        <p className="text-muted small mt-2 mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
          This mark sheet is generated from loaded results. Scores are produced by the NPTEL evaluation pipeline. For official certificates, see your course pages.
        </p>
      </div>
    </main>
  );
};

export default Marksheet;
