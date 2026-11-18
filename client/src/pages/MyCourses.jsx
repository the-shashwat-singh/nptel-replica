import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserScoreData } from '../data/userData';

const MyCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // View mode: 'list' or 'card', initialized from localStorage like NPTEL
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem('nptel_enrollment_view') || 'list';
    } catch (e) {
      return 'list';
    }
  });

  // Filter states
  const [filterSemester, setFilterSemester] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const currentEmail = user?.email || 'ss7495@srmist.edu.in';
  const userData = getUserScoreData(currentEmail);

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load courses:', err);
        setCourses([
          {
            id: 1,
            title: 'Data Base Management System',
            code: 'noc26-cs117',
            session: 'Jul-Dec 2026',
            status: 'Passed',
            institute: 'IIT Kharagpur',
            instructor: 'Prof. Partha Pratim Das',
            credits: 3,
            enrolled_date: 'Jul 2026'
          }
        ]);
        setLoading(false);
      });
  }, []);

  const handleViewChange = (mode) => {
    setViewMode(mode);
    try {
      localStorage.setItem('nptel_enrollment_view', mode);
    } catch (e) {}
  };

  // Filter logic
  const filteredCourses = courses.filter((course) => {
    if (filterSemester && !course.session.includes(filterSemester)) return false;
    if (filterYear && !course.session.includes(filterYear)) return false;
    if (filterStatus) {
      if (filterStatus === 'enrolled') return true;
      if (filterStatus === 'passed') return true;
      if (filterStatus === 'registered') return true;
      if (filterStatus === 'exam_completed') return true;
      if (filterStatus === 'failed') return false;
    }
    return true;
  });

  return (
    <main className="container my-4 flex-grow-1">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="bi bi-book me-2"></i>My Courses
            </h2>
            <div className="d-flex gap-2 align-items-center">
              {/* View Toggle */}
              <div className="btn-group" role="group" aria-label="View toggle">
                <button
                  type="button"
                  className={`btn btn-sm btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`}
                  id="btn-list-view"
                  title="List view"
                  onClick={() => handleViewChange('list')}
                >
                  <i className="bi bi-list-ul"></i>
                </button>
                <button
                  type="button"
                  className={`btn btn-sm btn-outline-secondary ${viewMode === 'card' ? 'active' : ''}`}
                  id="btn-card-view"
                  title="Card view"
                  onClick={() => handleViewChange('card')}
                >
                  <i className="bi bi-grid-3x2-gap"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body py-3">
              <form method="get" className="row g-2 align-items-end" onSubmit={(e) => e.preventDefault()}>
                <div className="col-auto">
                  <label className="form-label small mb-1" htmlFor="filter-semester">
                    Semester
                  </label>
                  <select
                    name="semester"
                    id="filter-semester"
                    className="form-select form-select-sm"
                    value={filterSemester}
                    onChange={(e) => setFilterSemester(e.target.value)}
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
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                  >
                    <option value="">All Years</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
                <div className="col-auto">
                  <label className="form-label small mb-1" htmlFor="filter-status">
                    Status
                  </label>
                  <select
                    name="status"
                    id="filter-status"
                    className="form-select form-select-sm"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="registered">Registered for Exam</option>
                    <option value="exam_completed">Completed Exam</option>
                    <option value="passed">Passed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-sm btn-primary">
                    <i className="bi bi-funnel me-1"></i>Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className="row mb-4">
        <div className="col-12">
          <h5 className="text-success mb-3">
            <i className="bi bi-play-circle me-1"></i>Current Courses
            <span className="badge bg-success ms-1">{filteredCourses.length}</span>
          </h5>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* List View */}
              <div
                className="enrollment-list-view"
                style={{ display: viewMode === 'list' ? '' : 'none' }}
              >
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Course Name</th>
                        <th>NOC ID</th>
                        <th>Semester</th>
                        <th>Status</th>
                        <th>Score</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.map((course) => (
                        <tr key={course.id || course.code}>
                          <td>{course.title}</td>
                          <td>
                            <span className="badge bg-primary">{course.code}</span>
                          </td>
                          <td>{course.session}</td>
                          <td>
                            <span className="badge bg-success me-1">Passed / Certified</span>
                            <span className="badge bg-success me-1">
                              <i className="bi bi-award me-1"></i>Certified
                            </span>
                            {userData.isTopper && (
                              <span
                                className="badge bg-warning text-dark"
                                title="Topper recognition (loaded)"
                              >
                                <i className="bi bi-trophy-fill me-1"></i>{userData.topperBadge}
                              </span>
                            )}
                          </td>
                          <td>
                            <span className="fw-bold text-success">
                              {userData.finalDisplay} / 100
                            </span>
                          </td>
                          <td>
                            <div className="d-flex flex-wrap gap-2">
                              <a
                                href={userData.certPdf}
                                download={`NPTEL_Certificate_noc26-cs117_${userData.name.replace(/\s+/g, '_')}.pdf`}
                                className="btn btn-sm btn-primary"
                                title="Download certificate"
                              >
                                <i className="bi bi-download me-1"></i>Certificate
                              </a>
                              <Link
                                to="/enrollments/7642059/"
                                className="btn btn-sm btn-outline-primary"
                              >
                                <i className="bi bi-eye me-1"></i>View
                              </Link>
                              <a
                                href="https://onlinecourses.nptel.ac.in/noc26_cs117/preview"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-success"
                                title="Open on SWAYAM"
                              >
                                <i className="bi bi-box-arrow-up-right me-1"></i>SWAYAM
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredCourses.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center text-muted py-4">
                            No courses found matching the selected filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card View */}
              <div
                className="enrollment-card-view"
                style={{ display: viewMode === 'card' ? '' : 'none' }}
              >
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                  {filteredCourses.map((course) => (
                    <div className="col" key={course.id || course.code}>
                      <div className="card h-100 border-success">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="badge bg-primary">{course.code}</span>
                            <span className="badge bg-success">Passed / Certified</span>
                          </div>
                          <h6 className="card-title">{course.title}</h6>
                          <p className="card-text text-muted small mb-2">{course.session}</p>
                          <div className="mb-2">
                            <span className="fw-bold text-success">
                              {userData.finalDisplay} / 100
                            </span>
                          </div>
                          <span className="badge bg-success me-1">
                            <i className="bi bi-award me-1"></i>Certified
                          </span>
                          {userData.isTopper && (
                            <span
                              className="badge bg-warning text-dark"
                              title="Topper recognition (loaded)"
                            >
                              <i className="bi bi-trophy-fill me-1"></i>{userData.topperBadge}
                            </span>
                          )}
                        </div>
                        <div className="card-footer bg-transparent d-grid gap-2">
                          <a
                            href={userData.certPdf}
                            download={`NPTEL_Certificate_noc26-cs117_${userData.name.replace(/\s+/g, '_')}.pdf`}
                            className="btn btn-sm btn-primary"
                            title="Download certificate"
                          >
                            <i className="bi bi-download me-1"></i>Certificate
                          </a>
                          <Link
                            to="/enrollments/7642059/"
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-eye me-1"></i>View Details
                          </Link>
                          <a
                            href="https://onlinecourses.nptel.ac.in/noc26_cs117/preview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-success"
                          >
                            <i className="bi bi-box-arrow-up-right me-1"></i>View on SWAYAM
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredCourses.length === 0 && (
                    <div className="col-12">
                      <p className="text-muted">No courses found matching the selected filters.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Past Courses */}
    </main>
  );
};

export default MyCourses;
