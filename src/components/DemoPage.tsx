import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Train
} from 'lucide-react';

const DemoPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [trains, setTrains] = useState([
    { id: 1, name: 'Express 101', position: 10, status: 'running', priority: 'high', delay: 0 },
    { id: 2, name: 'Local 205', position: 30, status: 'running', priority: 'medium', delay: 5 },
    { id: 3, name: 'Freight 301', position: 60, status: 'running', priority: 'low', delay: 12 },
    { id: 4, name: 'Express 102', position: 80, status: 'conflict', priority: 'high', delay: 0 }
  ]);

  const simulationSteps = [
    {
      title: 'Normal Operations',
      description: 'All trains running according to schedule',
      action: 'monitoring'
    },
    {
      title: 'Conflict Detection',
      description: 'AI detects potential scheduling conflict at Junction B',
      action: 'alert'
    },
    {
      title: 'AI Analysis',
      description: 'System analyzes multiple resolution scenarios',
      action: 'processing'
    },
    {
      title: 'Solution Generation',
      description: 'Optimal solution: Re-route Express 102 via alternate track',
      action: 'solution'
    },
    {
      title: 'Implementation',
      description: 'Solution implemented, conflict resolved',
      action: 'resolved'
    }
  ];

  const metrics = [
    { label: 'On-time Performance', value: isPlaying ? '94%' : '87%', color: 'text-green-600' },
    { label: 'Active Conflicts', value: currentStep > 3 ? '0' : '1', color: currentStep > 3 ? 'text-green-600' : 'text-red-600' },
    { label: 'Average Delay', value: isPlaying ? '2.3 min' : '8.7 min', color: 'text-blue-600' },
    { label: 'System Load', value: '76%', color: 'text-orange-600' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % simulationSteps.length);
        
        setTrains(prev => prev.map(train => ({
          ...train,
          position: (train.position + Math.random() * 5) % 100,
          status: currentStep === 1 && train.id === 4 ? 'conflict' : 
                currentStep > 3 ? 'running' : train.status,
          delay: currentStep > 3 ? Math.max(0, train.delay - 2) : train.delay
        })));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setTrains([
      { id: 1, name: 'Express 101', position: 10, status: 'running', priority: 'high', delay: 0 },
      { id: 2, name: 'Local 205', position: 30, status: 'running', priority: 'medium', delay: 5 },
      { id: 3, name: 'Freight 301', position: 60, status: 'running', priority: 'low', delay: 12 },
      { id: 4, name: 'Express 102', position: 80, status: 'running', priority: 'high', delay: 0 }
    ]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'conflict': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

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
            Interactive AI Railway
            <span className="block text-blue-600">Traffic Optimization Demo</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Watch our AI system in action as it detects conflicts, analyzes scenarios,
            and implements optimal solutions in real-time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
              {isPlaying ? 'Pause' : 'Start'} Simulation
            </button>
            <button
              onClick={resetDemo}
              className="flex items-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </button>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Current Phase</div>
            <div className="text-2xl font-bold text-blue-600">
              {simulationSteps[currentStep].title}
            </div>
            <div className="text-gray-700 mt-2">
              {simulationSteps[currentStep].description}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Live Railway Network Status
          </h2>
          
          <div className="relative h-40 bg-gray-100 rounded-lg p-4 mb-6">
            <div className="absolute top-1/2 left-4 right-4 h-2 bg-gray-400 rounded transform -translate-y-1/2">
              <div className="absolute left-0 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-2 -translate-y-1"></div>
              <div className="absolute left-1/3 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-2 -translate-y-1"></div>
              <div className="absolute left-2/3 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-2 -translate-y-1"></div>
              <div className="absolute right-0 w-4 h-4 bg-blue-600 rounded-full transform translate-x-2 -translate-y-1"></div>
            </div>
            
            <div className="absolute bottom-4 left-4 text-xs font-semibold text-gray-600">Station A</div>
            <div className="absolute bottom-4 left-1/3 transform -translate-x-1/2 text-xs font-semibold text-gray-600">Junction B</div>
            <div className="absolute bottom-4 left-2/3 transform -translate-x-1/2 text-xs font-semibold text-gray-600">Station C</div>
            <div className="absolute bottom-4 right-4 text-xs font-semibold text-gray-600">Terminal D</div>

            {trains.map((train) => (
              <motion.div
                key={train.id}
                animate={{ left: `${train.position}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={`absolute top-1/2 w-8 h-6 rounded transform -translate-x-4 -translate-y-3 flex items-center justify-center ${
                  train.status === 'conflict' ? 'bg-red-500' : 
                  train.priority === 'high' ? 'bg-blue-600' : 
                  train.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              >
                <Train className="w-4 h-4 text-white" />
              </motion.div>
            ))}
            
            <AnimatePresence>
              {currentStep >= 1 && currentStep <= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute left-2/3 top-4 transform -translate-x-1/2"
                >
                  <div className="bg-red-100 border-2 border-red-500 rounded-lg p-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-red-700 text-xs font-semibold">Conflict Detected</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">Train</th>
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">Priority</th>
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">Delay</th>
                </tr>
              </thead>
              <tbody>
                {trains.map((train) => (
                  <tr key={train.id} className="border-b border-gray-100">
                    <td className="py-2 px-4 font-medium">{train.name}</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        {getStatusIcon(train.status)}
                        <span className="ml-2 capitalize">{train.status}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(train.priority)} mr-2`}></div>
                        <span className="capitalize">{train.priority}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4">{train.delay} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">{metric.label}</h3>
              <div className={`text-3xl font-bold ${metric.color}`}>{metric.value}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            AI Decision Process
          </h2>
          <div className="grid lg:grid-cols-5 gap-4">
            {simulationSteps.map((step, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg text-center transition-all ${
                  index === currentStep 
                    ? 'bg-blue-100 border-2 border-blue-500' 
                    : index < currentStep 
                    ? 'bg-green-100 border-2 border-green-500' 
                    : 'bg-gray-100 border-2 border-gray-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  index === currentStep 
                    ? 'bg-blue-500 text-white' 
                    : index < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : index === currentStep ? (
                    <Zap className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Experience the Power of AI</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            This simulation demonstrates how our AI system continuously monitors railway operations,
            detects potential conflicts, and implements optimal solutions in real-time.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div>
              <div className="text-2xl font-bold text-yellow-300 mb-2">Real-time</div>
              <div className="text-blue-100">Decision Making</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-300 mb-2">99.2%</div>
              <div className="text-blue-100">Conflict Resolution</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-300 mb-2">&lt;2 sec</div>
              <div className="text-blue-100">Response Time</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoPage;