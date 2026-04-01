import { verifyCredentials, createSession, deleteSession, verifySessionToken, getSessions } from '../../../lib/auth';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { action, username, password, token } = req.body;

    if (action === 'login') {
      // Verify credentials
      if (verifyCredentials(username, password)) {
        const sessionToken = createSession(username);
        res.setHeader('Set-Cookie', `adminToken=${sessionToken}; Path=/; HttpOnly; Max-Age=86400`);
        return res.status(200).json({ 
          success: true, 
          message: 'Login successful',
          token: sessionToken,
        });
      } else {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid username or password' 
        });
      }
    } else if (action === 'logout') {
      if (token) {
        deleteSession(token);
      }
      res.setHeader('Set-Cookie', 'adminToken=; Path=/; HttpOnly; Max-Age=0');
      return res.status(200).json({ 
        success: true, 
        message: 'Logout successful' 
      });
    } else if (action === 'verify') {
      // Verify if token is valid
      const tokenToVerify = token || req.cookies?.adminToken;
      if (tokenToVerify && verifySessionToken(tokenToVerify)) {
        const sessions = getSessions();
        const session = sessions[tokenToVerify];
        return res.status(200).json({ 
          success: true, 
          username: session?.username 
        });
      }
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired session' 
      });
    }

    return res.status(400).json({ error: 'Invalid action' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
