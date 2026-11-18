import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { initDb, query, get, run } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'nptel_jwt_secret_key_2026_secure';

app.use(cors());
app.use(express.json());

// Initialize Database & Seed
await initDb();

// JWT Middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// 1a. Send OTP Code: POST /api/auth/send-code
app.post('/api/auth/send-code', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }
  // User asked: "for send the code, after clicking it it shows me to enter the code..make it as such that any 6 digit code would work"
  res.json({
    success: true,
    message: "If that email is valid, we've sent a code.",
    email
  });
});

// 1b. Verify OTP Code: POST /api/auth/verify-code
app.post('/api/auth/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    // "make it as such that any 6 digit code would work"
    const cleanCode = String(code || '').replace(/\D/g, '');
    if (cleanCode.length !== 6) {
      return res.status(400).json({ error: 'Please enter a 6-digit code' });
    }

    let user = await get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      let defaultName = 'Student User';
      if (email === 'ss7495@srmist.edu.in') defaultName = 'Shashwat Singh';
      else if (email === 'hg4210@srmist.edu.in') defaultName = 'Himanshu Golya';
      else if (email === 'pg7071@srmist.edu.in') defaultName = 'Pratham Goyal';

      const hashedPassword = await bcrypt.hash('password123', 10);
      const result = await run(
        'INSERT INTO users (email, password, name, institution) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, defaultName, 'SRM Institute of Science and Technology - Kattankulathur Campus']
      );
      user = {
        id: result.id,
        email,
        name: defaultName,
        institution: 'SRM Institute of Science and Technology - Kattankulathur Campus'
      };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        institution: user.institution
      }
    });
  } catch (err) {
    console.error('Verify code error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 1c. Auth Endpoint: POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, code } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Support code-based login directly via /api/auth/login as well
    if (code) {
      const cleanCode = String(code).replace(/\D/g, '');
      if (cleanCode.length !== 6) {
        return res.status(400).json({ error: 'Please enter a 6-digit code' });
      }
    }

    let user = await get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      let defaultName = 'Student User';
      if (email === 'ss7495@srmist.edu.in') defaultName = 'Shashwat Singh';
      else if (email === 'hg4210@srmist.edu.in') defaultName = 'Himanshu Golya';
      else if (email === 'pg7071@srmist.edu.in') defaultName = 'Pratham Goyal';

      const hashedPassword = await bcrypt.hash(password || 'password123', 10);
      const result = await run(
        'INSERT INTO users (email, password, name, institution) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, defaultName, 'SRM Institute of Science and Technology - Kattankulathur Campus']
      );
      user = {
        id: result.id,
        email,
        name: defaultName,
        institution: 'SRM Institute of Science and Technology - Kattankulathur Campus'
      };
    } else if (password && !code) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        institution: user.institution
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Current User Endpoint: GET /api/auth/me
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await get('SELECT id, email, name, institution, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Dashboard Summary: GET /api/dashboard/summary
app.get('/api/dashboard/summary', async (req, res) => {
  try {
    const stats = await get('SELECT * FROM dashboard_stats LIMIT 1');
    const coursesCount = await get('SELECT COUNT(*) as count FROM courses');
    const certsCount = await get('SELECT COUNT(*) as count FROM certificates');
    const activities = await query('SELECT * FROM activities ORDER BY id DESC LIMIT 5');

    res.json({
      stats: {
        total_courses: stats?.total_courses ?? coursesCount.count,
        certificates: stats?.certificates ?? certsCount.count,
        active_enrollments: stats?.active_enrollments ?? 0,
        pending_exams: stats?.pending_exams ?? 0
      },
      recent_activity: activities
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Failed to retrieve dashboard summary' });
  }
});

// 3. Courses: GET /api/courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await query('SELECT * FROM courses ORDER BY id DESC');
    res.json(courses);
  } catch (err) {
    console.error('Courses error:', err);
    res.status(500).json({ error: 'Failed to retrieve courses' });
  }
});

// 4. Certificates: GET /api/certificates
app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await query('SELECT * FROM certificates ORDER BY id DESC');
    res.json(certificates);
  } catch (err) {
    console.error('Certificates error:', err);
    res.status(500).json({ error: 'Failed to retrieve certificates' });
  }
});

// 4b. Certificate Download: GET /certificates/download/:id
app.get('/certificates/download/:id', (req, res) => {
  const email = (req.query.email || '').toLowerCase();
  let certFile = 'noc26-cs117-certificate.pdf';
  if (email.includes('hg4210') || email.includes('himanshu')) {
    certFile = 'noc26-cs117-certificate-himanshu.pdf';
  } else if (email.includes('pg7071') || email.includes('pratham')) {
    certFile = 'noc26-cs117-certificate-pratham.pdf';
  }
  let filePath = path.join(__dirname, '../client/public/certificates', certFile);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'client/dist/certificates', certFile);
  }
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'client/public/certificates', certFile);
  }
  res.download(filePath, certFile);
});

