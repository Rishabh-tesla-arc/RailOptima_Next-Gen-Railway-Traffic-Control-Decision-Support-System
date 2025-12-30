import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Database, 
  Network, 
  Monitor, 
  Settings, 
  CheckCircle,
  ArrowDown,
  Signal,
  Calendar,
  Map
} from 'lucide-react';

const HowItWorksPage = () => {
  const workflowSteps = [
    {
      icon: <Database className="w-16 h-16 text-blue-600" />,
      title: 'Data Collection',
      description: 'Real-time data ingestion from multiple railway systems',
      details: [
        'Signal system data',
        'Train Management System (TMS)',
        'Timetable databases',
        'Weather and infrastructure status'
      ]
    },
    {
      icon: <Brain className="w-16 h-16 text-purple-600" />,
      title: 'AI Processing',
      description: 'Advanced algorithms analyze and process complex railway data',
      details: [
        'Machine learning models',
        'Operations research optimization',
        'Pattern recognition',
        'Predictive analytics'
      ]
    },
    {
      icon: <Network className="w-16 h-16 text-green-600" />,
      title: 'Solution Generation',
      description: 'Generate optimal scheduling and routing recommendations',
      details: [
        'Conflict-free schedules',
        'Route optimization',
        'Resource allocation',
        'Alternative scenarios'
      ]
    },
    {
      icon: <Monitor className="w-16 h-16 text-orange-600" />,
      title: 'User Interface',
      description: 'Present actionable insights through intuitive dashboards',
      details: [
        'Real-time visualizations',
        'Interactive controls',
        'Alert systems',
        'Performance metrics'
      ]
    }
  ];

  const dataSources = [
    {
      icon: <Signal className="w-8 h-8 text-blue-500" />,
      name: 'Signalling Systems',
      description: 'Track occupancy, signal states, and safety parameters'
    },
    {
      icon: <Calendar className="w-8 h-8 text-green-500" />,
      name: 'Train Management System',
      description: 'Live train positions, speeds, and operational status'
    },
    {
      icon: <Map className="w-8 h-8 text-purple-500" />,
      name: 'Timetable Database',
      description: 'Scheduled services, routes, and timing constraints'
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-500" />,
      name: 'Infrastructure Data',
      description: 'Track conditions, maintenance schedules, and capacity'
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            How Our AI System
            <span className="block text-blue-600">Transforms Railway Operations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Discover the intelligent workflow that powers our railway traffic decision-support system,
            combining cutting-edge AI with operations research for optimal results.
          </p>
        </motion.div>

        {/* Main Workflow */}
        <div className="mb-20">
          {workflowSteps.map((step, index) => (
            <div key={index} className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="mr-4">{step.icon}</div>
                      <div>
                        <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                          Step {index + 1}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-800 mt-2">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">{step.description}</p>
                    <ul className="grid grid-cols-2 gap-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="w-16 flex justify-center">
                  <div className="w-1 h-16 bg-blue-200"></div>
                </div>
                <div className="flex-1"></div>
              </motion.div>
              {index < workflowSteps.length - 1 && (
                <div className="flex justify-center my-8">
                  <ArrowDown className="w-8 h-8 text-blue-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Data Sources Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Integrated Data Sources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dataSources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="mb-4 flex justify-center">{source.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{source.name}</h3>
                <p className="text-gray-600 text-sm">{source.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI + OR Integration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-12 mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            AI + Operations Research Integration
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Artificial Intelligence</h3>
              <ul className="space-y-4">
                {[
                  'Machine Learning for pattern recognition',
                  'Deep Learning for complex decision making',
                  'Natural Language Processing for alerts',
                  'Computer Vision for infrastructure monitoring'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Operations Research</h3>
              <ul className="space-y-4">
                {[
                  'Linear and Integer Programming optimization',
                  'Graph theory for network analysis',
                  'Queueing theory for capacity planning',
                  'Heuristic algorithms for real-time solutions'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* User Interface Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">User-Friendly Interface</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Our interface provides railway operators with clear recommendations and the flexibility
              to override decisions when necessary, ensuring human expertise remains central.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-time Recommendations',
                description: 'Clear, actionable suggestions with confidence levels and impact analysis'
              },
              {
                title: 'Override Capabilities',
                description: 'Human operators can override AI decisions with reason tracking and impact assessment'
              },
              {
                title: 'Continuous Learning',
                description: 'System learns from operator decisions to improve future recommendations'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-3 text-yellow-300">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorksPage;