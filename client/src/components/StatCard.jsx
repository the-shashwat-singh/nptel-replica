import React from 'react';

const StatCard = ({ title, value, icon, cardClass }) => {
  return (
    <div className="col-12 col-md-3">
      <div
        className={`card ${cardClass} border-0 shadow-sm`}
        style={{
          height: '99.19px',
          borderRadius: '10px',
          color: '#FFFFFF',
          fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: 'normal',
          fontWeight: 400
        }}
      >
        <div
          className="card-body d-flex align-items-center justify-content-between h-100"
          style={{ padding: '1rem' }}
        >
          <div className="d-flex flex-column justify-content-center">
            <div className="fw-bold text-white" style={{ fontSize: '16px', lineHeight: '24px' }}>
              {title}
            </div>
            <div className="fw-bold text-white" style={{ fontSize: '2rem', lineHeight: 1.1 }}>
              {value}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <i
              className={`bi ${icon}`}
              style={{ fontSize: '2.5rem', color: '#ffffff', lineHeight: 1 }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
