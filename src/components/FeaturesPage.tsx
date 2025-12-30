import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Calendar, 
  RefreshCw, 
  PlayCircle, 
  MapPin, 
  BarChart3,
  Clock,
  Shield,
  Target,
  Database
} from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: 'Real-time Train Precedence Optimization',
      description: 'Dynamic priority assignment based on passenger load, cargo value, and schedule criticality',
      details: [
        'AI-driven precedence algorithms',
        'Multi-criteria decision making',
        'Dynamic priority adjustment',
        'Real-time conflict resolution'
      ]
    },
    {
      icon: <Calendar className="w-12 h-12 text-blue-500" />,
      title: 'Conflict-Free Scheduling',
      description: 'Advanced algorithms ensure zero scheduling conflicts across the entire network',
      details: [
        'Proactive conflict detection',
        'Automated resolution strategies',
        'Network-wide optimization',
        'Schedule integrity maintenance'
      ]
    },
    {
      icon: <RefreshCw className="w-12 h-12 text-green-500" />,
      title: 'Disruption Re-optimization',
      description: 'Instant adaptation to unexpected events with intelligent rescheduling solutions',
      details: [
        'Real-time disruption analysis',
        'Cascading effect mitigation',
        'Alternative route generation',
        'Minimal passenger impact'
      ]
    },
    {
      icon: <PlayCircle className="w-12 h-12 text-purple-500" />,
      title: 'What-If Simulation',
      description: 'Test scenarios and analyze outcomes before implementing operational changes',
      details: [
        'Scenario modeling engine',
        'Impact analysis tools',
        'Risk assessment framework',
        'Decision support insights'
      ]
    },
    {
      icon: <MapPin className="w-12 h-12 text-red-500" />,
      title: 'Smart Platform Allocation',
      description: 'Optimal platform assignment considering passenger flow and operational efficiency',
      details: [
        'Passenger flow optimization',
        'Platform utilization maximization',
        'Transfer time minimization',
        'Accessibility considerations'
      ]
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-orange-500" />,
      title: 'Comprehensive KPIs Dashboard',
      description: 'Real-time monitoring and analytics for all key performance indicators',
      details: [
        'Real-time performance metrics',
        'Predictive analytics',
        'Custom reporting tools',
        'Trend analysis capabilities'
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: 'Punctuality Enhancement',
      description: 'Advanced algorithms to improve on-time performance'
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Safety Assurance',
      description: 'Built-in safety checks and validation systems'
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: 'Resource Optimization',
      description: 'Maximize utilization of tracks, trains, and crew'
    },
    {
      icon: <Database className="w-8 h-8 text-orange-600" />,
      title: 'Data Integration',
      description: 'Seamless integration with existing railway systems'
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Powerful Features for
            <span className="block text-blue-600">Smart Railway Management</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Our comprehensive suite of AI-powered tools transforms traditional railway operations
            into intelligent, efficient, and future-ready systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 text-center">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Additional Capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Experience the Future of Railway Traffic Management
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our AI-powered system doesn't just manage traffic – it anticipates challenges,
            optimizes solutions, and continuously learns to improve performance.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: '99.7%', label: 'System Uptime' },
              { number: '<2s', label: 'Response Time' },
              { number: '24/7', label: 'Monitoring' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-yellow-300 mb-2">{stat.number}</div>
                <div className="text-lg text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesPage;