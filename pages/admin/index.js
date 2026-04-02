import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AdminPanel() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', token }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        fetchServices();
      } else {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      router.push('/admin/login');
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      setError('Failed to fetch services');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/services/${editingId}` : '/api/services';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save service');
      }

      setSuccess(editingId ? 'Service updated successfully!' : 'Service added successfully!');
      setFormData({ name: '', description: '', category: '', price: '', image: '' });
      setEditingId(null);
      fetchServices();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      category: service.category,
      price: service.price.toString(),
      image: service.image || '',
    });
    setEditingId(service.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setSuccess('Service deleted successfully!');
      fetchServices();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '', category: '', price: '', image: '' });
    setEditingId(null);
    setError('');
  };

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout', token }),
      });

      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-brand-yellow mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-brand-yellow py-6 px-4 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">Admin Panel</h1>
            <p className="text-sm md:text-base text-yellow-300">Manage Services</p>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300">
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-fade-in flex items-center">
            <span className="mr-2">⚠️</span>
            <span className="font-semibold">{error}</span>
            <button onClick={() => setError('')} className="ml-auto text-red-700 hover:text-red-900">✕</button>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg animate-fade-in flex items-center">
            <span className="mr-2">✓</span>
            <span className="font-semibold">{success}</span>
            <button onClick={() => setSuccess('')} className="ml-auto text-green-700 hover:text-green-900">✕</button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-2xl">
              {editingId ? '✏️' : '➕'}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              {editingId ? 'Edit Service' : 'Add New Service'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Service Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="e.g., Expert Plumbing Service"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="input-field resize-none"
                placeholder="Describe the service in detail..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                >
                  <option value="">Select Category</option>
                  <option value="Automobile">🚗 Automobile Engineers</option>
                  <option value="Electrical">⚡ Electricians</option>
                  <option value="Plumbing">🔧 Plumbers</option>
                  <option value="Construction">🏗️ Masons</option>
                  <option value="Cleaning">🧹 Cleaners</option>
                  <option value="Other">⚙️ Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price/Rate (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  className="input-field"
                  placeholder="500.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Image URL (optional)</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="input-field"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  editingId ? '💾 Update Service' : '➕ Add Service'
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-2xl">
                📋
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                All Services ({services.length})
              </h2>
            </div>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-xl text-gray-600 font-semibold">No services added yet</p>
              <p className="text-gray-500 mt-2">Create your first service above to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider hidden md:table-cell">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">Description</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {services.map(service => (
                    <tr key={service.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{service.name}</div>
                        <div className="md:hidden text-sm text-gray-600 mt-1">{service.category}</div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="inline-block bg-brand-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
                          {service.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell max-w-xs">
                        <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-lg font-bold text-brand-yellow">₹{service.price.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-black text-white py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2026 Help-Me Admin Panel</p>
        </div>
      </footer>
    </div>
  );
}
