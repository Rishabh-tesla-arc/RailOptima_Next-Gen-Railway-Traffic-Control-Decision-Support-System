import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  TrendingUp, 
  Shield, 
  Target,
  Users,
  DollarSign,
  Gauge,
  CheckCircle,
  BarChart3,
  Award
} from 'lucide-react';

const BenefitsPage = () => {
  const mainBenefits = [
    {
      icon: <TrendingUp className="w-16 h-16 text-green-500" />,
      title: 'Enhanced Efficiency',
      description: 'Optimize resource utilization and reduce operational waste',
      metrics: [
        { label: 'Operational Efficiency', value: '45%', increase: true },
        { label: 'Resource Utilization', value: '62%', increase: true },
        { label: 'Processing Speed', value: '78%', increase: true },
        { label: 'Decision Accuracy', value: '91%', increase: true }
      ],
      details: [
        'Automated decision-making processes',
        'Real-time optimization algorithms',
        'Reduced manual intervention',
        'Streamlined workflow management'
      ]
    },
    {
      icon: <Clock className="w-16 h-16 text-blue-500" />,
      title: 'Improved Punctuality',
      description: 'Minimize delays and ensure on-time performance across the network',
      metrics: [
        { label: 'On-time Performance', value: '34%', increase: true },
        { label: 'Average Delay Reduction', value: '28 mins', increase: false },
        { label: 'Schedule Adherence', value: '18%', increase: true },
        { label: 'Connection Success', value: '92%', increase: true }
      ],
      details: [
        'Proactive delay prevention',
        'Dynamic schedule adjustments',
        'Cascading delay mitigation',
        'Predictive maintenance alerts'
      ]
    },
    {
      icon: <Shield className="w-16 h-16 text-red-500" />,
      title: 'Enhanced Safety',
      description: 'Reduce risks and ensure safe operations through intelligent monitoring',
      metrics: [
        { label: 'Safety Incidents', value: '67%', increase: false },
        { label: 'Risk Detection', value: '94%', increase: true },
        { label: 'Compliance Score', value: '99.2%', increase: true },
        { label: 'Emergency Response', value: '2.3 mins', increase: false }
      ],
      details: [
        'Real-time safety monitoring',
        'Automated risk assessment',
        'Compliance validation',
        'Emergency response coordination'
      ]
    },
    {
      icon: <Target className="w-16 h-16 text-purple-500" />,
      title: 'Better Infrastructure Utilization',
      description: 'Maximize the potential of existing railway infrastructure',
      metrics: [
        { label: 'Track Utilization', value: '43%', increase: true },
        { label: 'Platform Efficiency', value: '56%', increase: true },
        { label: 'Capacity Optimization', value: '38%', increase: true },
        { label: 'Asset Performance', value: '71%', increase: true }
      ],
      details: [
        'Dynamic capacity allocation',
        'Infrastructure stress analysis',
        'Maintenance scheduling optimization',
        'Asset lifecycle management'
      ]
    }
  ];

  const additionalBenefits = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Passenger Experience',
      value: '85%',
      description: 'Improvement in overall passenger satisfaction'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: 'Cost Savings',
      value: '₹2.3Cr',
      description: 'Annual operational cost reduction per zone'
    },
    {
      icon: <Gauge className="w-8 h-8 text-orange-600" />,
      title: 'System Performance',
      value: '99.7%',
      description: 'System uptime and reliability'
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: 'Service Quality',
      value: '4.8/5',
      description: 'Average service quality rating'
    }
  ];

  const comparisonData = [
    { metric: 'Average Delay Time', before: '45 minutes', after: '18 minutes', improvement: '60%' },
    { metric: 'Schedule Conflicts', before: '127/day', after: '8/day', improvement: '94%' },
    { metric: 'Resource Utilization', before: '67%', after: '89%', improvement: '33%' },
    { metric: 'Operational Costs', before: '₹8.2Cr/month', after: '₹5.9Cr/month', improvement: '28%' }
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
            Transformative Benefits for
            <span className="block text-blue-600">Railway Operations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Experience measurable improvements across all aspects of railway operations
            with our AI-powered traffic decision-support system.
          </p>
        </motion.div>

        {/* Main Benefits */}
        <div className="space-y-20 mb-20">
          {mainBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-12"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                  <div className="flex items-center mb-6">
                    {benefit.icon}
                    <div className="ml-6">
                      <h2 className="text-3xl font-bold text-gray-800">{benefit.title}</h2>
                      <p className="text-xl text-gray-600 mt-2">{benefit.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {benefit.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                  <div className="bg-gray-50 rounded-xl p-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                      Performance Metrics
                    </h3>
                    <div className="space-y-4">
                      {benefit.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">{metric.label}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-lg font-bold ${
                              metric.increase ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              {metric.increase ? '+' : ''}{metric.value}
                            </span>
                            {metric.increase && <TrendingUp className="w-4 h-4 text-green-500" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Additional Impact Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all"
              >
                <div className="mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-3">{benefit.value}</div>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Before vs After Comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Before vs After Implementation
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-lg font-semibold text-gray-800">Metric</th>
                  <th className="text-center py-4 px-6 text-lg font-semibold text-red-600">Before</th>
                  <th className="text-center py-4 px-6 text-lg font-semibold text-green-600">After</th>
                  <th className="text-center py-4 px-6 text-lg font-semibold text-blue-600">Improvement</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-6 px-6 font-medium text-gray-800">{row.metric}</td>
                    <td className="py-6 px-6 text-center text-red-600 font-semibold">{row.before}</td>
                    <td className="py-6 px-6 text-center text-green-600 font-semibold">{row.after}</td>
                    <td className="py-6 px-6 text-center">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                        {row.improvement}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ROI Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Return on Investment</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our AI system delivers measurable ROI through reduced operational costs,
            improved efficiency, and enhanced passenger satisfaction.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-5xl font-bold text-yellow-300 mb-2">6 months</div>
              <div className="text-lg text-blue-100">Payback Period</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-300 mb-2">300%</div>
              <div className="text-lg text-blue-100">ROI in 3 Years</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-300 mb-2">₹12.5Cr</div>
              <div className="text-lg text-blue-100">Annual Savings Potential</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BenefitsPage;