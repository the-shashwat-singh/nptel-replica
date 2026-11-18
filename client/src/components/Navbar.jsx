import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [lcDropdownOpen, setLcDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const lcDropdownRef = useRef(null);

  // Close dropdowns on outside click or route change
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (lcDropdownRef.current && !lcDropdownRef.current.contains(event.target)) {
        setLcDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setUserDropdownOpen(false);
    setLcDropdownOpen(false);
    setMobileNavOpen(false);
  }, [location.pathname]);

  const handleLogout = (e) => {
    if (e) e.preventDefault();
    setUserDropdownOpen(false);
    logout();
    navigate('/auth/login/');
  };

  const isLoginPage =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/login/' ||
    location.pathname === '/auth/login' ||
    location.pathname === '/auth/login/';

  if (isLoginPage) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#800020' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/auth/login/">
            <i className="bi bi-mortarboard-fill"></i> NPTEL
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={mobileNavOpen}
            aria-label="Toggle navigation"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${mobileNavOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/auth/login/">
                  <i className="bi bi-box-arrow-in-right"></i> Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  const currentUserEmail = user?.email || 'ss7495@srmist.edu.in';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#800020' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard/">
          <i className="bi bi-mortarboard-fill"></i> NPTEL
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={mobileNavOpen}
          aria-label="Toggle navigation"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${mobileNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/">
                <i className="bi bi-speedometer2"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/enrollments/">
                <i className="bi bi-book"></i> My Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/certificates/">
                <i className="bi bi-award"></i> Certificates
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/enrollments/halltickets/">
                <i className="bi bi-ticket-perforated"></i> Halltickets
              </Link>
            </li>

            {/* LC Dropdown */}
            <li className={`nav-item dropdown ${lcDropdownOpen ? 'show' : ''}`} ref={lcDropdownRef}>
              <a
                className={`nav-link dropdown-toggle ${lcDropdownOpen ? 'show' : ''}`}
                href="#"
                id="lcDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={lcDropdownOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setLcDropdownOpen((prev) => !prev);
                  setUserDropdownOpen(false);
                }}
              >
                <i className="bi bi-building"></i> LC
              </a>
              <ul
                className={`dropdown-menu shadow-sm ${lcDropdownOpen ? 'show' : ''}`}
                aria-labelledby="lcDropdown"
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                  minWidth: '230px',
                  padding: '0.4rem 0'
                }}
              >
                <li>
                  <h6
                    className="dropdown-header text-secondary fw-semibold"
                    style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem 0.25rem 1.25rem' }}
                  >
                    Create
                  </h6>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                    to="/lc/change-request/"
                    onClick={() => setLcDropdownOpen(false)}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <i className="bi bi-pencil-square me-2 fs-6"></i> Request Changes
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                    to="/lc/apply/"
                    onClick={() => setLcDropdownOpen(false)}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <i className="bi bi-building-add me-2 fs-6"></i> Register LC
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider my-2" />
                </li>
                <li>
                  <h6
                    className="dropdown-header text-secondary fw-semibold"
                    style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem 0.25rem 1.25rem' }}
                  >
                    Manage
                  </h6>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                    to="/lc/applications/"
                    onClick={() => setLcDropdownOpen(false)}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <i className="bi bi-folder-check me-2 fs-6"></i> My LC Applications
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                    to="/lc/change-requests/"
                    onClick={() => setLcDropdownOpen(false)}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <i className="bi bi-journal-text me-2 fs-6"></i> My LC Change Requests
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* User Account Dropdown */}
          <ul className="navbar-nav">
            <li
              className={`nav-item dropdown ${userDropdownOpen ? 'show' : ''}`}
              ref={userDropdownRef}
            >
              <a
                className={`nav-link dropdown-toggle ${userDropdownOpen ? 'show' : ''}`}
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={userDropdownOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setUserDropdownOpen((prev) => !prev);
                  setLcDropdownOpen(false);
                }}
              >
                <i className="bi bi-person-circle"></i> {currentUserEmail}
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-end shadow-sm ${userDropdownOpen ? 'show' : ''}`}
                aria-labelledby="userDropdown"
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                  minWidth: '220px',
                  padding: '0.4rem 0'
                }}
              >
                <li>
                  <Link
                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                    to="/profile/"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <i className="bi bi-person me-2 fs-6"></i> My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                    to="/profile/achievements/"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <i className="bi bi-trophy me-2 fs-6"></i> My Achievements
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                    to="/profile/analytics/"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <i className="bi bi-graph-up me-2 fs-6"></i> My Analytics
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider my-2" />
                </li>
                <li>
                  <a
                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                    href="/auth/logout/"
                    onClick={handleLogout}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <i className="bi bi-box-arrow-right me-2 fs-6"></i> Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
