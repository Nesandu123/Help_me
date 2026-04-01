import { useState, useEffect } from 'react';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <header style={{ background: '#000', color: '#FFD700', padding: '20px', textAlign: 'center' }}>
        <h1>Help-Me Services</h1>
        <p>Browse and connect with our professional service providers</p>
      </header>

      <nav style={{ background: '#FFD700', padding: '15px', textAlign: 'center' }}>
        <a href="/" style={{ marginRight: '20px', color: '#000', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
        <a href="/admin" style={{ color: '#000', textDecoration: 'none', fontWeight: 'bold' }}>Admin Panel</a>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Category Filter */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>Filter by Category</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '10px 15px',
                  border: selectedCategory === category ? '2px solid #FFD700' : '1px solid #ddd',
                  background: selectedCategory === category ? '#FFD700' : '#fff',
                  color: selectedCategory === category ? '#000' : '#333',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: selectedCategory === category ? 'bold' : 'normal',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', background: '#f5f5f5', borderRadius: '8px' }}>
            <p style={{ fontSize: '18px', color: '#666' }}>No services available in this category.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredServices.map(service => (
              <div
                key={service.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', background: '#f0f0f0' }}
                  />
                )}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#000' }}>{service.name}</h3>
                  <p style={{ color: '#666', fontSize: '12px', marginBottom: '10px' }}>
                    <strong>Category:</strong> {service.category}
                  </p>
                  <p style={{ color: '#333', marginBottom: '15px', lineHeight: '1.5' }}>
                    {service.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFD700' }}>
                      ₹{service.price.toFixed(2)}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <a
                        href={`tel:+919999999999`}
                        style={{
                          background: '#4CAF50',
                          color: '#fff',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          fontSize: '12px',
                        }}
                      >
                        Call
                      </a>
                      <a
                        href={`https://wa.me/919999999999?text=Hi, I'm interested in ${service.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: '#25D366',
                          color: '#fff',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          fontSize: '12px',
                        }}
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '20px', marginTop: '40px' }}>
        © 2026 Help-Me - Your Quick Service Finder
      </footer>
    </div>
  );
}
