import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './components/HomePage';
import FeaturesPage from './components/FeaturesPage';
import HowItWorksPage from './components/HowItWorksPage';
import BenefitsPage from './components/BenefitsPage';
import DemoPage from './components/DemoPage';
import IntegrationPage from './components/IntegrationPage';
import DashboardPage from './components/DashboardPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/benefits" element={<BenefitsPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/integration" element={<IntegrationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;