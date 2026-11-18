import React, { useState, useEffect } from 'react';

const Halltickets = () => {
  const [halltickets, setHalltickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [selectedHt, setSelectedHt] = useState(null);
  const [errorBanner, setErrorBanner] = useState('');

  // Filters
  const [filterYear, setFilterYear] = useState('');
  const [filterSemester, setFilterSemester] = useState('');

  const handleDownloadClick = (ht) => {
    setSelectedHt(ht);
    setShowTimeoutModal(true);
    setErrorBanner(`Hall ticket download for ${ht.course_title} (${ht.course_code}) has timed out. The examination window ended on ${ht.allocated_exam_date}.`);
  };

  useEffect(() => {
    fetch('/api/halltickets')
      .then((res) => res.json())
      .then((data) => {
        setHalltickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load halltickets:', err);
        setHalltickets([
          {
            id: 1,
            course_title: 'Data Base Management System',
            course_code: 'noc26-cs117',
            original_exam_date: '2026-09-20',
            allocated_exam_date: '2026-09-20',
            selected_city: 'Chennai-South, Tamil Nadu',
            allocated_city: 'Chennai, Tamil Nadu',
            session: 'FN',
            venue: 'iON Digital Zone iDZ Kovilambakkam',
            venue_address:
              'Fortune Towers,1st and 2nd Floor,SH 109, 200 Feet Thoraipakkam Pallavaram Radial Road, Near Eachangadu signal,Kovilambakkam, Chennai, Tamil Nadu, India, 600117',
            changes: 'Exam city changed',
            academic_year: '2026',
            semester: 'Jul-Dec'
          }
        ]);
        setLoading(false);
      });
  }, []);

  const filteredHalltickets = halltickets.filter((ht) => {
    if (filterYear && ht.academic_year && ht.academic_year !== filterYear) return false;
    if (filterSemester && ht.semester && ht.semester !== filterSemester) return false;
    return true;
  });

  return (
    <main className="container my-4 flex-grow-1">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="bi bi-ticket-perforated me-2"></i>My Halltickets
            </h2>
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
                  <label className="form-label small mb-1" htmlFor="filter-year">
                    Academic Year
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
                  <button type="submit" className="btn btn-sm btn-primary">
                    <i className="bi bi-funnel me-1"></i>Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Centre Details */}
      <h3 className="h4 mb-3">Exam Centre Details</h3>

      {errorBanner && (
        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mb-3" role="alert">
          <i className="bi bi-clock-history me-2 fs-5"></i>
          <div>
            <strong>Download Timed Out:</strong> {errorBanner}
          </div>
          <button
            type="button"
            className="btn-close ms-auto"
            aria-label="Close"
            onClick={() => setErrorBanner('')}
          ></button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive" style={{ overflowY: 'hidden' }}>
          <table
            className="table table-striped table-hover align-middle mb-0"
            style={{ fontSize: '0.875rem' }}
          >
            <caption className="visually-hidden">Released exam centre allocations</caption>
            <thead>
              <tr>
                <th scope="col" style={{ width: '13%' }}>Course</th>
                <th scope="col" style={{ width: '8%' }}>Original exam date</th>
                <th scope="col" style={{ width: '8%' }}>Allocated exam date</th>
                <th scope="col" style={{ width: '9%' }}>Selected city</th>
                <th scope="col" style={{ width: '9%' }}>Allocated city</th>
                <th scope="col" style={{ width: '5%' }}>Session</th>
                <th scope="col" style={{ width: '13%' }}>Venue</th>
                <th scope="col" style={{ width: '21%' }}>Venue address</th>
                <th scope="col" style={{ width: '8%' }}>Changes</th>
                <th scope="col" style={{ width: '6%' }} className="text-center">Hall Ticket</th>
              </tr>
            </thead>
            <tbody>
              {filteredHalltickets.map((ht) => (
                <tr key={ht.id}>
                  <th scope="row" style={{ fontWeight: 600 }}>
                    {ht.course_title}
                  </th>
                  <td>{ht.original_exam_date}</td>
                  <td>{ht.allocated_exam_date}</td>
                  <td>{ht.selected_city}</td>
                  <td className="bg-warning-subtle text-warning-emphasis">
                    {ht.allocated_city}
                  </td>
                  <td>{ht.session}</td>
                  <td>{ht.venue}</td>
                  <td>{ht.venue_address}</td>
                  <td>
                    {ht.changes ? (
                      <span className="badge text-bg-warning">{ht.changes}</span>
                    ) : (
                      <span className="text-muted small">None</span>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() => handleDownloadClick(ht)}
                      className="btn btn-sm btn-primary d-inline-flex flex-column align-items-center justify-content-center p-2 text-center"
                      style={{
                        width: '74px',
                        fontSize: '0.78rem',
                        lineHeight: '1.15',
                        borderRadius: '6px'
                      }}
                      title="Download Hall Ticket"
                    >
                      <i className="bi bi-download mb-1" style={{ fontSize: '0.85rem' }}></i>
                      <span>Download Hall Ticket</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredHalltickets.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center text-muted py-4">
                    No hall tickets found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Hall Ticket Expired / Timeout Modal */}
      {showTimeoutModal && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1055 }}
            onClick={() => setShowTimeoutModal(false)}
          ></div>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ zIndex: 1060 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content shadow border-0">
                <div className="modal-header bg-light border-bottom">
                  <h5 className="modal-title text-danger d-flex align-items-center fw-bold">
                    <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                    Hall Ticket Download Timed Out
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowTimeoutModal(false)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <div className="d-flex align-items-start mb-3">
                    <div className="rounded-circle bg-danger-subtle p-3 me-3 text-danger d-flex align-items-center justify-content-center">
                      <i className="bi bi-clock-history fs-3"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1 text-danger">Download Window Expired</h6>
                      <p className="text-secondary small mb-2">
                        The examination for <strong>{selectedHt?.course_title || 'Data Base Management System'} ({selectedHt?.course_code || 'noc26-cs117'})</strong> was conducted on <strong>{selectedHt?.allocated_exam_date || '2026-09-20'}</strong>.
                      </p>
                      <p className="small text-muted mb-0">
                        Hall ticket downloads are automatically disabled after the examination date (Time Out Error: <code>ERR_HT_DOWNLOAD_TIMEOUT</code>).
                      </p>
                    </div>
                  </div>
                  <div className="alert alert-warning py-2 px-3 small mb-0 d-flex align-items-center">
                    <i className="bi bi-info-circle-fill me-2 text-warning"></i>
                    <span>For verification or past records, please use the <strong>Report a problem</strong> feature at the bottom right.</span>
                  </div>
                </div>
                <div className="modal-footer border-top-0 pt-0 pb-3 px-4">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm px-4"
                    onClick={() => setShowTimeoutModal(false)}
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

export default Halltickets;
