import React, { useState, useEffect } from 'react';

const Halltickets = () => {
  const [halltickets, setHalltickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterYear, setFilterYear] = useState('');
  const [filterSemester, setFilterSemester] = useState('');

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
                    <a
                      href="/certificates/noc26-cs117-certificate.png"
                      download="NPTEL_Hallticket_noc26-cs117.png"
                      className="btn btn-sm btn-primary d-inline-flex flex-column align-items-center justify-content-center p-2 text-center"
                      style={{
                        width: '74px',
                        fontSize: '0.78rem',
                        lineHeight: '1.15',
                        borderRadius: '6px'
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Download Hall Ticket"
                    >
                      <i className="bi bi-download mb-1" style={{ fontSize: '0.85rem' }}></i>
                      <span>Download Hall Ticket</span>
                    </a>
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
    </main>
  );
};

export default Halltickets;
