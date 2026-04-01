import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        // Redirect to admin panel
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#000', color: '#FFD700', padding: '20px', textAlign: 'center' }}>
        <h1>Help-Me Admin</h1>
        <p>Secure Login</p>
      </header>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000 0%, #333 100%)',
        padding: '20px',
      }}>
        <div style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          width: '100%',
          maxWidth: '400px',
        }}>
          <h2 style={{ color: '#000', marginBottom: '30px', textAlign: 'center' }}>Admin Login</h2>

          {error && (
            <div style={{
              background: '#fee',
              color: '#c33',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '20px',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#333',
              }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  boxSizing: 'border-box',
                  fontSize: '16px',
                }}
                placeholder="Enter username"
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#333',
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  boxSizing: 'border-box',
                  fontSize: '16px',
                }}
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                background: '#FFD700',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '13px',
            color: '#666',
          }}>
            <strong>Demo Credentials:</strong>
            <br />
            Username: <code style={{ background: '#fff' }}>admin</code>
            <br />
            Password: <code style={{ background: '#fff' }}>admin123</code>
            <br />
            <em style={{ color: '#999' }}>Change these credentials for production!</em>
          </div>
        </div>
      </div>

      <footer style={{
        background: '#000',
        color: '#fff',
        textAlign: 'center',
        padding: '15px',
      }}>
        © 2026 Help-Me Admin Portal
      </footer>
    </div>
  );
}
