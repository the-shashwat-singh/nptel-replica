import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Achievements = () => {
  const { user } = useAuth();
  const currentEmail = user?.email || 'ss7495@srmist.edu.in';
  const isShashwat = !user?.email || currentEmail === 'ss7495@srmist.edu.in';
  const cardHeaderStyle = {
    backgroundColor: '#800020',
    color: '#ffffff',
    fontWeight: 600
  };

  return (
    <main className="container my-4 flex-grow-1" data-purpose="achievements-layout">
      {/* Header with Title and Back to Profile Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-trophy me-2"></i>My Achievements
        </h2>
        <Link to="/profile/" className="btn btn-sm btn-outline-secondary">
          <i className="bi bi-arrow-left me-1"></i>Back to Profile
        </Link>
      </div>

      {/* NPTEL Stars */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-header" style={cardHeaderStyle}>
          <i className="bi bi-star-fill text-warning me-2"></i>NPTEL Stars
        </div>
        <div className="card-body p-4">
          <p className="text-muted mb-0">No star standing yet.</p>
        </div>
      </div>

      {/* Domain Certifications */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-header" style={cardHeaderStyle}>
          <i className="bi bi-diagram-3 me-2"></i>Domain Certifications
        </div>
        <div className="card-body p-4">
          <p className="text-muted mb-0">No domain certifications yet.</p>
        </div>
      </div>

      {/* Course Toppers */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-header" style={cardHeaderStyle}>
          <i className="bi bi-award me-2"></i>Topper Recognitions
        </div>
        <div className="card-body p-4">
          {isShashwat ? (
            <div className="d-flex justify-content-between align-items-center">
              <span>Data Base Management System (Jul-Dec 2026)</span>
              <span className="badge bg-warning text-dark fw-bold px-2 py-1">
                Top 5%
              </span>
            </div>
          ) : (
            <p className="text-muted mb-0">No topper recognitions yet.</p>
          )}
        </div>
      </div>

      {/* Internships / Fellowships / Conference Support */}
      <div className="row">
        {/* Internships */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-header" style={cardHeaderStyle}>
              <i className="bi bi-briefcase me-2"></i>Internships
            </div>
            <div className="card-body p-4">
              <p className="text-muted mb-0">None.</p>
            </div>
          </div>
        </div>

        {/* Pre-doc Fellowships */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-header" style={cardHeaderStyle}>
              <i className="bi bi-mortarboard me-2"></i>Pre-doc Fellowships
            </div>
            <div className="card-body p-4">
              <p className="text-muted mb-0">None.</p>
            </div>
          </div>
        </div>

        {/* Conference Support */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-header" style={cardHeaderStyle}>
              <i className="bi bi-people me-2"></i>Conference Support
            </div>
            <div className="card-body p-4">
              <p className="text-muted mb-0">None.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Achievements;
