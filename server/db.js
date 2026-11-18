import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory data store for serverless (Vercel) / read-only environments
const memoryStore = {
  users: [
    { id: 1, email: 'student@example.com', name: 'Student User', institution: 'SRM Institute of Science and Technology' },
    { id: 2, email: 'ss7495@srmist.edu.in', name: 'Shashwat Singh', institution: 'SRM Institute of Science and Technology - Kattankulathur Campus' },
    { id: 3, email: 'hg4210@srmist.edu.in', name: 'Himanshu Golya', institution: 'SRM Institute of Science and Technology - Kattankulathur Campus' },
    { id: 4, email: 'pg7071@srmist.edu.in', name: 'Pratham Goyal', institution: 'SRM Institute of Science and Technology - Kattankulathur Campus' }
  ],
  courses: [
    {
      id: 1,
      title: 'Data Base Management System',
      code: 'noc26-cs117',
      session: 'Jul-Dec 2026',
      status: 'Enrolled',
      institute: 'IIT Kharagpur',
      instructor: 'Prof. Partha Pratim Das',
      credits: 3,
      enrolled_date: 'Jul 2026'
    }
  ],
  certificates: [
    {
      id: 1,
      course_id: 1,
      course_title: 'Data Base Management System',
      course_code: 'noc26-cs117',
      session: 'Jul-Dec 2026',
      issue_date: 'Dec 2026',
      score: 88,
      type: 'Elite + Silver',
      download_url: '#'
    }
  ],
  activities: [
    {
      id: 1,
      title: 'Data Base Management System',
      subtitle: 'noc26-cs117 - Jul-Dec 2026',
      badge_text: 'Enrolled',
      badge_type: 'success',
      action_url: '/courses'
    }
  ],
  dashboard_stats: {
    total_courses: 1,
    certificates: 1,
    active_enrollments: 0,
    pending_exams: 0
  },
  reports: []
};

let db = null;

// Only load sqlite3 on local development when NOT in Vercel
if (!process.env.VERCEL) {
  try {
    const mod = 'sqlite3';
    const sqlite3Module = (await import(mod)).default;
    const dbPath = path.join(__dirname, 'nptel.db');
    db = new sqlite3Module.Database(dbPath);
  } catch (e) {
    console.warn('SQLite init warning, using in-memory store:', e.message);
  }
}

export const query = (sql, params = []) => {
  return new Promise((resolve) => {
    if (!db) {
      return resolve(fallbackQuery(sql, params));
    }
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.warn('Database query error, falling back to memory store:', err.message);
        resolve(fallbackQuery(sql, params));
      } else {
        resolve(rows);
      }
    });
  });
};

export const get = (sql, params = []) => {
  return new Promise((resolve) => {
    if (!db) {
      return resolve(fallbackGet(sql, params));
    }
    db.get(sql, params, (err, row) => {
      if (err) {
        console.warn('Database get error, falling back to memory store:', err.message);
        resolve(fallbackGet(sql, params));
      } else {
        resolve(row);
      }
    });
  });
};

