export const USER_SCORES_MAP = {
  'ss7495@srmist.edu.in': {
    name: 'SHASHWAT SINGH',
    fullName: 'Shashwat Singh',
    email: 'ss7495@srmist.edu.in',
    rollNo: 'NPTEL26CS117S373900741',
    assignment: '21.38',
    exam: '60.62',
    finalScore: '82.00',
    finalDisplay: '82.0',
    tier: 'Elite + Silver',
    tierClass: 'cert-tier-silver',
    isTopper: true,
    topperBadge: 'Top 5%',
    avgScore: '64.1%',
    certPdf: '/certificates/noc26-cs117-certificate-shashwat.pdf',
    certPng: '/certificates/noc26-cs117-certificate-shashwat.png',
    marksheetPdf: '/marksheet/NPTEL_Mark_Sheet_shashwat.pdf',
    assignmentsList: [
      { week: 'Week 1', name: 'Week 1 Assignment', max: 100, score: '100', pct: 100, submitted: true },
      { week: 'Week 2', name: 'Week 2 Assignment', max: 100, score: '-', pct: 0, submitted: false },
      { week: 'Week 3', name: 'Week 3 Assignment', max: 100, score: '-', pct: 0, submitted: false },
      { week: 'Week 4', name: 'Week 4 Assignment', max: 100, score: '90', pct: 90, submitted: true },
      { week: 'Week 5', name: 'Week 5 Assignment', max: 100, score: '85', pct: 85, submitted: true },
      { week: 'Week 6', name: 'Week 6 Assignment', max: 100, score: '85', pct: 85, submitted: true },
      { week: 'Week 7', name: 'Week 7 Assignment', max: 100, score: '80', pct: 80, submitted: true },
      { week: 'Week 8', name: 'Week 8 Assignment', max: 100, score: '73', pct: 73, submitted: true }
    ]
  },
  'hg4210@srmist.edu.in': {
    name: 'HIMANSHU GOLYA',
    fullName: 'Himanshu Golya',
    email: 'hg4210@srmist.edu.in',
    rollNo: 'NPTEL26CS117S373900719',
    assignment: '17.38',
    exam: '47.62',
    finalScore: '65.00',
    finalDisplay: '65.0',
    tier: 'Elite',
    tierClass: 'cert-tier-elite',
    isTopper: false,
    topperBadge: null,
    avgScore: '54.0%',
    certPdf: '/certificates/noc26-cs117-certificate-himanshu.pdf',
    certPng: '/certificates/noc26-cs117-certificate-himanshu.png',
    marksheetPdf: '/marksheet/NPTEL_Mark_Sheet_himanshu.pdf',
    assignmentsList: [
      { week: 'Week 1', name: 'Week 1 Assignment', max: 100, score: '80', pct: 80, submitted: true },
      { week: 'Week 2', name: 'Week 2 Assignment', max: 100, score: '70', pct: 70, submitted: true },
      { week: 'Week 3', name: 'Week 3 Assignment', max: 100, score: '-', pct: 0, submitted: false },
      { week: 'Week 4', name: 'Week 4 Assignment', max: 100, score: '65', pct: 65, submitted: true },
      { week: 'Week 5', name: 'Week 5 Assignment', max: 100, score: '75', pct: 75, submitted: true },
      { week: 'Week 6', name: 'Week 6 Assignment', max: 100, score: '70', pct: 70, submitted: true },
      { week: 'Week 7', name: 'Week 7 Assignment', max: 100, score: '-', pct: 0, submitted: false },
      { week: 'Week 8', name: 'Week 8 Assignment', max: 100, score: '72', pct: 72, submitted: true }
    ]
  },
  'pg7071@srmist.edu.in': {
    name: 'PRATHAM GOYAL',
    fullName: 'Pratham Goyal',
    email: 'pg7071@srmist.edu.in',
    rollNo: 'NPTEL26CS117S373900779',
    assignment: '17.78',
    exam: '49.22',
    finalScore: '67.00',
    finalDisplay: '67.0',
    tier: 'Elite',
    tierClass: 'cert-tier-elite',
    isTopper: false,
    topperBadge: null,
    avgScore: '55.8%',
    certPdf: '/certificates/noc26-cs117-certificate-pratham.pdf',
    certPng: '/certificates/noc26-cs117-certificate-pratham.png',
    marksheetPdf: '/marksheet/NPTEL_Mark_Sheet_pratham.pdf',
    assignmentsList: [
      { week: 'Week 1', name: 'Week 1 Assignment', max: 100, score: '85', pct: 85, submitted: true },
      { week: 'Week 2', name: 'Week 2 Assignment', max: 100, score: '75', pct: 75, submitted: true },
      { week: 'Week 3', name: 'Week 3 Assignment', max: 100, score: '-', pct: 0, submitted: false },
      { week: 'Week 4', name: 'Week 4 Assignment', max: 100, score: '68', pct: 68, submitted: true },
      { week: 'Week 5', name: 'Week 5 Assignment', max: 100, score: '72', pct: 72, submitted: true },
      { week: 'Week 6', name: 'Week 6 Assignment', max: 100, score: '70', pct: 70, submitted: true },
      { week: 'Week 7', name: 'Week 7 Assignment', max: 100, score: '-', pct: 0, submitted: false },
      { week: 'Week 8', name: 'Week 8 Assignment', max: 100, score: '76', pct: 76, submitted: true }
    ]
  }
};

export const getUserScoreData = (email) => {
  const cleanEmail = email?.trim()?.toLowerCase();
  return USER_SCORES_MAP[cleanEmail] || USER_SCORES_MAP['ss7495@srmist.edu.in'];
};
