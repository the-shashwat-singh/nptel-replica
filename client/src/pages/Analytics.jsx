import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserScoreData } from '../data/userData';

const Analytics = () => {
  const { user } = useAuth();
  const currentEmail = user?.email || 'ss7495@srmist.edu.in';
  const userData = getUserScoreData(currentEmail);

  const avgFinal = userData.finalDisplay;
  const topperCount = userData.isTopper ? 1 : 0;

  return (
    <main className="container my-4 flex-grow-1" data-purpose="analytics-layout">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-graph-up me-2"></i>My Analytics
        </h2>
        <a
          href={`/profile/marksheet/?email=${encodeURIComponent(currentEmail)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <i className="bi bi-file-earmark-pdf me-1"></i>Download Mark Sheet
        </a>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="h2 mb-0 text-primary">1</div>
              <div className="text-muted">Courses</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="h2 mb-0 text-success">1</div>
              <div className="text-muted">Certified</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="h2 mb-0 text-warning">{topperCount}</div>
              <div className="text-muted">Topper</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="h2 mb-0 text-success">{avgFinal}</div>
              <div className="text-muted">Avg Final</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <i className="bi bi-calendar3 me-2"></i>By Semester
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Semester</th>
                  <th className="text-center">Courses</th>
                  <th className="text-center">Certified</th>
                  <th className="text-center">Avg Final</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jul-Dec 2026</td>
                  <td className="text-center">1</td>
                  <td className="text-center">1</td>
                  <td className="text-center">{avgFinal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;