export const run = (sql, params = []) => {
  return new Promise((resolve) => {
    if (!db) {
      return resolve(fallbackRun(sql, params));
    }
    db.run(sql, params, function (err) {
      if (err) {
        console.warn('Database run error, falling back to memory store:', err.message);
        resolve(fallbackRun(sql, params));
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
};

function fallbackGet(sql, params) {
  const lower = sql.toLowerCase();
  if (lower.includes('from users where email =')) {
    const email = (params[0] || '').toLowerCase();
    const user = memoryStore.users.find(u => u.email.toLowerCase() === email);
    return user || null;
  }
  if (lower.includes('from users where id =')) {
    const user = memoryStore.users.find(u => u.id === params[0]);
    return user || null;
  }
  if (lower.includes('from dashboard_stats')) {
    return memoryStore.dashboard_stats;
  }
  if (lower.includes('count(*) as count from courses')) {
    return { count: memoryStore.courses.length };
  }
  if (lower.includes('count(*) as count from certificates')) {
    return { count: memoryStore.certificates.length };
  }
  if (lower.includes('count(*) as count from users')) {
    return { count: memoryStore.users.length };
  }
  if (lower.includes('count(*) as count from halltickets')) {
    return { count: 1 };
  }
  if (lower.includes('count(*) as count from activities')) {
    return { count: memoryStore.activities.length };
  }
  return null;
}

function fallbackQuery(sql, params) {
  const lower = sql.toLowerCase();
  if (lower.includes('from courses')) {
    return memoryStore.courses;
  }
  if (lower.includes('from certificates')) {
    return memoryStore.certificates;
  }
  if (lower.includes('from activities')) {
    return memoryStore.activities;
  }
  if (lower.includes('from users')) {
    return memoryStore.users;
  }
  return [];
}

function fallbackRun(sql, params) {
  const lower = sql.toLowerCase();
  if (lower.includes('insert into users')) {
    const newUser = {
      id: memoryStore.users.length + 1,
      email: params[0],
      name: params[2] || 'Student User',
      institution: params[3] || 'SRM Institute of Science and Technology'
    };
    memoryStore.users.push(newUser);
    return { id: newUser.id, changes: 1 };
  }
  if (lower.includes('insert into reports')) {
    memoryStore.reports.push({ id: memoryStore.reports.length + 1, params });
    return { id: memoryStore.reports.length, changes: 1 };
  }
  return { id: 1, changes: 1 };
}

export const initDb = async () => {
  if (!db) return;
  try {
    // Create tables
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        institution TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        code TEXT NOT NULL,
        session TEXT NOT NULL,
        status TEXT NOT NULL,
        institute TEXT DEFAULT 'IIT Madras',
        instructor TEXT DEFAULT 'Prof. P.P. Das',
        credits INTEGER DEFAULT 3,
        enrolled_date TEXT DEFAULT 'Jul 2026'
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS certificates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        course_title TEXT NOT NULL,
        course_code TEXT NOT NULL,
        session TEXT NOT NULL,
        issue_date TEXT NOT NULL,
        score INTEGER NOT NULL,
        type TEXT NOT NULL,
        download_url TEXT
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS halltickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        course_title TEXT NOT NULL,
        course_code TEXT NOT NULL,
        exam_date TEXT NOT NULL,
        session_time TEXT NOT NULL,
        exam_center TEXT NOT NULL,
        status TEXT NOT NULL
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        badge_text TEXT NOT NULL,
        badge_type TEXT DEFAULT 'success',
        action_url TEXT DEFAULT '/courses',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS dashboard_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        total_courses INTEGER DEFAULT 1,
        certificates INTEGER DEFAULT 1,
        active_enrollments INTEGER DEFAULT 0,
        pending_exams INTEGER DEFAULT 0
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_email TEXT,
        category TEXT NOT NULL,
        subject TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed Users
    const userCount = await get(`SELECT COUNT(*) as count FROM users`);
    if (!userCount || userCount.count === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await run(
        `INSERT INTO users (email, password, name, institution) VALUES (?, ?, ?, ?)`,
        ['student@example.com', hashedPassword, 'Student User', 'SRM Institute of Science and Technology']
      );
      await run(
        `INSERT INTO users (email, password, name, institution) VALUES (?, ?, ?, ?)`,
        ['ss7495@srmist.edu.in', hashedPassword, 'Shashwat Singh', 'SRM Institute of Science and Technology']
      );
      await run(
        `INSERT INTO users (email, password, name, institution) VALUES (?, ?, ?, ?)`,
        ['hg4210@srmist.edu.in', hashedPassword, 'Himanshu Golya', 'SRM Institute of Science and Technology']
      );
      await run(
        `INSERT INTO users (email, password, name, institution) VALUES (?, ?, ?, ?)`,
        ['pg7071@srmist.edu.in', hashedPassword, 'Pratham Goyal', 'SRM Institute of Science and Technology']
      );
    }
  } catch (err) {
    console.warn('initDb warning:', err.message);
  }
};

export default db;
