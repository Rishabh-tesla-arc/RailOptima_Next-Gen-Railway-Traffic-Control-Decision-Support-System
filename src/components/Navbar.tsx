import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Train } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/benefits', label: 'Benefits' },
    { path: '/dashboard', label: 'Live Dashboard' },
    { path: '/demo', label: 'Demo' },
    { path: '/integration', label: 'Integration' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Train className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">RailOptima</span>
          </Link>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;