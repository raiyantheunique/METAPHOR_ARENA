import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo3D from './Logo3D';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rosters', path: '/rosters' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contacts', path: '/contacts' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'navbar-glass'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-3">
            <Logo3D size="md" />
            <div className="flex flex-col">
              <span className={`font-bebas text-xl md:text-2xl tracking-wider transition-colors leading-tight ${
                scrolled ? 'text-white' : 'text-white'
              }`}>
                METAPHOR
              </span>
              <span className={`font-bebas text-lg md:text-xl tracking-wider leading-tight -mt-1 ${
                scrolled ? 'text-cyan-400' : 'text-cyan-400'
              }`}>
                ARENA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-inter font-medium text-sm tracking-wide transition-colors group ${
                  location.pathname === link.path ? 'text-cyan-400' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform origin-left ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-cyan-400 to-pink-500 scale-x-100'
                      : 'bg-cyan-400 scale-x-0'
                  } group-hover:scale-x-100`}
                />
              </Link>
            ))}
            <Link
              to="/contacts"
              className="relative px-6 py-2 font-bebas tracking-wider text-white overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #0080ff 100%)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)'
              }}
            >
              <span className="relative z-10">JOIN NOW</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:text-cyan-400 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden absolute top-16 left-0 right-0 border-t border-cyan-400/20 shadow-xl"
            style={{ background: 'rgba(10, 0, 20, 0.95)' }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-inter font-medium py-2 transition-colors ${
                    location.pathname === link.path
                      ? 'text-cyan-400'
                      : 'text-white/80 hover:text-cyan-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contacts"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white px-6 py-3 font-bebas tracking-wider text-center mt-4"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #0080ff 100%)'
                }}
              >
                JOIN NOW
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
