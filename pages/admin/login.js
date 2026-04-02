import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
        localStorage.setItem('adminToken', data.token);
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-black text-brand-yellow py-6 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Help-Me Admin</h1>
          <p className="text-sm md:text-base text-yellow-300 mt-1">Secure Login Portal</p>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-brand-yellow rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-brand-yellow rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 transform transition-all duration-300 hover:shadow-3xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-yellow rounded-full mb-4">
                <span className="text-4xl">🔐</span>
              </div>
              <h2 className="text-3xl font-bold text-black mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to manage services</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  <span className="font-semibold">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="input-field"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Username:</span>
                  <code className="bg-white px-2 py-1 rounded font-mono text-black font-semibold">admin</code>
                </div>
                <div className="flex items-center justify-between">
                  <span>Password:</span>
                  <code className="bg-white px-2 py-1 rounded font-mono text-black font-semibold">admin123</code>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">Change these credentials for production!</p>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-gray-600 hover:text-brand-yellow font-semibold transition-colors duration-300">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black text-white py-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2026 Help-Me Admin Portal</p>
        </div>
      </footer>
    </div>
  );
}
