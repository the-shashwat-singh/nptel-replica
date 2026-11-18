import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserScoreData } from '../data/userData';

const CourseScores = () => {
  const { user } = useAuth();
  const currentEmail = user?.email || 'ss7495@srmist.edu.in';
  const userData = getUserScoreData(currentEmail);
  const [showCelebrateModal, setShowCelebrateModal] = useState(false);

  const assignments = userData.assignmentsList;

  return (
    <main className="container my-4 flex-grow-1" data-purpose="scores-layout">
      {/* Breadcrumb Navigation */}
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/enrollments/">My Courses</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                noc26-cs117
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Course Banner Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h3 className="mb-1">Data Base Management System</h3>
                  <p className="mb-2 opacity-75">
                    noc26-cs117 | Jul-Dec 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-clipboard-data me-2"></i>Result
              </h5>
              <div className="d-flex gap-2 align-items-center">
                {userData.isTopper && (
                  <span
                    className="badge bg-warning text-dark d-inline-flex align-items-center fw-bold"
                    style={{
                      fontSize: '0.8125rem',
                      padding: '0.35rem 0.6rem',
                      lineHeight: 1.2
                    }}
                  >
                    <i className="bi bi-trophy-fill me-1"></i>{userData.topperBadge}
                  </span>
                )}
                <a
                  href="https://onlinecourses.nptel.ac.in/noc26_cs117/preview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-success"
                >
                  <i className="bi bi-box-arrow-up-right me-1"></i>SWAYAM
                </a>
              </div>
            </div>

            <div className="card-body">
              <div className="row text-center result-line">
                {/* Result Scores */}
                <div className="result-scores">
                  <div className="col-6 col-md mb-3 mb-md-0">
                    <div className="h3 mb-0 text-primary">
                      {userData.assignment}
                      <small className="text-muted fs-6">/ 25</small>
                    </div>
                    <div className="text-muted">Assignment</div>
                  </div>

                  <div className="col-6 col-md mb-3 mb-md-0">
                    <div className="h3 mb-0 text-primary">
                      {userData.exam}
                      <small className="text-muted fs-6">/ 75</small>
                    </div>
                    <div className="text-muted">Exam</div>
                  </div>

                  <div className="col-6 col-md">
                    <div className="h3 mb-0 text-success">
                      {userData.finalScore}
                      <small className="text-muted fs-6">/ 100</small>
                    </div>
                    <div className="text-muted">Final</div>
                  </div>
                </div>

                {/* Result Actions */}
                <div className="result-actions">
                  <div className="col-6 col-md" data-certificate-cell="">
                    <a
                      href={userData.certPdf}
                      download={`NPTEL_Certificate_noc26-cs117_${userData.name.replace(/\s+/g, '_')}.pdf`}
                      className="btn btn-success"
                      data-celebrate-download=""
                    >
                      <i className="bi bi-download me-1"></i>Download Certificate
                    </a>
                  </div>

                  <div className="col-12 col-md mt-3 mt-md-0" data-celebrate-cell="">
                    <div className="act">
                      <span className="celebrate-wrap">
                        <span className="sparkle s1" aria-hidden="true">✨</span>
                        <span className="sparkle s2" aria-hidden="true">⭐</span>
                        <span className="sparkle s3" aria-hidden="true">✨</span>
                        <span className="sparkle s4" aria-hidden="true">🎊</span>
                        <button
                          type="button"
                          className="btn btn-celebrate"
                          id="celebrate-btn"
                          aria-haspopup="dialog"
                          onClick={() => setShowCelebrateModal(true)}
                        >
                          <span className="emoji" aria-hidden="true">🎉</span>
                          <span>Celebrate your achievement</span>
                        </button>
                      </span>
                      <div className="small text-muted mt-1">Make a post to share, if you'd like</div>
                    </div>
                  </div>

                  <div className="col-12 col-md mt-3 mt-md-0" data-issue-reporting="">
                    <div className="act">
                      <button
                        type="button"
                        className="btn btn-report text-nowrap"
                        style={{ backgroundColor: '#FFC107', color: '#3D2A00', borderColor: '#FFC107' }}
                      >
                        <i className="bi bi-flag me-1"></i>Report score issue
                      </button>
                      <div className="small text-muted mt-1">Open until 18 Nov, 11:59 PM</div>
                    </div>

                    <div className="act">
                      <div className="mt-2">
                        <button
                          type="button"
                          className="btn btn-report text-nowrap"
                          style={{ backgroundColor: '#FFC107', color: '#3D2A00', borderColor: '#FFC107' }}
                        >
                          <i className="bi bi-flag me-1"></i>Report certificate issue
                        </button>
                      </div>
                      <div className="small text-muted mt-1">Open until 18 Nov, 11:59 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Scores Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-list-check me-2"></i>Assignment Scores
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Week</th>
                      <th scope="col">Assignment Name</th>
                      <th scope="col">Max Score</th>
                      <th scope="col">Score</th>
                      <th scope="col">Percentage</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map((item, idx) => (
                      <tr key={idx}>
                        <th scope="row">{item.week}</th>
                        <td>{item.name}</td>
                        <td>{item.max}</td>
                        <td>{item.score}</td>
                        <td>
                          {item.pct > 0 ? (
                            <div className="progress" style={{ height: '20px' }}>
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: `${item.pct}%` }}
                                aria-valuenow={item.pct}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {item.pct}%
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          {item.submitted ? (
                            <>
                              <span className="badge bg-success me-1">Submitted</span>
                              <span className="badge bg-info">Graded</span>
                            </>
                          ) : (
                            <span className="badge bg-secondary">Not Submitted</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Calculation Logic */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-calculator me-2"></i>Score Calculation
              </h5>
            </div>
            <div className="card-body">
              Assignment Score = Average of best 6 out of 8 assignments.
              <br />
              Final Score(Score on Certificate)= 75% of Exam Score + 25% of Assignment Score.
              <br />
              <small className="text-muted">Note: We have taken best assignment score from January 2026 course</small>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="row mt-4 mb-4">
        <div className="col-12">
          <Link to="/enrollments/" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-1"></i>Back to My Courses
          </Link>
        </div>
      </div>

      {/* Celebrate Modal */}
      {showCelebrateModal && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1055 }} onClick={() => setShowCelebrateModal(false)}></div>
          <div className="modal fade show d-block celebrate-modal" tabIndex="-1" role="dialog" style={{ zIndex: 1060 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close ms-auto"
                    aria-label="Close"
                    onClick={() => setShowCelebrateModal(false)}
                  ></button>
                </div>
                <div className="modal-body text-center px-4 pt-0">
                  <div className="big-emoji mb-3" aria-hidden="true">🎉</div>
                  <h5 className="fw-bold mb-2" id="celebrateTitle">Congratulations on completing the course!</h5>
                  <p className="text-muted mb-3">Create a post to celebrate with friends and family.</p>
                  <ul className="list-unstyled text-start small points mx-auto" style={{ maxWidth: '360px' }}>
                    <li><i className="bi bi-person-check text-primary me-2"></i>Your name and course are filled in for you</li>
                    <li><i className="bi bi-lock text-primary me-2"></i>Nothing is posted until <b>you</b> choose to share it. Your result stays private.</li>
                    <li><i className="bi bi-arrow-left-circle text-primary me-2"></i>Opens <b>Imprzd</b>, a free post maker. Press Back to return here.</li>
                  </ul>
                </div>
                <div className="modal-footer border-0 justify-content-center pb-4">
                  <button
                    type="button"
                    className="btn btn-light px-4"
                    onClick={() => setShowCelebrateModal(false)}
                  >
                    Not now
                  </button>
                  <button
                    type="button"
                    className="btn btn-celebrate px-4"
                    id="celebrate-go"
                    onClick={() => setShowCelebrateModal(false)}
                  >
                    <span aria-hidden="true">✨ </span><span>Create my post</span>
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

export default CourseScores;
