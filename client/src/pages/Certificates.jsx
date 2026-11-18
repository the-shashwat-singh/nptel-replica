import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserScoreData } from '../data/userData';

const Certificates = () => {
  const { user } = useAuth();
  const [semesterFilter, setSemesterFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [showCertModal, setShowCertModal] = useState(false);

  const currentEmail = user?.email || 'ss7495@srmist.edu.in';
  const userData = getUserScoreData(currentEmail);

  return (
    <main className="container my-4 flex-grow-1" data-purpose="certificates-layout">
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="bi bi-award me-2"></i>My Certificates
            </h2>
          </div>
        </div>
      </div>

      {/* Filters Card */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body py-3">
              <form className="row g-2 align-items-end" onSubmit={(e) => e.preventDefault()}>
                <div className="col-auto">
                  <label className="form-label small mb-1" htmlFor="filter-semester">
                    Semester
                  </label>
                  <select
                    name="semester"
                    id="filter-semester"
                    className="form-select form-select-sm"
                    value={semesterFilter}
                    onChange={(e) => setSemesterFilter(e.target.value)}
                  >
                    <option value="">All Semesters</option>
                    <option value="Jul-Dec">Jul-Dec</option>
                  </select>
                </div>
                <div className="col-auto">
                  <label className="form-label small mb-1" htmlFor="filter-year">
                    Year
                  </label>
                  <select
                    name="year"
                    id="filter-year"
                    className="form-select form-select-sm"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                  >
                    <option value="">All Years</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn btn-sm text-white"
                    style={{ backgroundColor: '#800020' }}
                  >
                    <i className="bi bi-funnel me-1"></i>Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Cards Grid */}
      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className={`card-header ${userData.tierClass}`}>
              <span>
                <i className="bi bi-award me-1"></i>{userData.tier}
              </span>
            </div>

            <div className="card-body">
              <h5 className="card-title fw-bold text-dark">Data Base Management System</h5>
              <p className="card-text text-muted">
                noc26-cs117 | Jul–Dec 2026
              </p>

              <div className="mb-3">
                <small className="text-muted d-block">Score</small>
                <div className="h4 mb-0 text-success fw-bold">{userData.finalDisplay}%</div>
              </div>
            </div>
            <div className="card-footer bg-light" style={{ borderTop: '1px solid #dee2e6' }}>
              <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
                <small className="text-muted">
                  <i className="bi bi-calendar3 me-1"></i>
                  Oct 12, 2026
                </small>
                <div className="d-flex flex-wrap gap-2">
                  <Link to="/enrollments/7642059/" className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-clipboard-data me-1"></i>View Scores
                  </Link>

                  <a
                    href={userData.certPdf}
                    download={`NPTEL_Certificate_noc26-cs117_${userData.name.replace(/\s+/g, '_')}.pdf`}
                    className="btn btn-sm btn-primary text-white"
                    title="Download Certificate PDF"
                  >
                    <i className="bi bi-download me-1"></i>Download Certificate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Pointer Note */}
      <p className="text-muted small mt-2 mb-3" data-testid="my-courses-pointer">
        <i className="bi bi-info-circle me-1"></i>Don't see a course here? Check its status in{' '}
        <Link to="/enrollments/">My Courses</Link>.
      </p>

      {/* Certificate Preview Modal */}
      {showCertModal && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1055 }} onClick={() => setShowCertModal(false)}></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1060 }}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content shadow border-0 overflow-hidden">
                <div className="modal-header bg-nptel-maroon text-white py-2 px-3">
                  <h5 className="modal-title fs-6 fw-bold">
                    <i className="bi bi-award-fill me-2"></i>NPTEL Certificate — Data Base Management System (noc26-cs117)
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    aria-label="Close"
                    onClick={() => setShowCertModal(false)}
                  ></button>
                </div>
                <div className="modal-body p-0 text-center bg-dark">
                  <img
                    src={userData.certPng}
                    alt="NPTEL Online Certificate"
                    className="img-fluid"
                    style={{ maxHeight: '80vh', width: 'auto' }}
                  />
                </div>
                <div className="modal-footer bg-light py-2">
                  <a
                    href={userData.certPdf}
                    download={`NPTEL_Certificate_noc26-cs117_${userData.name.replace(/\s+/g, '_')}.pdf`}
                    className="btn btn-sm btn-primary text-white"
                  >
                    <i className="bi bi-file-earmark-pdf me-1"></i>Download PDF
                  </a>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary ms-auto"
                    onClick={() => setShowCertModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Certificates;
