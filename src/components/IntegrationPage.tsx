import { motion } from 'framer-motion';
import { 
  Shield, 
  Database, 
  Lock, 
  Server, 
  Monitor,
  CheckCircle,
  AlertCircle,
  Settings,
  Cloud,
  Globe
} from 'lucide-react';

const IntegrationPage = () => {
  const integrationFeatures = [
    {
      icon: <Shield className="w-12 h-12 text-green-500" />,
      title: 'Secure API Connectivity',
      description: 'Enterprise-grade security with encrypted connections to all railway systems',
      details: [
        'End-to-end encryption (TLS 1.3)',
        'OAuth 2.0 authentication',
        'Role-based access control',
        'Audit logging and monitoring'
      ]
    },
    {
      icon: <Database className="w-12 h-12 text-blue-500" />,
      title: 'Real-time Data Synchronization',
      description: 'Seamless integration with existing databases and management systems',
      details: [
        'Live data streaming',
        'Bi-directional synchronization',
        'Data validation and cleansing',
        'Conflict resolution protocols'
      ]
    },
    {
      icon: <Server className="w-12 h-12 text-purple-500" />,
      title: 'Scalable Architecture',
      description: 'Cloud-native design that grows with your railway network',
      details: [
        'Microservices architecture',
        'Auto-scaling capabilities',
        'Load balancing',
        'High availability (99.9% uptime)'
      ]
    },
    {
      icon: <Monitor className="w-12 h-12 text-orange-500" />,
      title: 'Legacy System Compatibility',
      description: 'Works with existing railway infrastructure without major overhauls',
      details: [
        'Legacy protocol support',
        'Gradual migration path',
        'Minimal disruption deployment',
        'Backward compatibility guarantee'
      ]
    }
  ];

  const systemIntegrations = [
    {
      system: 'Train Management System (TMS)',
      status: 'integrated',
      description: 'Real-time train positioning and status updates',
      protocols: ['REST API', 'WebSocket', 'MQTT']
    },
    {
      system: 'Signalling Control Systems',
      status: 'integrated',
      description: 'Signal states and track occupancy data',
      protocols: ['ETCS', 'CBTC', 'TCP/IP']
    },
    {
      system: 'Passenger Information System',
      status: 'integrated',
      description: 'Passenger alerts and schedule updates',
      protocols: ['REST API', 'SMS Gateway', 'Push Notifications']
    },
    {
      system: 'Crew Management System',
      status: 'in-progress',
      description: 'Crew scheduling and availability tracking',
      protocols: ['SOAP', 'REST API']
    },
    {
      system: 'Maintenance Management',
      status: 'planned',
      description: 'Track and rolling stock maintenance schedules',
      protocols: ['REST API', 'Database Sync']
    },
    {
      system: 'Revenue Management',
      status: 'planned',
      description: 'Ticketing and revenue optimization integration',
      protocols: ['REST API', 'Real-time Analytics']
    }
  ];

  const securityFeatures = [
    {
      icon: <Lock className="w-8 h-8 text-red-500" />,
      title: 'Data Encryption',
      description: 'AES-256 encryption for data at rest and in transit'
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: 'Access Control',
      description: 'Multi-factor authentication and role-based permissions'
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-yellow-500" />,
      title: 'Threat Detection',
      description: 'Real-time monitoring for security anomalies'
    },
    {
      icon: <Settings className="w-8 h-8 text-purple-500" />,
      title: 'Compliance',
      description: 'Meets international railway cybersecurity standards'
    }
  ];

  const deploymentOptions = [
    {
      icon: <Cloud className="w-12 h-12 text-blue-500" />,
      title: 'Cloud Deployment',
      description: 'Scalable cloud infrastructure with global availability',
      features: ['Auto-scaling', 'Global CDN', 'Disaster recovery', '99.9% uptime SLA']
    },
    {
      icon: <Server className="w-12 h-12 text-green-500" />,
      title: 'On-Premises',
      description: 'Complete control with on-site infrastructure',
      features: ['Data sovereignty', 'Custom security', 'Direct hardware access', 'Offline capability']
    },
    {
      icon: <Globe className="w-12 h-12 text-orange-500" />,
      title: 'Hybrid Solution',
      description: 'Best of both worlds with flexible deployment',
      features: ['Sensitive data on-premises', 'Analytics in cloud', 'Seamless integration', 'Cost optimization']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'integrated': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'planned': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'integrated': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Settings className="w-4 h-4 text-yellow-500" />;
      case 'planned': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

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
            Seamless System
            <span className="block text-blue-600">Integration</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Our AI platform integrates securely with existing railway infrastructure,
            providing a unified intelligent layer over your current systems.
          </p>
        </motion.div>

        {/* Integration Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {integrationFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                {feature.icon}
                <h3 className="text-2xl font-semibold text-gray-800 ml-4">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* System Integration Status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Railway System Integration Status
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">System</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Protocols</th>
                </tr>
              </thead>
              <tbody>
                {systemIntegrations.map((system, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-6 px-6 font-medium text-gray-800">{system.system}</td>
                    <td className="py-6 px-6">
                      <div className="flex items-center">
                        {getStatusIcon(system.status)}
                        <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(system.status)}`}>
                          {system.status.replace('-', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-gray-600">{system.description}</td>
                    <td className="py-6 px-6">
                      <div className="flex flex-wrap gap-2">
                        {system.protocols.map((protocol, protocolIndex) => (
                          <span key={protocolIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            {protocol}
                          </span>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Enterprise Security Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Deployment Options */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Flexible Deployment Options
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {deploymentOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="mb-6 flex justify-center">{option.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{option.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{option.description}</p>
                <ul className="space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Documentation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            API Integration Examples
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">REST API Endpoint</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-blue-400">// Get real-time train status</div>
                <div className="text-white">GET /api/v1/trains/status</div>
                <div className="text-gray-400">Authorization: Bearer &lt;token&gt;</div>
                <div className="text-gray-400">Content-Type: application/json</div>
                <br />
                <div className="text-blue-400">// Response</div>
                <div className="text-white">{'{'}</div>
                <div className="ml-4 text-yellow-400">"trains": [</div>
                <div className="ml-8 text-white">{'{'}</div>
                <div className="ml-12 text-gray-400">"id": "12345",</div>
                <div className="ml-12 text-gray-400">"name": "Express 101",</div>
                <div className="ml-12 text-gray-400">"status": "running",</div>
                <div className="ml-12 text-gray-400">"delay": 2</div>
                <div className="ml-8 text-white">{'}'}</div>
                <div className="ml-4 text-yellow-400">]</div>
                <div className="text-white">{'}'}</div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">WebSocket Integration</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-blue-400">// Real-time updates</div>
                <div className="text-white">ws://api.railai.com/ws/trains</div>
                <br />
                <div className="text-blue-400">// Incoming message</div>
                <div className="text-white">{'{'}</div>
                <div className="ml-4 text-gray-400">"type": "train_update",</div>
                <div className="ml-4 text-gray-400">"trainId": "12345",</div>
                <div className="ml-4 text-gray-400">"position": {'{' + '"lat": 28.6139, "lng": 77.2090' + '}'},</div>
                <div className="ml-4 text-gray-400">"speed": 85,</div>
                <div className="ml-4 text-gray-400">"timestamp": "2024-01-15T10:30:00Z"</div>
                <div className="text-white">{'}'}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Integrate?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our integration team provides complete support throughout the deployment process.
            Start with a pilot implementation and scale across your entire network.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">24/7</div>
              <div className="text-blue-100">Technical Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">30 days</div>
              <div className="text-blue-100">Integration Timeline</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">Zero</div>
              <div className="text-blue-100">Service Disruption</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntegrationPage;