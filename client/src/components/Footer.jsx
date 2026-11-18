import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const partnerStyle = {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    borderRadius: '50%'
  };

  return (
    <footer
      className="mt-auto py-5"
      style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}
      data-purpose="page-footer"
    >
      <div className="container">
        {/* 3-Column Grid: Col 1 (Logo), Col 2 (About NPTEL + Follow Us), Col 3 (Our Partners) */}
        <div className="row g-4 align-items-start mb-4">
          {/* Column 1: NPTEL Logo (width about 135px, height auto) */}
          <div className="col-12 col-md-4">
            <Link className="d-inline-block" to="/dashboard/">
              <img
                alt="NPTEL Logo"
                src="/images/nptel-logo.jpg"
                style={{ width: '135px', height: 'auto', objectFit: 'contain' }}
              />
            </Link>
          </div>

          {/* Column 2: About NPTEL + Funded by + Follow Us */}
          <div className="col-12 col-md-4 small text-secondary">
            <h6 className="fw-bold text-dark mb-2">About NPTEL</h6>
            <p className="mb-2">
              National Programme on Technology Enhanced Learning (NPTEL) is a joint initiative of the IITs and IISc to offer online courses &amp; certification.
            </p>
            <p className="mb-3">
              Funded by MoE, Govt. of India.
            </p>
            <h6 className="fw-bold text-dark mb-2">Follow Us</h6>
            <div className="d-flex align-items-center gap-3" style={{ fontSize: '1.5rem', color: '#6c757d' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                style={{ color: '#6c757d', textDecoration: 'none' }}
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
                style={{ color: '#6c757d', textDecoration: 'none' }}
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                style={{ color: '#6c757d', textDecoration: 'none' }}
              >
                <i className="bi bi-youtube"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                style={{ color: '#6c757d', textDecoration: 'none' }}
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Column 3: Our Partners (7 in first row, 1 in second row, 40px circles, 0.5rem gap) */}
          <div className="col-12 col-md-4">
            <h6 className="fw-bold text-dark mb-3">Our Partners</h6>
            <div>
              {/* Row 1: 7 partner logos */}
              <div className="d-flex align-items-center gap-2 mb-2">
                <img
                  alt="IIT Madras"
                  className="partner-logo"
                  src="/images/iitmadras.png"
                  title="IIT Madras"
                  style={partnerStyle}
                />
                <img
                  alt="IIT Bombay"
                  className="partner-logo"
                  src="/images/iitbombay.png"
                  title="IIT Bombay"
                  style={partnerStyle}
                />
                <img
                  alt="IIT Delhi"
                  className="partner-logo"
                  src="/images/iitdelhi.png"
                  title="IIT Delhi"
                  style={partnerStyle}
                />
                <img
                  alt="IIT Kanpur"
                  className="partner-logo"
                  src="/images/iitkanpur.png"
                  title="IIT Kanpur"
                  style={partnerStyle}
                />
                <img
                  alt="IIT Kharagpur"
                  className="partner-logo"
                  src="/images/iitkharagpur.png"
                  title="IIT Kharagpur"
                  style={partnerStyle}
                />
                <img
                  alt="IIT Guwahati"
                  className="partner-logo"
                  src="/images/iitguwahati.png"
                  title="IIT Guwahati"
                  style={partnerStyle}
                />
                <img
                  alt="IIT Roorkee"
                  className="partner-logo"
                  src="/images/iitroorkee.png"
                  title="IIT Roorkee"
                  style={partnerStyle}
                />
              </div>

              {/* Row 2: 1 partner logo */}
              <div className="d-flex align-items-center">
                <img
                  alt="IISc Bangalore"
                  className="partner-logo"
                  src="/images/iisbangalore.png"
                  title="IISc Bangalore"
                  style={partnerStyle}
                />
              </div>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: '#dee2e6', opacity: 0.75, margin: '2rem 0 1.5rem 0' }} />
        <div className="row">
          <div className="col-12 text-center text-muted">
            <small style={{ fontSize: '0.85rem' }}>
              © 2026 NPTEL - All rights reserved. National Programme on Technology Enhanced Learning, IIT Madras
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
