const TOKEN_KEY = 'tds_token';
const USERS_KEY = 'tds_demo_users';
const CURRENT_USER_KEY = 'tds_current_user';
const SAMPLES_KEY = 'tds_demo_samples';
const REPORTS_KEY = 'tds_demo_reports';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(t) {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
}

// Generate simple SVG QR Code data URL
function generateSampleQr(code) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" fill="#ffffff"/><rect x="15" y="15" width="40" height="40" fill="#0f172a"/><rect x="25" y="25" width="20" height="20" fill="#ffffff"/><rect x="105" y="15" width="40" height="40" fill="#0f172a"/><rect x="115" y="25" width="20" height="20" fill="#ffffff"/><rect x="15" y="105" width="40" height="40" fill="#0f172a"/><rect x="25" y="115" width="20" height="20" fill="#ffffff"/><rect x="65" y="20" width="10" height="30" fill="#0f172a"/><rect x="85" y="25" width="10" height="20" fill="#0f172a"/><rect x="65" y="65" width="30" height="30" fill="#0f172a"/><rect x="75" y="75" width="10" height="10" fill="#ffffff"/><rect x="20" y="65" width="35" height="10" fill="#0f172a"/><rect x="25" y="85" width="20" height="10" fill="#0f172a"/><rect x="105" y="65" width="20" height="15" fill="#0f172a"/><rect x="135" y="70" width="10" height="25" fill="#0f172a"/><rect x="65" y="105" width="15" height="40" fill="#0f172a"/><rect x="90" y="115" width="30" height="10" fill="#0f172a"/><rect x="130" y="105" width="15" height="40" fill="#0f172a"/><text x="80" y="155" font-size="8" text-anchor="middle" font-family="monospace" fill="#64748b">${code}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const DEFAULT_SAMPLES = [
  {
    id: 'smp-demo-1',
    sampleCode: 'SMP-LAB01-8842',
    qrToken: 'qr-token-8842',
    testName: 'Complete Blood Count (CBC) + Iron Profile',
    status: 'completed',
    collectedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    dispatchedAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    processingAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: 'Fast-track screening. Sample temperature maintained at 4°C.',
    labName: 'Central Diagnostic Lab & Research',
    patientEmail: 'patient@demo.com'
  },
  {
    id: 'smp-demo-2',
    sampleCode: 'SMP-LAB01-9921',
    qrToken: 'qr-token-9921',
    testName: 'Lipid Profile & Liver Function Test (LFT)',
    status: 'processing',
    collectedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    dispatchedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    processingAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    completedAt: null,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    notes: 'Sample centrifuge completed. Automated biochemical analysis in progress.',
    labName: 'Central Diagnostic Lab & Research',
    patientEmail: 'patient@demo.com'
  },
  {
    id: 'smp-demo-3',
    sampleCode: 'SMP-LAB01-1044',
    qrToken: 'qr-token-1044',
    testName: 'Digital Radiographic Study (Limb)',
    status: 'completed',
    collectedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    dispatchedAt: new Date(Date.now() - 86400000 * 3.8).toISOString(),
    processingAt: new Date(Date.now() - 86400000 * 3.5).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    notes: 'High-resolution AP & Lateral views.',
    labName: 'Central Diagnostic Lab & Research',
    patientEmail: 'patient@demo.com'
  }
];

