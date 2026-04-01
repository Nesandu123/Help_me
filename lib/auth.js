import fs from 'fs';
import path from 'path';

const credentialsFile = path.join(process.cwd(), 'admin-credentials.json');

// Default admin credentials
const defaultCredentials = {
  username: 'admin',
  password: 'admin123', // Change this in production!
};

// Get credentials from file or use defaults
export function getAdminCredentials() {
  try {
    if (fs.existsSync(credentialsFile)) {
      const data = fs.readFileSync(credentialsFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading credentials:', error);
  }
  return defaultCredentials;
}

// Verify credentials
export function verifyCredentials(username, password) {
  const credentials = getAdminCredentials();
  return username === credentials.username && password === credentials.password;
}

// Get sessions file path
export function getSessionsFilePath() {
  return path.join(process.cwd(), '.sessions.json');
}

// Get stored sessions
export function getSessions() {
  try {
    const filePath = getSessionsFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading sessions:', error);
  }
  return {};
}

// Save sessions
export function saveSessions(sessions) {
  try {
    const filePath = getSessionsFilePath();
    fs.writeFileSync(filePath, JSON.stringify(sessions, null, 2));
  } catch (error) {
    console.error('Error saving sessions:', error);
  }
}

// Generate session token
export function generateSessionToken() {
  return require('crypto').randomBytes(32).toString('hex');
}

// Verify session token
export function verifySessionToken(token) {
  const sessions = getSessions();
  const session = sessions[token];
  
  if (!session) {
    return false;
  }

  // Check if session has expired (24 hours)
  const sessionAge = Date.now() - session.createdAt;
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  if (sessionAge > maxAge) {
    delete sessions[token];
    saveSessions(sessions);
    return false;
  }

  return true;
}

// Create session
export function createSession(username) {
  const token = generateSessionToken();
  const sessions = getSessions();
  
  sessions[token] = {
    username,
    createdAt: Date.now(),
  };

  saveSessions(sessions);
  return token;
}

// Delete session
export function deleteSession(token) {
  const sessions = getSessions();
  delete sessions[token];
  saveSessions(sessions);
}
