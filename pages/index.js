import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    { icon: '🚗', name: 'Automobile Engineers', description: 'Expert auto repair and maintenance services' },
    { icon: '⚡', name: 'Electricians', description: 'Professional electrical installation and repairs' },
    { icon: '🔧', name: 'Plumbers', description: 'Reliable plumbing solutions for your home' },
    { icon: '🏗️', name: 'Masons', description: 'Quality construction and masonry work' },
    { icon: '🧹', name: 'Cleaners', description: 'Professional cleaning services for all needs' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-brand-yellow py-6 px-4 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Help-Me</h1>
            <p className="text-sm md:text-base text-yellow-300">Your Quick Service Finder</p>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/services" className="text-brand-yellow hover:text-yellow-300 font-semibold transition-colors duration-300">
              Browse Services
            </Link>
            <Link href="/admin" className="text-brand-yellow hover:text-yellow-300 font-semibold transition-colors duration-300">
              Admin Panel
            </Link>
          </nav>
        </div>
      </header>

      <nav className="md:hidden bg-brand-yellow py-4 px-4 flex justify-center gap-6">
        <Link href="/services" className="text-black font-bold hover:underline">
          Browse Services
        </Link>
        <Link href="/admin" className="text-black font-bold hover:underline">
          Admin Panel
        </Link>
      </nav>

      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand-yellow rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-yellow rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Find Trusted Service<br />
            <span className="text-brand-yellow">Professionals Quickly</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Connect with reliable automobile engineers, electricians, plumbers, masons, and cleaners in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="btn-primary text-center">
              Find Services
            </Link>
            <a href="#contact" className="btn-secondary text-center">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional services at your fingertips. Browse our categories and connect instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group"
              >
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">{service.name}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link href="/services" className="inline-block bg-brand-yellow text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105">
                    View Professionals
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-heading">About Help-Me</h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Help-Me is a smart and user-friendly platform designed to connect individuals with reliable service professionals quickly and effortlessly.
              </p>
              <p>
                Whether you are looking for automobile engineers, electricians, plumbers, masons, or cleaners, Help-Me simplifies the search process by allowing users to easily browse and find the right service provider based on their needs.
              </p>
              <p>
                With a powerful admin panel, administrators can manage service categories and providers efficiently. Users can directly connect through phone calls, WhatsApp messages, or inquiry forms without complex booking systems.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/services" className="btn-primary inline-block">
                Get Started
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-black text-brand-yellow p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-sm">Service Providers</div>
            </div>
            <div className="bg-brand-yellow text-black p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-sm">Service Categories</div>
            </div>
            <div className="bg-brand-yellow text-black p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
            <div className="bg-black text-brand-yellow p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2">Fast</div>
              <div className="text-sm">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading">Contact Us</h2>
            <p className="text-lg text-gray-600">
              Have questions? Send us a message and we'll get back to you soon.
            </p>
          </div>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold animate-fade-in">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="input-field resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-brand-yellow text-2xl font-bold mb-4">Help-Me</h3>
          <p className="text-gray-400 mb-6">Your Quick Service Finder</p>
          <div className="flex justify-center gap-6 mb-6">
            <Link href="/services" className="text-gray-400 hover:text-brand-yellow transition-colors duration-300">
              Services
            </Link>
            <Link href="/admin" className="text-gray-400 hover:text-brand-yellow transition-colors duration-300">
              Admin
            </Link>
            <a href="#contact" className="text-gray-400 hover:text-brand-yellow transition-colors duration-300">
              Contact
            </a>
          </div>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500">© 2026 Help-Me. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