const DEFAULT_REPORTS = [
  {
    id: 'rep-demo-1',
    reportCode: 'REP-CBC-8842',
    sampleId: 'smp-demo-1',
    sampleCode: 'SMP-LAB01-8842',
    testName: 'Complete Blood Count (CBC)',
    originalFilename: 'CBC_Iron_Report_Verified.pdf',
    blockchainHash: '0x8f2d4e1a7b9c3e5f6a8b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f',
    isSealed: true,
    createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    labName: 'Central Diagnostic Lab & Research',
    patientEmail: 'patient@demo.com',
    analysis: {
      summary: 'Your report indicates slightly low Hemoglobin (11.2 g/dL), suggesting mild nutritional anemia. White blood cell counts, platelets, and other parameters are healthy.',
      structured: [
        { parameter: 'Hemoglobin', value: '11.2', unit: 'g/dL', range: '13.0 - 17.0', status: 'low' },
        { parameter: 'WBC (Total)', value: '6.5', unit: '10^3/uL', range: '4.0 - 11.0', status: 'normal' },
        { parameter: 'Platelet Count', value: '245', unit: '10^3/uL', range: '150 - 450', status: 'normal' },
        { parameter: 'RBC Count', value: '4.2', unit: '10^6/uL', range: '4.5 - 5.9', status: 'low' },
        { parameter: 'PCV / Hematocrit', value: '35.4', unit: '%', range: '40.0 - 50.0', status: 'low' }
      ],
      risk_flags: [
        'Low Hemoglobin (11.2 g/dL) - Mild Anemia',
        'Dietary iron and Vitamin C supplementation recommended'
      ]
    }
  },
  {
    id: 'rep-demo-2',
    reportCode: 'REP-RAD-1044',
    sampleId: 'smp-demo-3',
    sampleCode: 'SMP-LAB01-1044',
    testName: 'Digital Radiographic Study (Limb)',
    originalFilename: 'Digital_Radiography_Scan.pdf',
    blockchainHash: '0x3c5a7f9b1e2d4c6a8e0f2b4d6a8c0e2f4a6b8d0e2f4a6c8e0b2d4f6a8c0e2a4b',
    isSealed: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    labName: 'Central Diagnostic Lab & Research',
    patientEmail: 'patient@demo.com',
    analysis: {
      summary: 'Radiographic scan demonstrates a hairline cortical fracture with associated soft tissue edema. No displacement of bone fragments.',
      structured: [
        { parameter: 'Fracture Type', value: 'Hairline Fissure', unit: '-', range: 'None', status: 'abnormal' },
        { parameter: 'Bone Alignment', value: 'Anatomical', unit: '-', range: 'Normal', status: 'normal' },
        { parameter: 'Soft Tissue', value: 'Mild Edema', unit: '-', range: 'None', status: 'abnormal' }
      ],
      risk_flags: [
        'Hairline fracture identified - Clinical immobilization & Orthopedic consultation required'
      ]
    }
  }
];

function getStoredSamples() {
  const raw = localStorage.getItem(SAMPLES_KEY);
  if (!raw) {
    localStorage.setItem(SAMPLES_KEY, JSON.stringify(DEFAULT_SAMPLES));
    return DEFAULT_SAMPLES;
  }
  try { return JSON.parse(raw); } catch { return DEFAULT_SAMPLES; }
}

function saveStoredSamples(samples) {
  localStorage.setItem(SAMPLES_KEY, JSON.stringify(samples));
}

function getStoredReports() {
  const raw = localStorage.getItem(REPORTS_KEY);
  if (!raw) {
    localStorage.setItem(REPORTS_KEY, JSON.stringify(DEFAULT_REPORTS));
    return DEFAULT_REPORTS;
  }
  try { return JSON.parse(raw); } catch { return DEFAULT_REPORTS; }
}

