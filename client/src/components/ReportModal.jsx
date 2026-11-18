import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ReportModal = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState('Score / Certificate Migration Issue');
  const [subject, setSubject] = useState('Data Base Management System (noc26-cs117)');
  const [description, setDescription] = useState('');
  const [userEmail, setUserEmail] = useState(user?.email || 'ss7495@srmist.edu.in');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category,
          subject,
          description,
          user_email: userEmail
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit report');
      }

      setSuccess(data.message || 'Report submitted successfully! Ticket ID #' + data.reportId);
      setDescription('');
    } catch (err) {
      setError(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="feedbackReportModal"
      tabIndex="-1"
      aria-labelledby="feedbackReportModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-3 shadow border-0 overflow-hidden">
          {/* Modal Header */}
          <div className="modal-header bg-nptel-maroon text-white py-3">
            <h5 className="modal-title d-flex align-items-center gap-2 fs-6 fw-bold" id="feedbackReportModalLabel">
              <i className="bi bi-bug-fill"></i>
              <span>Report a Problem</span>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {success && (
                <div className="alert alert-success d-flex align-items-center gap-2 small">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>{success}</span>
                </div>
              )}

              {error && (
                <div className="alert alert-danger d-flex align-items-center gap-2 small">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{error}</span>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">
                  Your Registered Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">
                  Issue Category
                </label>
                <select
                  className="form-select form-select-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="Score / Certificate Migration Issue">
                    Score / Certificate Migration Issue
                  </option>
                  <option value="Course Enrollment Discrepancy">
                    Course Enrollment Discrepancy
                  </option>
                  <option value="Exam Center / Hallticket Issue">
                    Exam Center / Hallticket Issue
                  </option>
                  <option value="Assignment Score Missing">
                    Assignment Score Missing
                  </option>
                  <option value="Technical Glitch / Portal Bug">
                    Technical Glitch / Portal Bug
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">
                  Subject / Course
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Data Base Management System (noc26-cs117)"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">
                  Detailed Description
                </label>
                <textarea
                  className="form-control form-control-sm"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please explain the issue you are facing in detail. Include any relevant reference URLs or IDs..."
                  required
                ></textarea>
              </div>

              <div className="small text-muted bg-light p-2 rounded">
                <i className="bi bi-info-circle me-1 text-primary"></i>
                Reports are monitored by the NPTEL Operations team at IIT Madras.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer bg-light px-4 py-2.5">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                data-bs-dismiss="modal"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm text-white"
                style={{ backgroundColor: '#800020' }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send me-1"></i>
                    Submit Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
