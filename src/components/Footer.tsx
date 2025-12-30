import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Train, Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', path: '/features' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'Demo', path: '/demo' },
        { name: 'Integration', path: '/integration' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Benefits', path: '/benefits' },
        { name: 'Contact', path: '/contact' },
        { name: 'Careers', path: '/careers' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '/docs' },
        { name: 'API Reference', path: '/api' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'White Papers', path: '/resources' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Technical Support', path: '/support' },
        { name: 'Status Page', path: '/status' },
        { name: 'Community', path: '/community' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Globe className="w-5 h-5" />, url: '#', label: 'Website' },
    { icon: <Mail className="w-5 h-5" />, url: 'mailto:contact@railai.com', label: 'Email' },
    { icon: <Phone className="w-5 h-5" />, url: 'tel:+91-11-2345-6789', label: 'Phone' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Train className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">RailOptima</span>
            </Link>
            <p className="text-gray-300 mb-6 text-lg">
              भारतीय रेल यातायात प्रबंधन के लिए अग्रणी AI समाधान
            </p>
            <p className="text-gray-300 mb-6">
              Transforming Indian Railway operations with intelligent AI-powered
              traffic decision-support systems. Building the future of smart,
              efficient, and safe rail transportation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-4">
              भारतीय रेल के लिए बनाया गया
            </h3>
            <p className="text-gray-300 text-lg mb-4">
              "तकनीक और नवाचार के साथ भारतीय रेल को आगे बढ़ाना"
            </p>
            <div className="flex justify-center items-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>भारत में निर्मित</span>
              </div>
              <div className="flex items-center space-x-2">
                <Train className="w-4 h-4" />
                <span>रेल मंत्रालय अनुमोदित</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 RailOptima. All rights reserved. | Built with ❤️ for Indian Railways
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/security" className="hover:text-blue-400 transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;