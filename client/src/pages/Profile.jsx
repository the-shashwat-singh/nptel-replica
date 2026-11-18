import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState({
    personal: {
      fullName: 'Shashwat Singh',
      email: 'ss7495@srmist.edu.in',
      dob: 'September 11, 2005',
      gender: 'Male',
      mobile: '8935044479',
      alternatePhone: '8090519517',
      role: 'Student',
      rollNo: 'RA2411043010075'
    },
    address: {
      city: 'chennai',
      state: 'tamil nadu',
      country: 'India',
      pincode: '603203'
    },
    additional: {
      hasDisability: 'No',
      scStCategory: 'No'
    },
    localChapter: {
      emailDomain: 'Not set',
      examForm: '183 — SRM Institute of Science and Technology - Kattankulathur Campus',
      swayamProfile: 'Not in any local chapter',
      effective: '183 — SRM Institute of Science and Technology - Kattankulathur Campus',
      status: 'Choosing your LC is closed.'
    },
    education: {
      college: 'SRM Institute of Science and Technology - Kattankulathur Campus',
      rollNo: 'RA2411043010075',
      localChapter: '183',
      qualification: "Bachelor's (4 year)",
      degree: 'undergraduate',
      department: 'Engineering & Technology',
      yearOfStudy: '3',
      graduationYear: '2028',
      shareWithCollege: false,
      shareWithCompanies: false
    },
    examProfile: {
      session: 'Jul - Dec 2026 Exam Form — closed 15 Oct 2026',
      identity: {
        fullName: 'Shashwat Singh',
        mobile: '8935044479',
        alternateMobile: '8090519517',
        gender: 'male',
        dob: 'Sept. 11, 2005',
        role: 'Student'
      },
      address: {
        city: 'chennai',
        state: 'tamil nadu',
        country: 'india'
      },
      roleDetails: {
        degree: 'btech',
        department: 'electronics_and_communication_engineering',
        yearOfStudy: 'year_3',
        creditTransfer: 'no_and_share'
      },
      categoryAndConsent: {
        localChapter: 'Yes',
        college: '183',
        collegeCity: 'kanchipuram',
        collegeState: 'tamil nadu',
        collegeCountry: 'india',
        scStCategory: 'No',
        disability: 'No',
        outsideIndia: 'No',
        shareWithEmployers: 'Yes',
        courseMotivation: 'To update myself with knowledge in this field',
        source: 'College',
        apaarAvailable: 'No',
        apaarVerified: 'No'
      },
      documents: [
        { name: 'Photo', note: '', status: 'Approved', badge: 'bg-success' },
        { name: 'Signature', note: '', status: 'Approved', badge: 'bg-success' },
        { name: 'ID proof', note: '', status: 'Submitted', badge: 'bg-secondary' },
        { name: 'SC/ST document', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'PwD document', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Citizenship ID proof', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Residence proof', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'College letter', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Company letter', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' }
      ]
    }
  });

  useEffect(() => {
    const currentEmail = user?.email || 'ss7495@srmist.edu.in';
    const emailParam = `?email=${encodeURIComponent(currentEmail)}`;
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    fetch(`/api/profile${emailParam}`, { headers })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then((data) => {
        if (data) setProfile(data);
      })
      .catch((err) => {
        console.warn('Using default profile state:', err);
      });
  }, [user?.email, token]);

  const cardHeaderStyle = {
    backgroundColor: '#800020',
    color: '#ffffff',
    fontWeight: 600
  };

  return (
    <main className="container my-4 flex-grow-1" data-purpose="profile-layout">
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="bi bi-person-circle me-2"></i>My Profile
            </h2>
          </div>
        </div>
      </div>

      {/* Row 1: Profile Avatar Card + Personal Information Card */}
      <div className="row">
        {/* Left Column: Avatar & Basic Info */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center d-flex flex-column align-items-center justify-content-center py-4">
              <div
                className="bg-secondary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: '150px', height: '150px' }}
              >
                <i className="bi bi-person-fill text-white" style={{ fontSize: '4.5rem' }}></i>
              </div>

              <h4 className="mb-1 fw-bold">{profile.personal.fullName}</h4>
              <p className="text-muted mb-2">{profile.personal.email}</p>
              <span
                className="badge text-white px-3 py-1 mb-2"
                style={{ backgroundColor: '#800020', fontSize: '0.875rem' }}
              >
                {profile.personal.role}
              </span>
              <p className="text-muted small mb-0">Roll No: {profile.personal.rollNo}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Personal Information Card */}
        <div className="col-md-8 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-header" style={cardHeaderStyle}>
              <h5 className="mb-0 fs-6 fw-semibold">
                <i className="bi bi-person me-2"></i>Personal Information
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="text-muted small d-block">Full Name</label>
                  <p className="mb-0 fw-medium">{profile.personal.fullName}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="text-muted small d-block">Email</label>
                  <p className="mb-0 fw-medium">{profile.personal.email}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="text-muted small d-block">Date of Birth</label>
                  <p className="mb-0 fw-medium">{profile.personal.dob}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="text-muted small d-block">Gender</label>
                  <p className="mb-0 fw-medium">{profile.personal.gender}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="text-muted small d-block">Mobile</label>
                  <p className="mb-0 fw-medium">{profile.personal.mobile}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="text-muted small d-block">Alternate Phone</label>
                  <p className="mb-0 fw-medium">{profile.personal.alternatePhone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Address & Additional Information */}
      <div className="row">
        {/* Address Card */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-header" style={cardHeaderStyle}>
              <h5 className="mb-0 fs-6 fw-semibold">
                <i className="bi bi-geo-alt me-2"></i>Address
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="text-muted small d-block">City</label>
                  <p className="mb-0 fw-medium">{profile.address.city}</p>
                </div>
                <div className="col-6 mb-3">
                  <label className="text-muted small d-block">State</label>
                  <p className="mb-0 fw-medium">{profile.address.state}</p>
                </div>
                <div className="col-6 mb-3">
                  <label className="text-muted small d-block">Country</label>
                  <p className="mb-0 fw-medium">{profile.address.country}</p>
                </div>
                <div className="col-6 mb-3">
                  <label className="text-muted small d-block">PIN Code</label>
                  <p className="mb-0 fw-medium">{profile.address.pincode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Card */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-header" style={cardHeaderStyle}>
              <h5 className="mb-0 fs-6 fw-semibold">
                <i className="bi bi-info-circle me-2"></i>Additional Information
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="mb-3">
                <label className="text-muted small d-block mb-1">Has Disability</label>
                <p className="mb-0">
                  <span className="badge bg-secondary px-2.5 py-1">{profile.additional.hasDisability}</span>
                </p>
              </div>
              <div className="mb-3">
                <label className="text-muted small d-block mb-1">SC/ST Category</label>
                <p className="mb-0">
                  <span className="badge bg-secondary px-2.5 py-1">{profile.additional.scStCategory}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Your Local Chapter */}
      <div className="row" id="local-chapter">
        <div className="col-12 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header d-flex justify-content-between align-items-center" style={cardHeaderStyle}>
              <h5 className="mb-0 fs-6 fw-semibold">
                <i className="bi bi-diagram-3 me-2"></i>Your Local Chapter
              </h5>
              <span className="small text-white opacity-75">July-December 2026</span>
            </div>
            <div className="card-body p-4">
              <div className="row mb-3">
                <div className="col-md-4 mb-3 mb-md-0">
                  <label className="text-muted small d-block">From your email domain</label>
                  <p className="mb-0 fw-medium">{profile.localChapter.emailDomain}</p>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                  <label className="text-muted small d-block">From your exam form</label>
                  <p className="mb-0 fw-medium">{profile.localChapter.examForm}</p>
                </div>
                <div className="col-md-4">
                  <label className="text-muted small d-block">From your SWAYAM enrolment profile</label>
                  <p className="mb-0 fw-medium">{profile.localChapter.swayamProfile}</p>
                </div>
              </div>

              <div className="border rounded bg-light p-3 mb-3">
                <strong>{profile.localChapter.effective}</strong>
              </div>

              <p className="text-muted mb-0 small">{profile.localChapter.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Education & College */}
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header" style={cardHeaderStyle}>
              <h5 className="mb-0 fs-6 fw-semibold">
                <i className="bi bi-mortarboard me-2"></i>Education &amp; College
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="text-muted small d-block">College / Institution</label>
                  <p className="mb-0 fw-medium">{profile.education.college}</p>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="text-muted small d-block">College Roll No</label>
                  <p className="mb-0 fw-medium">{profile.education.rollNo}</p>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="text-muted small d-block">Local Chapter</label>
                  <p className="mb-0 fw-medium">{profile.education.localChapter}</p>
                </div>

                <div className="col-md-3 mb-3">
                  <label className="text-muted small d-block">Qualification</label>
                  <p className="mb-0 fw-medium">{profile.education.qualification}</p>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="text-muted small d-block">Degree</label>
                  <p className="mb-0 fw-medium">{profile.education.degree}</p>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="text-muted small d-block">Department</label>
                  <p className="mb-0 fw-medium">{profile.education.department}</p>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="text-muted small d-block">Year of Study</label>
                  <p className="mb-0 fw-medium">{profile.education.yearOfStudy}</p>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="text-muted small d-block">Graduation Year</label>
                  <p className="mb-0 fw-medium">{profile.education.graduationYear}</p>
                </div>
              </div>

              <hr className="my-3 text-secondary opacity-25" />

              <div className="row">
                <div className="col-md-6 mb-2 mb-md-0">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="shareCollege" disabled checked={profile.education.shareWithCollege} />
                    <label className="form-check-label text-muted" htmlFor="shareCollege">
                      Share info with college
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="shareCompanies" disabled checked={profile.education.shareWithCompanies} />
                    <label className="form-check-label text-muted" htmlFor="shareCompanies">
                      Share info with companies
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Documents */}
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header" style={cardHeaderStyle}>
              <h5 className="mb-0 fs-6 fw-semibold">
                <i className="bi bi-file-earmark me-2"></i>Documents
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-4 text-center mb-3 mb-md-0">
                  <label className="text-muted small d-block mb-2">Photograph</label>
                  <div
                    className="border rounded d-inline-flex flex-column align-items-center justify-content-center bg-light text-muted p-3"
                    style={{ width: '130px', height: '130px' }}
                  >
                    <i className="bi bi-person-badge fs-1 mb-1 text-secondary opacity-50"></i>
                    <span className="small text-secondary">Photograph</span>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <label className="text-muted small d-block mb-2">Signature</label>
                  <div
                    className="border rounded d-inline-flex flex-column align-items-center justify-content-center bg-light text-muted p-3"
                    style={{ width: '180px', height: '90px' }}
                  >
                    <i className="bi bi-pen fs-2 mb-1 text-secondary opacity-50"></i>
                    <span className="small text-secondary">Signature</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 6: Exam Profile */}
      <section className="mb-4" aria-labelledby="exam-profile-heading">
        <div className="card shadow-sm border-0">
          <div className="card-header d-md-flex justify-content-between align-items-center gap-3" style={cardHeaderStyle}>
            <div>
              <h5 id="exam-profile-heading" className="mb-0 fs-6 fw-semibold">
                <i className="bi bi-clipboard-check me-2"></i>Exam Profile
              </h5>
              <small className="text-white opacity-75">Values submitted for this exam run</small>
            </div>
            <select
              className="form-select form-select-sm bg-white text-dark mt-2 mt-md-0"
              style={{ maxWidth: '340px' }}
              defaultValue="jul_dec_2026"
            >
              <option value="jul_dec_2026">{profile.examProfile.session}</option>
            </select>
          </div>

          <div className="card-body p-4">
            {/* Warning Alert */}
            <div
              className="alert d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4 p-3 rounded"
              style={{ backgroundColor: '#fff3cd', borderColor: '#ffecb5', color: '#664d03', borderLeft: '4px solid #ffc107' }}
            >
              <span>Changes are available for this exam run.</span>
              <button
                type="button"
                className="btn btn-sm text-white"
                style={{ backgroundColor: '#800020' }}
              >
                Submit Profile / Document Change Request
              </button>
            </div>

            {/* Sub-cards Grid */}
            <div className="row">
              {/* Identity & Contact */}
              <div className="col-lg-6 mb-3">
                <div className="border rounded h-100 p-3 bg-white">
                  <h6 className="fw-bold mb-3 text-dark">Identity &amp; contact</h6>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Full name</div>
                      <div className="fw-medium">{profile.examProfile.identity.fullName}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Mobile</div>
                      <div className="fw-medium">{profile.examProfile.identity.mobile}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Alternate mobile</div>
                      <div className="fw-medium">{profile.examProfile.identity.alternateMobile}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Gender</div>
                      <div className="fw-medium">{profile.examProfile.identity.gender}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Date of birth</div>
                      <div className="fw-medium">{profile.examProfile.identity.dob}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Exam-taker role</div>
                      <div className="fw-medium">{profile.examProfile.identity.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="col-lg-6 mb-3">
                <div className="border rounded h-100 p-3 bg-white">
                  <h6 className="fw-bold mb-3 text-dark">Address</h6>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">City</div>
                      <div className="fw-medium">{profile.examProfile.address.city}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">State</div>
                      <div className="fw-medium">{profile.examProfile.address.state}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Country</div>
                      <div className="fw-medium">{profile.examProfile.address.country}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Details */}
              <div className="col-lg-6 mb-3">
                <div className="border rounded h-100 p-3 bg-white">
                  <h6 className="fw-bold mb-3 text-dark">Role details</h6>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Degree</div>
                      <div className="fw-medium">{profile.examProfile.roleDetails.degree}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Department</div>
                      <div className="fw-medium">{profile.examProfile.roleDetails.department}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Year of study</div>
                      <div className="fw-medium">{profile.examProfile.roleDetails.yearOfStudy}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Credit transfer</div>
                      <div className="fw-medium">{profile.examProfile.roleDetails.creditTransfer}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category, Consent & APAAR */}
              <div className="col-lg-6 mb-3">
                <div className="border rounded h-100 p-3 bg-white">
                  <h6 className="fw-bold mb-3 text-dark">Category, consent &amp; APAAR</h6>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Local chapter</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.localChapter}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">College</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.college}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">College city</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.collegeCity}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">College state</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.collegeState}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">College country</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.collegeCountry}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">SC/ST category</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.scStCategory}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Person with disability</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.disability}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Outside India</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.outsideIndia}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Share with potential employers</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.shareWithEmployers}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Course motivation</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.courseMotivation}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">Course information source</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.source}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">APAAR available</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.apaarAvailable}</div>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <div className="small text-muted">APAAR verified</div>
                      <div className="fw-medium">{profile.examProfile.categoryAndConsent.apaarVerified}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents & Verification */}
              <div className="col-12">
                <div className="border rounded p-3 bg-white">
                  <h6 className="fw-bold mb-3 text-dark">Documents &amp; verification</h6>
                  <div className="list-group list-group-flush">
                    {profile.examProfile.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="list-group-item px-0 d-flex justify-content-between align-items-center gap-2"
                      >
                        <span>
                          {doc.name}
                          {doc.note && <span className="text-muted">{doc.note}</span>}
                        </span>
                        <span className={`badge ${doc.badge} px-2.5 py-1`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
