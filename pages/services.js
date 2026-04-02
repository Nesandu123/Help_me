import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Automobile', 'Electrical', 'Plumbing', 'Construction', 'Cleaning', 'Other'];

  const categoryIcons = {
    'All': '🔍',
    'Automobile': '🚗',
    'Electrical': '⚡',
    'Plumbing': '🔧',
    'Construction': '🏗️',
    'Cleaning': '🧹',
    'Other': '⚙️',
  };

  const filteredServices = services
    .filter(service => selectedCategory === 'All' || service.category === selectedCategory)
    .filter(service =>
      searchQuery === '' ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-brand-yellow py-6 px-4 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Help-Me Services</h1>
            <p className="text-sm md:text-base text-yellow-300">Browse and connect with professionals</p>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-brand-yellow hover:text-yellow-300 font-semibold transition-colors duration-300">
              Home
            </Link>
            <Link href="/admin" className="text-brand-yellow hover:text-yellow-300 font-semibold transition-colors duration-300">
              Admin Panel
            </Link>
          </nav>
        </div>
      </header>

      <nav className="md:hidden bg-brand-yellow py-4 px-4 flex justify-center gap-6">
        <Link href="/" className="text-black font-bold hover:underline">
          Home
        </Link>
        <Link href="/admin" className="text-black font-bold hover:underline">
          Admin Panel
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-2xl mx-auto block input-field"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-black mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-brand-yellow text-black shadow-lg border-2 border-black'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-brand-yellow'
                }`}
              >
                <span className="text-xl">{categoryIcons[category]}</span>
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-brand-yellow"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl font-bold text-gray-700 mb-2">No services found</p>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-600 font-semibold">
              Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <div
                  key={service.id}
                  className="service-card bg-white"
                >
                  {service.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-brand-yellow text-black px-3 py-1 rounded-full font-bold text-sm">
                        ₹{service.price.toFixed(2)}
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-black flex-1">{service.name}</h3>
                    </div>
                    <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      {service.category}
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                    {!service.image && (
                      <div className="text-3xl font-bold text-brand-yellow mb-4">
                        ₹{service.price.toFixed(2)}
                      </div>
                    )}
                    <div className="flex gap-3">
                      <a
                        href={`tel:+919999999999`}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        📞 Call
                      </a>
                      <a
                        href={`https://wa.me/919999999999?text=Hi, I'm interested in ${encodeURIComponent(service.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="bg-black text-white py-12 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-brand-yellow text-2xl font-bold mb-4">Help-Me</h3>
          <p className="text-gray-400 mb-6">Your Quick Service Finder</p>
          <div className="flex justify-center gap-6 mb-6">
            <Link href="/" className="text-gray-400 hover:text-brand-yellow transition-colors duration-300">
              Home
            </Link>
            <Link href="/admin" className="text-gray-400 hover:text-brand-yellow transition-colors duration-300">
              Admin
            </Link>
          </div>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500">© 2026 Help-Me. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
