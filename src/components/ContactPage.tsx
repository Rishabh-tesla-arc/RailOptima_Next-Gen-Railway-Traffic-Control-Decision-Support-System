import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  Users,
  Lightbulb,
  Settings,
  CheckCircle
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiry_type: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactOptions = [
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: 'Pilot Programs',
      description: 'Start with a small-scale implementation to demonstrate value',
      details: [
        'Risk-free pilot deployment',
        'Performance benchmarking',
        'Customization for your network',
        'ROI analysis and reporting'
      ]
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-green-500" />,
      title: 'Collaboration Opportunities',
      description: 'Partner with us on research and development initiatives',
      details: [
        'Joint research projects',
        'Academic partnerships',
        'Innovation workshops',
        'Technology co-development'
      ]
    },
    {
      icon: <Settings className="w-12 h-12 text-purple-500" />,
      title: 'Technical Consultation',
      description: 'Get expert advice on AI implementation in railway systems',
      details: [
        'Architecture assessment',
        'Integration planning',
        'Technology roadmapping',
        'Best practices guidance'
      ]
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      label: 'Email',
      value: 'contact@railai.com',
      description: 'General inquiries and support'
    },
    {
      icon: <Phone className="w-6 h-6 text-green-500" />,
      label: 'Phone',
      value: '+91-11-2345-6789',
      description: 'Direct line for urgent matters'
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      label: 'Address',
      value: 'New Delhi, India',
      description: 'Headquarters and R&D center'
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      label: 'Business Hours',
      value: '9:00 AM - 6:00 PM IST',
      description: 'Monday to Friday'
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
            Let's Transform Railway
            <span className="block text-blue-600">Operations Together</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Ready to revolutionize your railway traffic management? Get in touch with our team
            to discuss pilot programs, collaborations, or technical consultations.
          </p>
        </motion.div>

        {/* Contact Options */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {contactOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-6 flex justify-center">{option.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{option.title}</h3>
              <p className="text-gray-600 mb-6 text-center">{option.description}</p>
              <ul className="space-y-2">
                {option.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Form and Info */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h2>
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600">Your message has been received. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization *</label>
                  <input
                    type="text"
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Railway division or company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type *</label>
                  <select
                    name="inquiry_type"
                    required
                    value={formData.inquiry_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="pilot">Pilot Program</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="consultation">Technical Consultation</option>
                    <option value="demo">Request Demo</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                    placeholder="Tell us about your requirements and how we can help..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-[1.02] flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg">
                    <div className="mt-1">{info.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{info.label}</h3>
                      <p className="text-blue-600 font-medium mb-1">{info.value}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Response Time</span>
                  <span className="font-bold text-yellow-300">&lt; 24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pilot Success Rate</span>
                  <span className="font-bold text-yellow-300">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Implementation Time</span>
                  <span className="font-bold text-yellow-300">30-60 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Customer Satisfaction</span>
                  <span className="font-bold text-yellow-300">4.9/5</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                question: 'How long does a pilot implementation take?',
                answer: 'Typically 30-60 days from initial assessment to full pilot deployment, including integration and testing phases.'
              },
              {
                question: 'What existing systems can you integrate with?',
                answer: 'We support integration with most railway management systems including TMS, signalling systems, and passenger information systems.'
              },
              {
                question: 'Do you provide training for our staff?',
                answer: 'Yes, comprehensive training programs are included covering system operation, monitoring, and basic troubleshooting.'
              },
              {
                question: 'What kind of support do you offer?',
                answer: '24/7 technical support, regular system updates, performance monitoring, and dedicated account management.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;