function saveStoredReports(reports) {
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

export function getCurrentUser() {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function saveCurrentUser(user, lab = null) {
  if (!user) {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem('tds_current_lab');
  } else {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    if (lab) localStorage.setItem('tds_current_lab', JSON.stringify(lab));
  }
}

export function getCurrentLab() {
  const raw = localStorage.getItem('tds_current_lab');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

// Multilingual Mock AI Chat (Telugu, Hindi, English)
export function runMockAiChat(message, context = '') {
  const msg = (message || '').toLowerCase();
  const ctx = (context || '').toLowerCase();
  
  const isTelugu = msg.includes('ela') || msg.includes('cheppu') || msg.includes('endi') || 
                   msg.includes('undali') || msg.includes('kadu') || msg.includes('bagunda') || 
                   msg.includes('enti') || msg.includes('namaste') || msg.includes('report') || msg.includes('emi');
  const isHindi = msg.includes('kya') || msg.includes('hai') || msg.includes('nahi') || 
                  msg.includes('kaise') || msg.includes('karo') || msg.includes('namaste') ||
                  msg.includes('batao') || msg.includes('bataiye');
  
  const isTip = msg.includes('tip') || msg.includes('how') || msg.includes('tips') || msg.includes('jagratha') || msg.includes('upay');
  const isDiet = msg.includes('diet') || msg.includes('food') || msg.includes('eat') || msg.includes('thinali') || msg.includes('khao') || msg.includes('bhojan');
  const isFracture = ctx.includes('fracture') || msg.includes('fracture') || msg.includes('bone') || msg.includes('x-ray') || msg.includes('xray');

  let reply = '';
  let disclaimer = '';

  if (isTelugu) {
    disclaimer = 'Idi AI Diagnostic Assistant mathrame. Doctor ni tappakunda kalavandi.';
    if (isFracture) {
      reply = 'Mee X-Ray report lo chinna hairline fracture undi andi. Kangarupadakandi, ventane oka Orthopedic doctor ni kalisi treatment theesukondi.';
      if (isDiet || isTip) reply += ' Calcium and Vitamin-D unna aaharam (Paalu, Gudlu) theesukunte bone twaraga atthukuntundi. Cheyyi ni ekkuva kadapakandi.';
    } else {
      reply = 'Mee blood report lo Hemoglobin (11.2 g/dL) thakkuva ga undi, idi mild anemia ni soochisthundi. Doctor ni kalavadam manchidi.';
      if (isDiet) reply = 'Hemoglobin penchukodaniki Aaku kooralu (Palakura), Dates (Kharjooram), Beetroot, and Iron-rich food theesukondi andi.';
      else if (isTip) reply = 'Baga rest theesukondi, neellu baaga thagandi, doubts unte doctor ni consult avvandi.';
    }
  } else if (isHindi) {
    disclaimer = 'Yeh AI Assistant sirf guidance ke liye hai. Kripaya doctor se salah lein.';
    if (isFracture) {
      reply = 'Aapke report mein ek hairline fracture dikh raha hai. Ghabrayein nahi, par jald hi Orthopedic doctor se miliye.';
      if (isDiet || isTip) reply += ' Calcium aur Vitamin-D wali cheezein (Doodh, Ande) khayein aur aaram karein.';
    } else {
      reply = 'Aapke blood report mein Hemoglobin (11.2) thoda kam hai, jo mild anemia ho sakta hai.';
      if (isDiet) reply = 'Hemoglobin badhane ke liye Palak, Khajoor, Beetroot aur Iron-rich bhojan lein.';
      else if (isTip) reply = 'Aaram karein, paani khoob piyein aur swasth aahar lein.';
    }
  } else {
    disclaimer = 'This AI assistant provides general health guidance based on your reports. Always consult your doctor.';
    if (isFracture) {
      reply = 'I notice an undisplaced hairline fracture in your radiographic study. Please schedule an Orthopedic consultation for proper splinting.';
      if (isDiet || isTip) reply += ' Ensure you consume calcium and Vitamin D rich foods (milk, eggs) and keep the limb rested.';
    } else {
      reply = 'Your hemoglobin level (11.2 g/dL) is slightly below the reference range, pointing to mild iron deficiency anemia.';
      if (isDiet) reply = 'To support your hemoglobin, include iron-rich foods such as spinach, lentils, beetroot, raisins, and Vitamin-C for improved iron absorption.';
      else if (isTip) reply = 'Ensure adequate hydration, balanced nutrition, and discuss these results with your physician during your next check-up.';
    }
  }

  return { reply, disclaimer };
}

// Full mock API dispatcher
export async function handleMockApi(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body && typeof options.body === 'string' ? JSON.parse(options.body) : (options.body || {});

  // /auth/me
  if (path === '/auth/me') {
    const user = getCurrentUser();
    if (!user) {
      const err = new Error('Unauthorized');
      err.status = 401;
      throw err;
    }
    const lab = user.role === 'lab' ? (getCurrentLab() || {
      id: 'lab-demo-01',
      name: 'Central Diagnostic Lab & Research',
      accreditation: 'NABL & ICMR Certified',
      rating: 4.8,
      processingDetails: 'Automated 6-stage testing pipeline with AI verification.'
    }) : null;
    return { user, lab };
  }

  // /auth/login
  if (path === '/auth/login') {
    const email = body.email || 'patient@demo.com';
    const isLab = email.toLowerCase().includes('lab');
    const user = {
      id: isLab ? 'usr-lab-01' : 'usr-patient-01',
      email,
      fullName: isLab ? 'Central Diagnostic Lab' : (email.split('@')[0] || 'Demo Patient'),
      role: isLab ? 'lab' : 'patient',
      createdAt: new Date().toISOString(),
    };
    const lab = isLab ? {
      id: 'lab-demo-01',
      name: 'Central Diagnostic Lab & Research',
      accreditation: 'NABL & ICMR Certified',
      rating: 4.8,
      processingDetails: 'Automated 6-stage testing pipeline with AI verification.'
    } : null;
    const token = 'mock-jwt-token-' + Date.now();
    setToken(token);
    saveCurrentUser(user, lab);
    return { token, user, lab };
  }

  // /auth/register
  if (path === '/auth/register') {
    const role = body.role || 'patient';
    const user = {
      id: 'usr-' + Date.now(),
      email: body.email,
      fullName: body.fullName || 'User',
      role,
      createdAt: new Date().toISOString(),
    };
    const lab = role === 'lab' ? {
      id: 'lab-' + Date.now(),
      name: body.labName || 'Diagnostic Lab',
      accreditation: body.accreditation || 'NABL Certified',
      rating: body.rating || 4.5,
      processingDetails: body.processingDetails || 'Standard automated diagnostic pipeline.'
    } : null;
    const token = 'mock-jwt-token-' + Date.now();
    setToken(token);
    saveCurrentUser(user, lab);
    return { token, user, lab };
  }

  // /chat and /chat/public
  if (path === '/chat' || path === '/chat/public') {
    const msg = body.message || '';
    const ctx = body.context || '';
    return runMockAiChat(msg, ctx);
  }

  // /samples/patient or /samples
  if (path === '/samples/patient' || path === '/samples') {
    const samples = getStoredSamples();
    const user = getCurrentUser();
    if (user?.role === 'patient') {
      return { samples: samples.filter(s => !s.patientEmail || s.patientEmail === user.email || s.patientEmail === 'patient@demo.com') };
    }
    return { samples };
  }

  // /samples/track/:code
  if (path.startsWith('/samples/track/')) {
    const code = decodeURIComponent(path.replace('/samples/track/', '')).toUpperCase();
    const samples = getStoredSamples();
    const sample = samples.find(s => s.sampleCode.toUpperCase() === code) || {
      id: 'smp-lookup-' + code,
      sampleCode: code,
      testName: 'General Clinical Diagnostic Profile',
      status: 'processing',
      collectedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      dispatchedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      processingAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      completedAt: null,
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      notes: 'Diagnostic tracking record located.',
      labName: 'Central Diagnostic Lab & Research'
    };
    return { sample };
  }

  // /samples/claim
  if (path === '/samples/claim') {
    const code = (body.sampleCode || '').toUpperCase();
    const samples = getStoredSamples();
    const existing = samples.find(s => s.sampleCode.toUpperCase() === code);
    const user = getCurrentUser();
    if (existing) {
      existing.patientEmail = user?.email || 'patient@demo.com';
      saveStoredSamples(samples);
      return { ok: true, sample: existing };
    }
    const newSample = {
      id: 'smp-' + Date.now(),
      sampleCode: code,
      testName: 'Claimed Diagnostic Panel',
      status: 'processing',
      collectedAt: new Date().toISOString(),
      dispatchedAt: null,
      processingAt: null,
      completedAt: null,
      createdAt: new Date().toISOString(),
      notes: 'Claimed by patient.',
      labName: 'Central Diagnostic Lab & Research',
      patientEmail: user?.email || 'patient@demo.com'
    };
    samples.unshift(newSample);
    saveStoredSamples(samples);
    return { ok: true, sample: newSample };
  }

  // /samples/:id/status
  if (path.includes('/status') && method === 'PATCH') {
    const id = path.split('/')[2];
    const status = body.status;
    const samples = getStoredSamples();
    const s = samples.find(x => x.id === id);
    if (s) {
      s.status = status;
      const now = new Date().toISOString();
      if (status === 'dispatched' && !s.dispatchedAt) s.dispatchedAt = now;
      if (status === 'processing' && !s.processingAt) s.processingAt = now;
      if (status === 'completed' && !s.completedAt) s.completedAt = now;
      saveStoredSamples(samples);
    }
    return { ok: true, sample: s };
  }

  // /samples/:id/qr
  if (path.includes('/qr') && method === 'GET') {
    const id = path.split('/')[2];
    const samples = getStoredSamples();
    const s = samples.find(x => x.id === id) || { sampleCode: 'SMP-SAMPLE-QR' };
    return {
      sampleCode: s.sampleCode,
      qrToken: 'qr-' + id,
      qrDataUrl: generateSampleQr(s.sampleCode)
    };
  }

  // POST /samples (create sample by lab)
  if (path === '/samples' && method === 'POST') {
    const code = 'SMP-LAB01-' + Math.floor(1000 + Math.random() * 9000);
    const newSample = {
      id: 'smp-' + Date.now(),
      sampleCode: code,
      qrToken: 'qr-' + Date.now(),
      testName: body.testName || 'Comprehensive Health Check',
      patientEmail: body.patientEmail || '',
      notes: body.notes || 'Routine sample collected.',
      status: 'collected',
      collectedAt: new Date().toISOString(),
      dispatchedAt: null,
      processingAt: null,
      completedAt: null,
      createdAt: new Date().toISOString(),
      labName: 'Central Diagnostic Lab & Research'
    };
    const samples = getStoredSamples();
    samples.unshift(newSample);
    saveStoredSamples(samples);
    return {
      sample: newSample,
      qrToken: newSample.qrToken,
      qrDataUrl: generateSampleQr(newSample.sampleCode)
    };
  }

  // /reports
  if (path === '/reports') {
    const reports = getStoredReports();
    return { reports };
  }

  // /reports/:id
  if (path.startsWith('/reports/')) {
    const id = path.replace('/reports/', '');
    const reports = getStoredReports();
    const rep = reports.find(r => r.id === id || r.reportCode === id) || reports[0];
    return {
      report: rep,
      analysis: rep.analysis || {
        summary: 'AI diagnostic scan completed. All tested biological indices are verified.',
        structured: [
          { parameter: 'Verification Status', value: 'Complete', unit: '-', range: 'Normal', status: 'normal' }
        ],
        risk_flags: []
      }
    };
  }

  // /lab/metrics
  if (path === '/lab/metrics') {
    const samples = getStoredSamples();
    const reports = getStoredReports();
    return {
      totalSamples: samples.length + 12,
      pendingTests: samples.filter(s => s.status !== 'completed').length,
      completedReports: reports.length + 18,
      avgTurnaroundHours: 3.8
    };
  }

  // Default fallback
  return { ok: true, data: [] };
}