// 5. Halltickets: GET /api/halltickets
app.get('/api/halltickets', async (req, res) => {
  try {
    const halltickets = [
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
    ];
    res.json(halltickets);
  } catch (err) {
    console.error('Halltickets error:', err);
    res.status(500).json({ error: 'Failed to retrieve halltickets' });
  }
});

// 5b. Profile: GET /api/profile
const userProfiles = {
  'ss7495@srmist.edu.in': {
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
        { name: 'Photo', status: 'Approved', badge: 'bg-success' },
        { name: 'Signature', status: 'Approved', badge: 'bg-success' },
        { name: 'ID proof', status: 'Submitted', badge: 'bg-secondary' },
        { name: 'SC/ST document', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'PwD document', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Citizenship ID proof', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Residence proof', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'College letter', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Company letter', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' }
      ]
    }
  },
  'hg4210@srmist.edu.in': {
    personal: {
      fullName: 'Himanshu Golya',
      email: 'hg4210@srmist.edu.in',
      dob: '03 - 03 - 2004',
      gender: 'Male',
      mobile: '6267693668',
      alternatePhone: 'Not Set',
      role: 'Student',
      rollNo: 'RA2411043010079'
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
      rollNo: 'RA2411043010079',
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
        fullName: 'Himanshu Golya',
        mobile: '6267693668',
        alternateMobile: 'Not Set',
        gender: 'male',
        dob: '03 - 03 - 2004',
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
        { name: 'Photo', status: 'Approved', badge: 'bg-success' },
        { name: 'Signature', status: 'Approved', badge: 'bg-success' },
        { name: 'ID proof', status: 'Submitted', badge: 'bg-secondary' },
        { name: 'SC/ST document', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'PwD document', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Citizenship ID proof', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Residence proof', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'College letter', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Company letter', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' }
      ]
    }
  },
  'pg7071@srmist.edu.in': {
    personal: {
      fullName: 'Pratham Goyal',
      email: 'pg7071@srmist.edu.in',
      dob: '03 oct 2005',
      gender: 'Male',
      mobile: '8307469390',
      alternatePhone: 'Not Set',
      role: 'Student',
      rollNo: 'RA2411043010090'
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
      rollNo: 'RA2411043010090',
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
        fullName: 'Pratham Goyal',
        mobile: '8307469390',
        alternateMobile: 'Not Set',
        gender: 'male',
        dob: '03 oct 2005',
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
        { name: 'Photo', status: 'Approved', badge: 'bg-success' },
        { name: 'Signature', status: 'Approved', badge: 'bg-success' },
        { name: 'ID proof', status: 'Submitted', badge: 'bg-secondary' },
        { name: 'SC/ST document', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'PwD document', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Citizenship ID proof', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Residence proof', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'College letter', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' },
        { name: 'Company letter', note: ' — not submitted', status: 'Not submitted', badge: 'bg-secondary' }
      ]
    }
  }
};

app.get('/api/profile', async (req, res) => {
  let email = req.query.email;
  if (!email && req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded?.email) email = decoded.email;
    } catch (e) {}
  }
  if (!email) email = 'ss7495@srmist.edu.in';
  const profile = userProfiles[email] || userProfiles['ss7495@srmist.edu.in'];
  res.json(profile);
});

// 6. Reports: POST /api/reports
app.post('/api/reports', async (req, res) => {
  try {
    const { category, subject, description, user_email } = req.body;

    if (!category || !subject || !description) {
      return res.status(400).json({ error: 'Category, subject, and description are required.' });
    }

    const result = await run(
      'INSERT INTO reports (user_email, category, subject, description) VALUES (?, ?, ?, ?)',
      [user_email || 'anonymous@student.ac.in', category, subject, description]
    );

    res.status(201).json({
      message: 'Report submitted successfully. Our support team will investigate.',
      reportId: result.id
    });
  } catch (err) {
    console.error('Report error:', err);
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NPTEL Backend API', time: new Date() });
});

// Marksheet PDF: GET /profile/marksheet and /profile/marksheet/
app.get(['/profile/marksheet', '/profile/marksheet/'], (req, res) => {
  const email = (req.query.email || '').toLowerCase();
  let marksheetFile = 'NPTEL_Mark_Sheet.pdf';
  if (email.includes('hg4210') || email.includes('himanshu')) {
    marksheetFile = 'NPTEL_Mark_Sheet_himanshu.pdf';
  } else if (email.includes('pg7071') || email.includes('pratham')) {
    marksheetFile = 'NPTEL_Mark_Sheet_pratham.pdf';
  }
  let filePath = path.join(__dirname, '../client/public/marksheet', marksheetFile);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'client/dist/marksheet', marksheetFile);
  }
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'client/public/marksheet', marksheetFile);
  }
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${marksheetFile}"`);
  res.sendFile(filePath);
});

// Serve frontend build if available
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(clientDistPath, 'index.html'));
    }
    next();
  });
}

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`NPTEL Server listening on http://localhost:${PORT}`);
  });
}
