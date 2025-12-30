import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Users, TrendingUp, ArrowRight, Train, Zap, Shield, Target, Bell, Activity } from 'lucide-react';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [activeScenario, setActiveScenario] = useState('normal');
  const [systemMetrics, setSystemMetrics] = useState({
    efficiency: 94.2,
    punctuality: 98.7,
    safety: 99.9,
    utilization: 87.3
  });

  // Train state management with realistic behavior
  const [trainStates, setTrainStates] = useState({
    rajdhani: {
      x: 120, y: 110, track: 1, speed: 140, status: 'moving',
      nextStop: 'Mumbai', platformStop: false, emergency: false, rerouting: false
    },
    intercity: {
      x: 700, y: 190, track: 2, speed: 95, status: 'moving',
      nextStop: 'Delhi', platformStop: false, emergency: false, rerouting: false
    },
    freight: {
      x: 120, y: 270, track: 3, speed: 60, status: 'moving',
      nextStop: 'Mumbai', platformStop: false, emergency: false, rerouting: false
    }
  });

  const [signalStates, setSignalStates] = useState({
    s1: 'green', s2: 'green', s3: 'green'
  });

  const [liveNotifications, setLiveNotifications] = useState([
    { id: 1, time: new Date().toLocaleTimeString().slice(0, 5), message: "System operational", type: "success", priority: "low" }
  ]);

  const [conflictDetected, setConflictDetected] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);

  useEffect(() => {
    // Show loading animation for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Add notification helper
  const addNotification = (message: string, type: string, priority: string) => {
    const newNotification = {
      id: Date.now(),
      time: new Date().toLocaleTimeString().slice(0, 5),
      message,
      type,
      priority
    };
    setLiveNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
  };

  // Realistic scenario simulation with accurate train behavior
  useEffect(() => {
    // Reset states
    setConflictDetected(false);
    setEmergencyActive(false);
    setSignalStates({ s1: 'green', s2: 'green', s3: 'green' });

    // Reset system metrics to baseline
    setSystemMetrics({
      efficiency: 94.2,
      punctuality: 98.7,
      safety: 99.9,
      utilization: 87.3
    });

    // Reset train positions
    setTrainStates({
      rajdhani: { x: 120, y: 110, track: 1, speed: 140, status: 'moving', nextStop: 'Mumbai', platformStop: false, emergency: false, rerouting: false },
      intercity: { x: 700, y: 190, track: 2, speed: 95, status: 'moving', nextStop: 'Delhi', platformStop: false, emergency: false, rerouting: false },
      freight: { x: 120, y: 270, track: 3, speed: 60, status: 'moving', nextStop: 'Mumbai', platformStop: false, emergency: false, rerouting: false }
    });

    let timeouts: NodeJS.Timeout[] = [];

    const clearTimeouts = () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      timeouts = [];
    };

    switch (activeScenario) {
      case 'normal':
        addNotification("Normal operations active", "success", "low");

        // Step 1: Start normal train movements (t=1s)
        timeouts.push(setTimeout(() => {
          addNotification("All trains proceeding on schedule", "success", "low");
          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, x: 250, speed: 140, status: 'express_service' },
            intercity: { ...prev.intercity, x: 600, speed: 95, status: 'passenger_service' },
            freight: { ...prev.freight, x: 200, speed: 60, status: 'cargo_transport' }
          }));
        }, 1000));

        // Step 2: Approach Central Hub (t=4s)
        timeouts.push(setTimeout(() => {
          addNotification("Trains approaching Central Hub stations", "info", "low");
          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, x: 450, status: 'approaching_central_hub' },
            intercity: { ...prev.intercity, x: 450, status: 'approaching_central_hub' },
            freight: { ...prev.freight, x: 400, status: 'approaching_central_hub' }
          }));
        }, 4000));

        // Step 3: Platform allocation (t=7s)
        timeouts.push(setTimeout(() => {
          addNotification("Platform allocation: Rajdhani→PF-1, Intercity→PF-2, Freight→PF-3", "success", "medium");
          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, x: 480, platformStop: true, status: 'platform_1_service' },
            intercity: { ...prev.intercity, x: 480, platformStop: true, status: 'platform_2_service' },
            freight: { ...prev.freight, x: 480, platformStop: true, status: 'platform_3_service' }
          }));
        }, 7000));

        // Step 4: Departure (t=11s)
        timeouts.push(setTimeout(() => {
          addNotification("All trains departing on schedule", "success", "low");
          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, x: 600, platformStop: false, status: 'departing_to_mumbai' },
            intercity: { ...prev.intercity, x: 300, platformStop: false, status: 'departing_to_delhi' },
            freight: { ...prev.freight, x: 650, platformStop: false, status: 'continuing_route' }
          }));
        }, 11000));

        // Step 5: Return to cycle (t=15s)
        timeouts.push(setTimeout(() => {
          addNotification("Normal operations cycle complete", "success", "low");
          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, x: 120, status: 'normal_operations' },
            intercity: { ...prev.intercity, x: 700, status: 'normal_operations' },
            freight: { ...prev.freight, x: 120, status: 'normal_operations' }
          }));
        }, 15000));
        break;

      case 'conflict':
        addNotification("Initializing conflict scenario", "info", "medium");

        // Step 1: Both trains approach junction (t=2s)
        timeouts.push(setTimeout(() => {
          addNotification("Rajdhani and Intercity approaching Junction B", "warning", "medium");
          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, x: 350, status: 'approaching_junction' },
            intercity: { ...prev.intercity, x: 550, status: 'approaching_junction' }
          }));
        }, 2000));

        // Step 2: CONFLICT DETECTED (t=4s)
        timeouts.push(setTimeout(() => {
          setConflictDetected(true);
          addNotification("🚨 CONFLICT DETECTED: Both trains targeting Junction B", "error", "critical");
          setSignalStates(prev => ({ ...prev, s1: 'red', s2: 'yellow' }));

          // Impact on metrics during conflict
          setSystemMetrics({
            efficiency: 76.5,    // Sharp drop due to emergency stop
            punctuality: 89.2,   // Delayed schedules
            safety: 99.9,        // Safety maintained
            utilization: 65.1    // Reduced due to stopped traffic
          });

          // Rajdhani emergency brake
          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, speed: 0, status: 'emergency_stop', x: 350 },
            intercity: { ...prev.intercity, speed: 40, status: 'reduced_speed', x: 500 }
          }));
        }, 4000));

        // Step 3: AI Resolution Decision (t=6s)
        timeouts.push(setTimeout(() => {
          addNotification("AI RESOLUTION: Rerouting Rajdhani to Track 2", "warning", "high");
          addNotification("Signal S1 switched to PROCEED via Track 2", "info", "medium");

          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, rerouting: true, track: 2, status: 'rerouting_track_2', speed: 80 }
          }));
        }, 6000));

        // Step 4: Execute rerouting (t=8s)
        timeouts.push(setTimeout(() => {
          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, x: 450, y: 190, track: 2, status: 'proceeding_track_2', speed: 120 }
          }));
          addNotification("Rajdhani successfully switched to Track 2", "success", "medium");
        }, 8000));

        // Step 5: Clear Intercity (t=10s)
        timeouts.push(setTimeout(() => {
          setSignalStates(prev => ({ ...prev, s2: 'green' }));
          setTrainStates(prev => ({
            ...prev,
            intercity: { ...prev.intercity, speed: 95, status: 'proceeding_clear', x: 350 }
          }));
          addNotification("Intercity cleared through Junction B on Track 2", "success", "medium");
        }, 10000));

        // Step 6: Resolution complete (t=12s)
        timeouts.push(setTimeout(() => {
          setConflictDetected(false);
          setSignalStates({ s1: 'green', s2: 'green', s3: 'green' });
          addNotification("✅ CONFLICT RESOLVED: All trains proceeding normally", "success", "high");

          // Metrics recovery after resolution
          setSystemMetrics({
            efficiency: 92.8,    // Recovered but slightly below baseline due to delay
            punctuality: 96.4,   // Recovered but impact from delay
            safety: 99.9,        // Maintained
            utilization: 84.7    // Recovered
          });

          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, status: 'normal_operations', speed: 140, rerouting: false },
            intercity: { ...prev.intercity, status: 'normal_operations', speed: 95 }
          }));
        }, 12000));
        break;

      case 'emergency':
        addNotification("Emergency scenario initiated", "warning", "high");

        // Step 1: Normal approach (t=2s)
        timeouts.push(setTimeout(() => {
          addNotification("Intercity approaching Central Hub Platform 3", "info", "low");
          setTrainStates(prev => ({
            ...prev,
            intercity: { ...prev.intercity, x: 450, status: 'approaching_platform' }
          }));
        }, 2000));

        // Step 2: MEDICAL EMERGENCY (t=4s)
        timeouts.push(setTimeout(() => {
          setEmergencyActive(true);
          addNotification("🚨 MEDICAL EMERGENCY: Passenger collapse on Intercity", "error", "critical");
          addNotification("Emergency protocol activated - All signals RED", "error", "critical");

          // Emergency impact on metrics
          setSystemMetrics({
            efficiency: 58.3,    // Severe drop - all traffic halted
            punctuality: 72.1,   // Major delays
            safety: 99.9,        // Safety protocol active
            utilization: 35.2    // Very low due to complete stop
          });

          setSignalStates({ s1: 'red', s2: 'red', s3: 'red' });
          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, speed: 0, status: 'emergency_hold', x: 300 },
            intercity: { ...prev.intercity, speed: 0, status: 'medical_emergency', x: 480, platformStop: true, emergency: true },
            freight: { ...prev.freight, speed: 0, status: 'emergency_hold', x: 200 }
          }));
        }, 4000));

        // Step 3: Emergency services dispatch (t=6s)
        timeouts.push(setTimeout(() => {
          addNotification("Emergency medical team dispatched to Platform 3", "warning", "high");
          addNotification("All traffic halted - Priority medical assistance", "warning", "high");
        }, 6000));

        // Step 4: Medical team arrival (t=9s)
        timeouts.push(setTimeout(() => {
          addNotification("Medical team on-site - Patient being treated", "info", "medium");
          addNotification("Preparing for emergency evacuation", "info", "medium");
        }, 9000));

        // Step 5: Situation stabilized (t=12s)
        timeouts.push(setTimeout(() => {
          addNotification("Patient stabilized - Cleared for transport", "success", "medium");
          addNotification("Intercity cleared for departure", "success", "medium");

          setSignalStates(prev => ({ ...prev, s2: 'green', s3: 'green' }));
          setTrainStates(prev => ({
            ...prev,
            intercity: { ...prev.intercity, speed: 30, status: 'cautious_departure', emergency: false, platformStop: false },
            freight: { ...prev.freight, speed: 40, status: 'proceeding_caution' }
          }));
        }, 12000));

        // Step 6: Full resolution (t=15s)
        timeouts.push(setTimeout(() => {
          setEmergencyActive(false);
          setSignalStates({ s1: 'green', s2: 'green', s3: 'green' });
          addNotification("✅ EMERGENCY RESOLVED: Normal operations resumed", "success", "high");

          // Metrics recovery after emergency resolution
          setSystemMetrics({
            efficiency: 88.7,    // Recovery but still below baseline
            punctuality: 91.5,   // Significant delays still affecting
            safety: 99.9,        // Maintained high safety
            utilization: 78.9    // Gradual recovery
          });

          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, speed: 140, status: 'normal_operations' },
            intercity: { ...prev.intercity, speed: 95, status: 'normal_operations' },
            freight: { ...prev.freight, speed: 60, status: 'normal_operations' }
          }));
        }, 15000));
        break;

      case 'optimization':
        addNotification("AI Optimization engine activated", "info", "medium");

        // Step 1: Initial problem - all trains converging on Platform 2 (t=2s)
        timeouts.push(setTimeout(() => {
          addNotification("PROBLEM: All trains scheduled for Platform 2 at 14:30", "warning", "high");
          addNotification("Current routes: Rajdhani→PF-2, Intercity→PF-2, Freight→PF-2", "warning", "medium");

          // All trains start moving toward Platform 2 (same position = conflict)
          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, x: 350, track: 1, y: 110, status: 'heading_to_platform_2', speed: 140 },
            intercity: { ...prev.intercity, x: 500, track: 2, y: 190, status: 'heading_to_platform_2', speed: 95 },
            freight: { ...prev.freight, x: 300, track: 3, y: 270, status: 'heading_to_platform_2', speed: 60 }
          }));
        }, 2000));

        // Step 2: AI detects the conflict and calculates solution (t=5s)
        timeouts.push(setTimeout(() => {
          addNotification("AI CONFLICT PREDICTION: Platform 2 will be overloaded", "error", "high");
          addNotification("CALCULATING... Optimal platform redistribution", "info", "medium");

          // Show convergence problem - all trains getting close to same area
          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, x: 420, status: 'conflict_detected_pf2' },
            intercity: { ...prev.intercity, x: 450, status: 'conflict_detected_pf2' },
            freight: { ...prev.freight, x: 400, status: 'conflict_detected_pf2' }
          }));
        }, 5000));

        // Step 3: AI presents the solution (t=7s)
        timeouts.push(setTimeout(() => {
          addNotification("✅ SOLUTION FOUND: Redistribute to avoid conflict", "success", "high");
          addNotification("NEW ALLOCATION: Rajdhani→PF-1, Intercity→PF-2, Freight→PF-3", "success", "medium");
          addNotification("Executing real-time rerouting...", "info", "medium");
        }, 7000));

        // Step 4: Execute the visual rerouting (t=9s)
        timeouts.push(setTimeout(() => {
          addNotification("REROUTING: Rajdhani to Platform 1 (Track 1)", "warning", "medium");
          addNotification("REROUTING: Freight to Platform 3 (Track 3)", "warning", "medium");
          addNotification("Intercity continues to Platform 2 (Track 2)", "info", "medium");

          // Visual rerouting: spread trains to different platforms
          setTrainStates(prev => ({
            ...prev,
            rajdhani: {
              ...prev.rajdhani,
              x: 480, track: 1, y: 110,
              rerouting: true,
              status: 'rerouted_to_platform_1',
              speed: 120
            },
            intercity: {
              ...prev.intercity,
              x: 480, track: 2, y: 190,
              status: 'proceeding_to_platform_2',
              speed: 95
            },
            freight: {
              ...prev.freight,
              x: 480, track: 3, y: 270,
              rerouting: true,
              status: 'rerouted_to_platform_3',
              speed: 55
            }
          }));
        }, 9000));

        // Step 5: Trains arrive at their newly allocated platforms (t=12s)
        timeouts.push(setTimeout(() => {
          addNotification("✅ PLATFORM ALLOCATION SUCCESSFUL", "success", "high");
          addNotification("Rajdhani arrived at Platform 1", "success", "low");
          addNotification("Intercity arrived at Platform 2", "success", "low");
          addNotification("Freight arrived at Platform 3", "success", "low");

          // All trains at their respective platforms
          setTrainStates(prev => ({
            ...prev,
            rajdhani: {
              ...prev.rajdhani,
              x: 480, platformStop: true,
              status: 'platform_1_optimized',
              speed: 0
            },
            intercity: {
              ...prev.intercity,
              x: 480, platformStop: true,
              status: 'platform_2_as_planned',
              speed: 0
            },
            freight: {
              ...prev.freight,
              x: 480, platformStop: true,
              status: 'platform_3_optimized',
              speed: 0
            }
          }));
        }, 12000));

        // Step 6: Show optimization results (t=15s)
        timeouts.push(setTimeout(() => {
          addNotification("OPTIMIZATION COMPLETE: Zero conflicts", "success", "high");
          addNotification("Result: 100% conflict avoidance achieved", "success", "medium");
          addNotification("Platform efficiency improved to 95.1%", "success", "low");

          // Update system metrics to reflect optimization gains
          setSystemMetrics({
            efficiency: 97.8,    // Improved from 94.2% 
            punctuality: 99.1,   // Improved from 98.7%
            safety: 99.9,        // Maintained
            utilization: 95.1    // Improved from 87.3%
          });

          // Trains depart from optimized positions
          setTrainStates(prev => ({
            ...prev,
            rajdhani: {
              ...prev.rajdhani,
              x: 550, platformStop: false,
              status: 'departing_platform_1',
              speed: 140, rerouting: false
            },
            intercity: {
              ...prev.intercity,
              x: 550, platformStop: false,
              status: 'departing_platform_2',
              speed: 95
            },
            freight: {
              ...prev.freight,
              x: 550, platformStop: false,
              status: 'departing_platform_3',
              speed: 60, rerouting: false
            }
          }));
        }, 15000));

        // Step 7: Return to normal operations (t=18s)
        timeouts.push(setTimeout(() => {
          addNotification("AI learning stored: Platform conflict prevention", "info", "low");

          setTrainStates(prev => ({
            ...prev,
            rajdhani: { ...prev.rajdhani, x: 120, track: 1, y: 110, status: 'normal_operations' },
            intercity: { ...prev.intercity, x: 700, track: 2, y: 190, status: 'normal_operations' },
            freight: { ...prev.freight, x: 120, track: 3, y: 270, status: 'normal_operations' }
          }));
        }, 18000));
        break;
    }

    return clearTimeouts;
  }, [activeScenario]);

  // Railway Loading Animation Component
  const RailwayLoader = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Railway Track Animation */}
        <div className="relative mb-8">
          <div className="w-80 h-4 bg-gray-600 rounded-full relative overflow-hidden">
            {/* Railway Tracks */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-full bg-gray-400"
                  style={{ left: `${i * 12.5}%` }}
                />
              ))}
            </div>
            {/* Moving Train */}
            <motion.div
              className="absolute top-0 left-0 h-full flex items-center"
              animate={{ x: [0, 300, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Train className="w-8 h-8 text-orange-400" />
            </motion.div>
          </div>
        </div>

        {/* Loading Text in Hindi and English */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white"
        >
          <h2 className="text-3xl font-bold mb-2">भारतीय रेलवे</h2>
          <h3 className="text-xl font-semibold mb-4">AI-Powered Traffic System</h3>
          <p className="text-lg">Loading...</p>
        </motion.div>

        {/* Loading Dots Animation */}
        <div className="flex justify-center space-x-2 mt-6">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-orange-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <RailwayLoader />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Hindi Header */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center bg-orange-500/20 rounded-full px-5 py-2 mb-2">
                <span className="text-lg md:text-xl font-semibold text-orange-300">
                  भारतीय रेलवे के लिए
                </span>
              </div>
              <p className="text-base md:text-lg text-blue-100 font-medium">
                स्मार्ट ट्रैफिक प्रबंधन प्रणाली
              </p>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block mb-1">Next-Gen Railway</span>
                <span className="block text-yellow-300">Traffic Control</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-4 space-y-2"
            >
              <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                Revolutionizing Indian Railways with intelligent traffic management,
                real-time optimization, and conflict-free scheduling
              </p>
              <div className="border-t border-blue-400/30 pt-3">
                <p className="text-base md:text-lg text-blue-100 font-medium">
                  आधुनिक तकनीक से भारतीय रेलवे को सशक्त बनाना
                </p>
                <p className="text-sm md:text-base text-blue-200 mt-1">
                  Making Indian Railways stronger with modern technology
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/demo"
                className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold">View Live Demo</span>
                  <span className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    लाइव डेमो देखें
                  </span>
                </div>
              </Link>
              <Link
                to="/features"
                className="group border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold">Explore Features</span>
                  <span className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    सुविधाएं देखें
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intelligent Railway Operations Center */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-blue-600/20 rounded-full px-6 py-3 mb-6">
              <Train className="w-6 h-6 mr-3 text-blue-400" />
              <span className="text-lg font-semibold text-blue-300">AI-Powered Operations</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Intelligent Railway Management System
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience advanced train precedence optimization, real-time conflict resolution,
              dynamic platform allocation, and intelligent disruption management
            </p>
          </motion.div>

          {/* Scenario Control Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-center">Operation Scenarios</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  {
                    id: 'normal',
                    name: 'Normal Operations',
                    description: 'Optimal scheduling',
                    color: 'bg-green-600',
                    icon: '🚄'
                  },
                  {
                    id: 'conflict',
                    name: 'Conflict Resolution',
                    description: 'Multiple train conflicts',
                    color: 'bg-yellow-600',
                    icon: '⚠️'
                  },
                  {
                    id: 'emergency',
                    name: 'Emergency Response',
                    description: 'Priority rerouting',
                    color: 'bg-red-600',
                    icon: '🚨'
                  },
                  {
                    id: 'optimization',
                    name: 'AI Optimization',
                    description: 'Learning & adapting',
                    color: 'bg-purple-600',
                    icon: '🧠'
                  }
                ].map((scenario) => (
                  <motion.button
                    key={scenario.id}
                    onClick={() => setActiveScenario(scenario.id)}
                    className={`p-4 rounded-xl transition-all duration-300 border-2 ${activeScenario === scenario.id
                      ? `${scenario.color} border-white/30 scale-105`
                      : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl mb-2">{scenario.icon}</div>
                    <h4 className="font-semibold text-sm mb-1">{scenario.name}</h4>
                    <p className="text-xs text-gray-300">{scenario.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Operations Dashboard */}
          <div className="overflow-x-auto flex flex-col gap-6">

            {/* Left Column: Network Control Centre Only */}
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">

              {/* Network Map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="h-full bg-gray-80060 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 w-full max-w-4xl min-w-0"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-white">Network Control Center</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400">System Active</span>
                    <span className="text-sm text-gray-400">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Enhanced Railway Network */}<svg
                  viewBox="0 0 1000 550"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Enhanced Background */}
                  <defs>
                    <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#374151" strokeWidth="0.8" opacity="0.3" />
                    </pattern>
                    <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#93C5FD" />
                    </linearGradient>
                  </defs>
                  <rect width="1000" height="400" fill="url(#gridPattern)" />

                  {/* Station Areas */}
                  <g opacity="0.1">
                    <rect x="80" y="40" width="120" height="320" fill="#60A5FA" rx="8" />
                    <rect x="400" y="40" width="200" height="320" fill="#F59E0B" rx="8" />
                    <rect x="800" y="40" width="120" height="320" fill="#60A5FA" rx="8" />
                  </g>

                  {/* Main Railway Infrastructure */}
                  <g stroke="url(#trackGradient)" strokeWidth="5" fill="none">
                    {/* Primary Lines */}
                    <line x1="60" y1="120" x2="940" y2="120" />
                    <line x1="60" y1="200" x2="940" y2="200" />
                    <line x1="60" y1="280" x2="940" y2="280" />

                    {/* Complex Junction System */}
                    <path d="M 250 120 Q 350 150 400 200" />
                    <path d="M 400 200 Q 450 250 550 280" />
                    <path d="M 550 200 Q 650 150 750 120" />
                    <path d="M 750 200 Q 650 250 550 280" />

                    {/* Yard Connections */}
                    <line x1="400" y1="80" x2="600" y2="80" />
                    <line x1="400" y1="320" x2="600" y2="320" />

                    {/* Platform Access */}
                    <line x1="480" y1="100" x2="480" y2="140" />
                    <line x1="520" y1="100" x2="520" y2="140" />
                    <line x1="480" y1="180" x2="480" y2="220" />
                    <line x1="520" y1="180" x2="520" y2="220" />
                    <line x1="480" y1="260" x2="480" y2="300" />
                    <line x1="520" y1="260" x2="520" y2="300" />
                  </g>

                  {/* Stations and Platforms */}
                  <g>
                    {/* Station A (Left) */}
                    <rect x="120" y="110" width="80" height="20" fill="#10B981" rx="6" />
                    <rect x="120" y="190" width="80" height="20" fill="#10B981" rx="6" />
                    <rect x="120" y="270" width="80" height="20" fill="#10B981" rx="6" />
                    <text x="160" y="123" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Delhi</text>
                    <text x="160" y="203" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Jn A1</text>
                    <text x="160" y="283" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Jn A2</text>

                    {/* Central Hub */}
                    <rect x="460" y="70" width="80" height="20" fill="#F59E0B" rx="6" />
                    <rect x="460" y="110" width="80" height="20" fill="#F59E0B" rx="6" />
                    <rect x="460" y="190" width="80" height="20" fill="#F59E0B" rx="6" />
                    <rect x="460" y="270" width="80" height="20" fill="#F59E0B" rx="6" />
                    <rect x="460" y="310" width="80" height="20" fill="#F59E0B" rx="6" />
                    <text x="500" y="83" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PF-1</text>
                    <text x="500" y="123" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PF-2</text>
                    <text x="500" y="203" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PF-3</text>
                    <text x="500" y="283" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PF-4</text>
                    <text x="500" y="323" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PF-5</text>

                    {/* Station B (Right) */}
                    <rect x="800" y="110" width="80" height="20" fill="#8B5CF6" rx="6" />
                    <rect x="800" y="190" width="80" height="20" fill="#8B5CF6" rx="6" />
                    <rect x="800" y="270" width="80" height="20" fill="#8B5CF6" rx="6" />
                    <text x="840" y="123" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Mumbai</text>
                    <text x="840" y="203" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Jn B1</text>
                    <text x="840" y="283" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Jn B2</text>
                  </g>

                  {/* Realistic Dynamic Train System */}
                  <g>
                    {/* Express Train - Rajdhani */}
                    <motion.g
                      animate={{
                        x: trainStates.rajdhani.x,
                        y: trainStates.rajdhani.y
                      }}
                      transition={{
                        duration: activeScenario === 'normal' ? 2.5 :
                          activeScenario === 'optimization' ? 2.0 : 1.5,
                        ease: trainStates.rajdhani.status === 'emergency_stop' ? "easeOut" :
                          trainStates.rajdhani.rerouting ? "easeInOut" : "easeInOut"
                      }}
                    >
                      <rect
                        x="0" y="0" width="60" height="20"
                        fill={trainStates.rajdhani.emergency ? "#EF4444" : "#DC2626"}
                        rx="10"
                      />
                      <circle cx="15" cy="10" r="4" fill="#7F1D1D" />
                      <circle cx="45" cy="10" r="4" fill="#7F1D1D" />
                      <text x="30" y="13" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">RAJ</text>

                      {/* Emergency Indicator */}
                      {trainStates.rajdhani.emergency && (
                        <motion.circle
                          cx="30" cy="-10" r="6" fill="#EF4444"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}

                      {/* Conflict Warning */}
                      {conflictDetected && trainStates.rajdhani.status.includes('stop') && (
                        <motion.rect
                          x="-5" y="-5" width="70" height="30"
                          fill="none" stroke="#EF4444" strokeWidth="2" rx="10"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}

                      {/* Rerouting Indicator */}
                      {trainStates.rajdhani.rerouting && (
                        <motion.path
                          d="M 65 10 L 75 5 L 75 15 Z"
                          fill="#F59E0B"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )}

                      {/* Speed Display */}
                      <text x="30" y="-8" textAnchor="middle" fill="#F3F4F6" fontSize="8">
                        {trainStates.rajdhani.speed} km/h
                      </text>

                      {/* Status Display */}
                      <text x="30" y="35" textAnchor="middle" fill="#9CA3AF" fontSize="7">
                        {trainStates.rajdhani.status.replace(/_/g, ' ').toUpperCase()}
                      </text>
                    </motion.g>

                    {/* Passenger Train - Intercity */}
                    <motion.g
                      animate={{
                        x: trainStates.intercity.x,
                        y: trainStates.intercity.y
                      }}
                      transition={{
                        duration: activeScenario === 'normal' ? 2.5 :
                          activeScenario === 'optimization' ? 2.0 : 1.5,
                        ease: trainStates.intercity.status === 'medical_emergency' ? "easeOut" :
                          trainStates.intercity.rerouting ? "easeInOut" : "easeInOut"
                      }}
                    >
                      <rect
                        x="0" y="0" width="50" height="18"
                        fill={trainStates.intercity.emergency ? "#EF4444" : "#059669"}
                        rx="9"
                      />
                      <circle cx="12" cy="9" r="3" fill="#064E3B" />
                      <circle cx="38" cy="9" r="3" fill="#064E3B" />
                      <text x="25" y="12" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">IC</text>

                      {/* Medical Emergency Indicator */}
                      {trainStates.intercity.emergency && (
                        <>
                          <motion.circle
                            cx="25" cy="-12" r="8" fill="#EF4444"
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                          />
                          <text x="25" y="-8" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">🚨</text>
                        </>
                      )}

                      {/* Platform Stop Indicator */}
                      {trainStates.intercity.platformStop && (
                        <motion.rect
                          x="-5" y="-5" width="60" height="28"
                          fill="none" stroke="#F59E0B" strokeWidth="2" rx="9"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}

                      {/* Rerouting Indicator */}
                      {trainStates.intercity.rerouting && (
                        <motion.path
                          d="M 55 9 L 65 4 L 65 14 Z"
                          fill="#8B5CF6"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )}

                      {/* Speed Display */}
                      <text x="25" y="-8" textAnchor="middle" fill="#F3F4F6" fontSize="8">
                        {trainStates.intercity.speed} km/h
                      </text>

                      {/* Status Display */}
                      <text x="25" y="35" textAnchor="middle" fill="#9CA3AF" fontSize="7">
                        {trainStates.intercity.status.replace(/_/g, ' ').toUpperCase()}
                      </text>
                    </motion.g>

                    {/* Freight Train */}
                    <motion.g
                      animate={{
                        x: trainStates.freight.x,
                        y: trainStates.freight.y
                      }}
                      transition={{
                        duration: activeScenario === 'normal' ? 3.0 :
                          activeScenario === 'optimization' ? 2.5 : 2.0,
                        ease: trainStates.freight.rerouting ? "easeInOut" : "linear"
                      }}
                    >
                      <rect x="0" y="0" width="70" height="18" fill="#7C3AED" rx="9" />
                      <rect x="10" y="5" width="12" height="8" fill="#5B21B6" rx="2" />
                      <rect x="28" y="5" width="12" height="8" fill="#5B21B6" rx="2" />
                      <rect x="46" y="5" width="12" height="8" fill="#5B21B6" rx="2" />
                      <text x="35" y="12" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">FRT</text>

                      {/* Emergency Hold Indicator */}
                      {trainStates.freight.status === 'emergency_hold' && (
                        <motion.rect
                          x="-5" y="-5" width="80" height="28"
                          fill="none" stroke="#EF4444" strokeWidth="2" rx="9"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}

                      {/* Rerouting Indicator */}
                      {trainStates.freight.rerouting && (
                        <motion.path
                          d="M 75 9 L 85 4 L 85 14 Z"
                          fill="#F59E0B"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )}

                      {/* Speed Display */}
                      <text x="35" y="-8" textAnchor="middle" fill="#F3F4F6" fontSize="8">
                        {trainStates.freight.speed} km/h
                      </text>

                      {/* Status Display */}
                      <text x="35" y="35" textAnchor="middle" fill="#9CA3AF" fontSize="7">
                        {trainStates.freight.status.replace(/_/g, ' ').toUpperCase()}
                      </text>
                    </motion.g>

                    {/* Platform Indicators */}
                    {trainStates.intercity.platformStop && (
                      <motion.rect
                        x="460" y="185" width="80" height="25"
                        fill="none" stroke="#059669" strokeWidth="3" rx="4"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}

                    {/* Rajdhani Platform Indicator */}
                    {trainStates.rajdhani.platformStop && (
                      <motion.rect
                        x="460" y="105" width="80" height="25"
                        fill="none" stroke="#DC2626" strokeWidth="3" rx="4"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}

                    {/* Freight Platform Indicator */}
                    {trainStates.freight.platformStop && (
                      <motion.rect
                        x="460" y="265" width="80" height="25"
                        fill="none" stroke="#7C3AED" strokeWidth="3" rx="4"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}

                    {/* Conflict Zone Highlight */}
                    {conflictDetected && (
                      <motion.rect
                        x="550" y="80" width="100" height="200"
                        fill="#EF4444" opacity="0.1" rx="8"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}

                    {/* Optimization Zone Highlight */}
                    {activeScenario === 'optimization' && (trainStates.rajdhani.platformStop || trainStates.intercity.platformStop || trainStates.freight.platformStop) && (
                      <motion.rect
                        x="440" y="60" width="120" height="250"
                        fill="#8B5CF6" opacity="0.1" rx="8"
                        animate={{ opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </g>

                  {/* Dynamic Signal System */}
                  <g>
                    {/* Signal S1 */}
                    <motion.circle
                      cx="350" cy="105" r="12"
                      fill={
                        signalStates.s1 === 'red' ? "#EF4444" :
                          signalStates.s1 === 'yellow' ? "#F59E0B" : "#10B981"
                      }
                      animate={{
                        opacity: signalStates.s1 === 'red' ? [1, 0.3, 1] : [1, 0.7, 1],
                        scale: signalStates.s1 === 'red' ? [1, 1.2, 1] : [1, 1, 1]
                      }}
                      transition={{
                        duration: signalStates.s1 === 'red' ? 1 : 2,
                        repeat: Infinity
                      }}
                    />

                    {/* Signal S2 */}
                    <motion.circle
                      cx="650" cy="185" r="12"
                      fill={
                        signalStates.s2 === 'red' ? "#EF4444" :
                          signalStates.s2 === 'yellow' ? "#F59E0B" : "#10B981"
                      }
                      animate={{
                        opacity: signalStates.s2 === 'red' ? [1, 0.3, 1] : [1, 0.7, 1],
                        scale: signalStates.s2 === 'red' ? [1, 1.2, 1] : [1, 1, 1]
                      }}
                      transition={{
                        duration: signalStates.s2 === 'red' ? 1 : 1.8,
                        repeat: Infinity,
                        delay: 0.5
                      }}
                    />

                    {/* Signal S3 */}
                    <motion.circle
                      cx="450" cy="265" r="12"
                      fill={
                        signalStates.s3 === 'red' ? "#EF4444" :
                          signalStates.s3 === 'yellow' ? "#F59E0B" : "#10B981"
                      }
                      animate={{
                        opacity: signalStates.s3 === 'red' ? [1, 0.3, 1] : [1, 0.7, 1],
                        scale: signalStates.s3 === 'red' ? [1, 1.2, 1] : [1, 1, 1]
                      }}
                      transition={{
                        duration: signalStates.s3 === 'red' ? 1 : 2.2,
                        repeat: Infinity,
                        delay: 1
                      }}
                    />

                    {/* Signal Labels with Status */}
                    <text x="350" y="95" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontWeight="bold">
                      S1-{signalStates.s1.toUpperCase()}
                    </text>
                    <text x="650" y="175" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontWeight="bold">
                      S2-{signalStates.s2.toUpperCase()}
                    </text>
                    <text x="450" y="255" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontWeight="bold">
                      S3-{signalStates.s3.toUpperCase()}
                    </text>
                  </g>

                  {/* Area Labels */}
                  <text x="140" y="40" textAnchor="middle" fill="#9CA3AF" fontSize="14" fontWeight="bold">Terminal A</text>
                  <text x="500" y="40" textAnchor="middle" fill="#9CA3AF" fontSize="14" fontWeight="bold">Central Hub</text>
                  <text x="860" y="40" textAnchor="middle" fill="#9CA3AF" fontSize="14" fontWeight="bold">Terminal B</text>

                  {/* Platform Area Labels (visible during optimization) */}
                  {activeScenario === 'optimization' && (
                    <g>
                      <rect x="440" y="90" width="100" height="30" fill="#1F2937" fillOpacity="0.8" rx="8" />
                      <text x="490" y="107" textAnchor="middle" fill="#DC2626" fontSize="12" fontWeight="bold">Platform 1</text>

                      <rect x="440" y="170" width="100" height="30" fill="#1F2937" fillOpacity="0.8" rx="8" />
                      <text x="490" y="187" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="bold">Platform 2</text>

                      <rect x="440" y="250" width="100" height="30" fill="#1F2937" fillOpacity="0.8" rx="8" />
                      <text x="490" y="267" textAnchor="middle" fill="#7C3AED" fontSize="12" fontWeight="bold">Platform 3</text>
                    </g>
                  )}

                  {/* Initial Flow Indicators (Problematic) */}
                  {activeScenario === 'optimization' &&
                    (trainStates.rajdhani.status.includes('heading_to_platform_2') ||
                      trainStates.rajdhani.status.includes('conflict_detected_pf2')) && (
                      <g>
                        {/* Initial problematic flow arrows - all pointing to Platform 2 */}
                        <motion.path
                          d="M 200 120 Q 350 140 460 180"
                          stroke="#EF4444" strokeWidth="3" fill="none" strokeDasharray="8,4"
                          animate={{ strokeDashoffset: [0, -24] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                          d="M 600 200 Q 550 190 500 185"
                          stroke="#EF4444" strokeWidth="3" fill="none" strokeDasharray="8,4"
                          animate={{ strokeDashoffset: [0, -24] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                          d="M 250 280 Q 350 240 460 200"
                          stroke="#EF4444" strokeWidth="3" fill="none" strokeDasharray="8,4"
                          animate={{ strokeDashoffset: [0, -24] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Conflict warning at Platform 2 */}
                        <motion.circle
                          cx="490" cy="190" r="25"
                          fill="none" stroke="#EF4444" strokeWidth="3"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.3, 0.8] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <text x="490" y="195" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">
                          CONFLICT!
                        </text>
                      </g>
                    )}

                  {/* Optimized Re-route Flow Indicators */}
                  {activeScenario === 'optimization' &&
                    (trainStates.rajdhani.status.includes('rerouted_to_platform') ||
                      trainStates.rajdhani.status.includes('platform_') ||
                      trainStates.rajdhani.status.includes('departing_platform')) && (
                      <g>
                        {/* Optimized flow arrows - each to different platforms */}
                        <motion.path
                          d="M 200 120 Q 350 110 460 110"
                          stroke="#10B981" strokeWidth="3" fill="none" strokeDasharray="8,4"
                          animate={{ strokeDashoffset: [0, -24] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                          d="M 600 200 Q 550 190 500 185"
                          stroke="#10B981" strokeWidth="3" fill="none" strokeDasharray="8,4"
                          animate={{ strokeDashoffset: [0, -24] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                          d="M 250 280 Q 350 270 460 270"
                          stroke="#10B981" strokeWidth="3" fill="none" strokeDasharray="8,4"
                          animate={{ strokeDashoffset: [0, -24] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Success indicators at each platform */}
                        <motion.circle
                          cx="490" cy="110" r="15"
                          fill="#10B981" fillOpacity="0.3"
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.circle
                          cx="490" cy="190" r="15"
                          fill="#10B981" fillOpacity="0.3"
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.circle
                          cx="490" cy="270" r="15"
                          fill="#10B981" fillOpacity="0.3"
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        />

                        {/* Success text */}
                        <text x="600" y="195" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="bold">
                          OPTIMIZED!
                        </text>
                      </g>
                    )}

                  {/* Normal Operations Flow */}
                  {activeScenario === 'normal' &&
                    (trainStates.rajdhani.status.includes('approaching') ||
                      trainStates.rajdhani.status.includes('platform') ||
                      trainStates.rajdhani.status.includes('departing')) && (
                      <g>
                        {/* Smooth operational flow arrows */}
                        <motion.path
                          d="M 200 120 Q 350 110 480 110"
                          stroke="#3B82F6" strokeWidth="3" fill="none" strokeDasharray="6,3"
                          animate={{ strokeDashoffset: [0, -18] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                          d="M 600 200 Q 550 190 480 190"
                          stroke="#3B82F6" strokeWidth="3" fill="none" strokeDasharray="6,3"
                          animate={{ strokeDashoffset: [0, -18] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        />
                        <motion.path
                          d="M 200 280 Q 350 270 480 270"
                          stroke="#3B82F6" strokeWidth="3" fill="none" strokeDasharray="6,3"
                          animate={{ strokeDashoffset: [0, -18] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                        />

                        {/* Operational flow indicators */}
                        <motion.circle
                          cx="490" cy="110" r="12"
                          fill="#3B82F6" fillOpacity="0.4"
                          animate={{ scale: [0.9, 1.1, 0.9] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.circle
                          cx="490" cy="190" r="12"
                          fill="#3B82F6" fillOpacity="0.4"
                          animate={{ scale: [0.9, 1.1, 0.9] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.circle
                          cx="490" cy="270" r="12"
                          fill="#3B82F6" fillOpacity="0.4"
                          animate={{ scale: [0.9, 1.1, 0.9] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        />

                        {/* Normal operations text */}
                        <text x="600" y="195" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="bold">
                          ON SCHEDULE
                        </text>
                      </g>
                    )}

                  {/* Conflict Resolution Flow */}
                  {activeScenario === 'conflict' && (
                    <g>
                      {/* Initial conflict flow (red) */}
                      {(trainStates.rajdhani.status.includes('approaching_junction') ||
                        trainStates.rajdhani.status.includes('emergency_stop')) && (
                          <>
                            <motion.path
                              d="M 200 120 Q 350 140 550 180"
                              stroke="#EF4444" strokeWidth="4" fill="none" strokeDasharray="10,5"
                              animate={{ strokeDashoffset: [0, -30] }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.path
                              d="M 700 200 Q 650 190 550 180"
                              stroke="#EF4444" strokeWidth="4" fill="none" strokeDasharray="10,5"
                              animate={{ strokeDashoffset: [0, -30] }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Conflict warning */}
                            <motion.circle
                              cx="550" cy="180" r="20"
                              fill="none" stroke="#EF4444" strokeWidth="3"
                              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                            />
                            <text x="550" y="185" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">
                              CONFLICT!
                            </text>
                          </>
                        )}

                      {/* Resolution flow (green) */}
                      {(trainStates.rajdhani.status.includes('rerouting') ||
                        trainStates.rajdhani.status.includes('proceeding') ||
                        trainStates.rajdhani.status.includes('normal_operations')) && (
                          <>
                            <motion.path
                              d="M 200 120 Q 300 140 450 190"
                              stroke="#10B981" strokeWidth="3" fill="none" strokeDasharray="8,4"
                              animate={{ strokeDashoffset: [0, -24] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.path
                              d="M 700 200 Q 650 190 550 180"
                              stroke="#10B981" strokeWidth="3" fill="none" strokeDasharray="8,4"
                              animate={{ strokeDashoffset: [0, -24] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
                            />

                            {/* Resolution success */}
                            <motion.circle
                              cx="450" cy="190" r="15"
                              fill="#10B981" fillOpacity="0.3"
                              animate={{ scale: [0.8, 1.2, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <text x="600" y="195" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="bold">
                              RESOLVED!
                            </text>
                          </>
                        )}
                    </g>
                  )}

                  {/* Emergency Response Flow */}
                  {activeScenario === 'emergency' && (
                    <g>
                      {/* Emergency stop flow (red) */}
                      {(trainStates.rajdhani.status.includes('emergency') ||
                        trainStates.intercity.status.includes('medical') ||
                        trainStates.freight.status.includes('emergency_hold')) && (
                          <>
                            <motion.path
                              d="M 200 120 Q 350 130 480 140"
                              stroke="#EF4444" strokeWidth="4" fill="none" strokeDasharray="12,6"
                              animate={{ strokeDashoffset: [0, -36], opacity: [1, 0.3, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.path
                              d="M 700 200 Q 600 190 480 190"
                              stroke="#EF4444" strokeWidth="4" fill="none" strokeDasharray="12,6"
                              animate={{ strokeDashoffset: [0, -36], opacity: [1, 0.3, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 0.2 }}
                            />
                            <motion.path
                              d="M 200 280 Q 350 270 480 260"
                              stroke="#EF4444" strokeWidth="4" fill="none" strokeDasharray="12,6"
                              animate={{ strokeDashoffset: [0, -36], opacity: [1, 0.3, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 0.4 }}
                            />

                            {/* Emergency warning zone */}
                            <motion.circle
                              cx="480" cy="190" r="25"
                              fill="#EF4444" fillOpacity="0.1"
                              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                            <text x="480" y="195" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">
                              EMERGENCY!
                            </text>
                          </>
                        )}

                      {/* Cautious recovery flow (orange) */}
                      {(trainStates.rajdhani.status.includes('cautious') ||
                        trainStates.intercity.status.includes('cautious') ||
                        trainStates.rajdhani.status.includes('normal_operations')) && (
                          <>
                            <motion.path
                              d="M 200 120 Q 350 110 480 110"
                              stroke="#F59E0B" strokeWidth="3" fill="none" strokeDasharray="6,6"
                              animate={{ strokeDashoffset: [0, -24] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.path
                              d="M 700 200 Q 600 190 480 190"
                              stroke="#F59E0B" strokeWidth="3" fill="none" strokeDasharray="6,6"
                              animate={{ strokeDashoffset: [0, -24] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                            />
                            <motion.path
                              d="M 200 280 Q 350 270 480 270"
                              stroke="#F59E0B" strokeWidth="3" fill="none" strokeDasharray="6,6"
                              animate={{ strokeDashoffset: [0, -24] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
                            />

                            {/* Recovery indicators */}
                            <motion.circle
                              cx="480" cy="190" r="18"
                              fill="#F59E0B" fillOpacity="0.2"
                              animate={{ scale: [0.9, 1.1, 0.9] }}
                              transition={{ duration: 2.5, repeat: Infinity }}
                            />
                            <text x="600" y="195" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="bold">
                              RECOVERING
                            </text>
                          </>
                        )}
                    </g>
                  )}
                </svg>
                {/* <div className="relative bg-slate-900 rounded-xl p-8 mb-6 overflow-hidden" style={{ height: '480px' }}>
                  <div className="flex justify-center items-center w-full h-full">
                    <span className="text-gray-400">Network Visualization Here</span>
                  </div>
                </div> */}
              </motion.div>


              {/* Track Status Cards */}
              <div className="w-full min-w-0">
                <div className="flex gap-8">
                  {/* Track 1 */}
                  <div className={`flex-1 min-w-0 p-8 rounded-xl border-2 transition-all duration-300 min-h-[280px] ${trainStates.rajdhani.status === 'emergency_stop' ? 'bg-red-900/30 border-red-500' :
                    trainStates.rajdhani.rerouting ? 'bg-yellow-900/30 border-yellow-500' :
                      trainStates.rajdhani.emergency ? 'bg-red-900/30 border-red-500' :
                        'bg-green-900/30 border-green-500'
                    }`}>
                    <div className="grid mb-6">
                      <span className="font-semibold text-xl">Track {trainStates.rajdhani.track} - Express</span>
                      <div className={`w-6 h-6 rounded-full ${trainStates.rajdhani.status === 'emergency_stop' ? 'bg-red-400 animate-pulse' :
                        trainStates.rajdhani.rerouting ? 'bg-yellow-400 animate-pulse' :
                          trainStates.rajdhani.speed > 0 ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                    </div>
                    <div className="space-y-6 text-lg">
                      <div className="flex flex-col space-y-2">
                        <span className="font-medium text-gray-300">Current: Rajdhani Exp</span>
                        <span className={`font-bold text-2xl ${trainStates.rajdhani.speed > 100 ? 'text-green-300' :
                          trainStates.rajdhani.speed > 0 ? 'text-yellow-300' : 'text-red-300'
                          }`}>
                          {trainStates.rajdhani.speed} km/h
                        </span>
                      </div>
                      <div className="grid">
                        <span>Status:</span>
                        <span className={`font-medium ${trainStates.rajdhani.status === 'emergency_stop' ? 'text-red-300' :
                          trainStates.rajdhani.rerouting ? 'text-yellow-300' :
                            'text-green-300'
                          }`}>
                          {trainStates.rajdhani.status.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="grid">
                        <span>Signal:</span>
                        <span className={`font-medium ${signalStates.s1 === 'red' ? 'text-red-300' :
                          signalStates.s1 === 'yellow' ? 'text-yellow-300' : 'text-green-300'
                          }`}>
                          {signalStates.s1.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Track 2 */}
                  <div className={`flex-1 min-w-0 p-8 rounded-xl border-2 transition-all duration-300 min-h-[280px] ${trainStates.intercity.emergency ? 'bg-red-900/30 border-red-500' :
                    trainStates.intercity.platformStop ? 'bg-orange-900/30 border-orange-500' :
                      trainStates.intercity.rerouting ? 'bg-purple-900/30 border-purple-500' :
                        'bg-blue-900/30 border-blue-500'
                    }`}>
                    <div className="grid mb-6">
                      <span className="font-semibold text-xl">Track {trainStates.intercity.track} - Passenger</span>
                      <div className={`w-6 h-6 rounded-full ${trainStates.intercity.emergency ? 'bg-red-400 animate-pulse' :
                        trainStates.intercity.platformStop ? 'bg-orange-400 animate-pulse' :
                          trainStates.intercity.rerouting ? 'bg-purple-400' :
                            'bg-blue-400'
                        }`}></div>
                    </div>
                    <div className="space-y-6 text-lg">
                      <div className="flex flex-col space-y-2">
                        <span className="font-medium text-gray-300">Current: Intercity</span>
                        <span className={`font-bold text-2xl ${trainStates.intercity.speed > 50 ? 'text-blue-300' :
                          trainStates.intercity.speed > 0 ? 'text-yellow-300' : 'text-red-300'
                          }`}>
                          {trainStates.intercity.speed} km/h
                        </span>
                      </div>
                      <div className="grid">
                        <span>Status:</span>
                        <span className={`font-medium ${trainStates.intercity.emergency ? 'text-red-300' :
                          trainStates.intercity.platformStop ? 'text-orange-300' :
                            trainStates.intercity.rerouting ? 'text-purple-300' :
                              'text-blue-300'
                          }`}>
                          {trainStates.intercity.status.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="grid">
                        <span>Platform:</span>
                        <span className={`font-medium ${trainStates.intercity.platformStop ? 'text-orange-300' : 'text-gray-400'}`}>
                          {trainStates.intercity.platformStop ? 'OCCUPIED' : 'AVAILABLE'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Track 3 */}
                  <div className={`flex-1 min-w-0 p-8 rounded-xl border-2 transition-all duration-300 min-h-[280px] ${trainStates.freight.status === 'emergency_hold' ? 'bg-red-900/30 border-red-500' :
                    trainStates.freight.rerouting ? 'bg-green-900/30 border-green-500' :
                      'bg-purple-900/30 border-purple-500'
                    }`}>
                    <div className="grid mb-6">
                      <span className="font-semibold text-xl">Track {trainStates.freight.track} - Freight</span>
                      <div className={`w-6 h-6 rounded-full ${trainStates.freight.status === 'emergency_hold' ? 'bg-red-400 animate-pulse' :
                        trainStates.freight.rerouting ? 'bg-green-400' :
                          'bg-purple-400'
                        }`}></div>
                    </div>
                    <div className="space-y-6 text-lg">
                      <div className="flex flex-col space-y-2">
                        <span className="font-medium text-gray-300">Current: Cargo</span>
                        <span className={`font-bold text-2xl ${trainStates.freight.speed > 40 ? 'text-purple-300' :
                          trainStates.freight.speed > 0 ? 'text-yellow-300' : 'text-red-300'
                          }`}>
                          {trainStates.freight.speed} km/h
                        </span>
                      </div>
                      <div className="grid">
                        <span>Status:</span>
                        <span className={`font-medium ${trainStates.freight.status === 'emergency_hold' ? 'text-red-300' :
                          trainStates.freight.rerouting ? 'text-green-300' :
                            'text-purple-300'
                          }`}>
                          {trainStates.freight.status.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="grid">
                        <span>Priority:</span>
                        <span className={`font-medium ${trainStates.freight.rerouting ? 'text-green-300' : 'text-gray-400'}`}>
                          {trainStates.freight.rerouting ? 'OPTIMIZED' : 'STANDARD'}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column: System Performance + AI Operations Log + Operations Flow Analysis */}
            <div className="space-y-6">
              {/* 1. System Performance */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
              >
                <h4 className="text-xl font-semibold mb-5 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-400" />
                  System Performance
                </h4>
                <div className="space-y-5">
                  {[
                    {
                      icon: <Zap className="w-5 h-5" />,
                      label: "Efficiency",
                      value: systemMetrics.efficiency,
                      target: 95,
                      color: "text-green-400",
                      bgColor: "bg-green-400"
                    },
                    {
                      icon: <Clock className="w-5 h-5" />,
                      label: "Punctuality",
                      value: systemMetrics.punctuality,
                      target: 98,
                      color: "text-blue-400",
                      bgColor: "bg-blue-400"
                    },
                    {
                      icon: <Shield className="w-5 h-5" />,
                      label: "Safety",
                      value: systemMetrics.safety,
                      target: 99.5,
                      color: "text-emerald-400",
                      bgColor: "bg-emerald-400"
                    },
                    {
                      icon: <Users className="w-5 h-5" />,
                      label: "Utilization",
                      value: systemMetrics.utilization,
                      target: 90,
                      color: "text-purple-400",
                      bgColor: "bg-purple-400"
                    }
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={metric.color}>{metric.icon}</div>
                          <span className="font-medium">{metric.label}</span>
                        </div>
                        <span className={`text-lg font-bold ${metric.color}`}>
                          {metric.value.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`h-full ${metric.bgColor} rounded-full relative`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(metric.value / 100) * 100}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                        >
                          <motion.div
                            className="absolute right-0 top-0 bottom-0 w-1 bg-white/60"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </motion.div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Target: {metric.target}%</span>
                        <span className={metric.value >= metric.target ? 'text-green-400' : 'text-yellow-400'}>
                          {metric.value >= metric.target ? '✓ On Target' : '⚠ Below Target'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 2. AI Operations Log */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
              >
                <h4 className="text-xl font-semibold mb-5 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-blue-400" />
                  AI Operations Log
                </h4>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {liveNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-l-4 ${notification.type === 'success' ? 'bg-green-900/30 border-green-400' :
                        notification.type === 'warning' ? 'bg-yellow-900/30 border-yellow-400' :
                          notification.type === 'error' ? 'bg-red-900/30 border-red-400' :
                            'bg-blue-900/30 border-blue-400'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${notification.priority === 'critical' ? 'bg-red-600 text-white' :
                          notification.priority === 'high' ? 'bg-orange-600 text-white' :
                            notification.priority === 'medium' ? 'bg-yellow-600 text-black' :
                              'bg-gray-600 text-white'
                          }`}>
                          {notification.priority?.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                      <p className="text-sm font-medium">{notification.message}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 3. Operations Flow Analysis */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
              >
                <h4 className="text-xl font-semibold mb-5 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-400" />
                  Operations Flow Analysis
                </h4>

                <div className="space-y-4">
                  {/* Current Active Scenario Display */}
                  <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/30">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-lg">Active Scenario</h5>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${activeScenario === 'normal' ? 'bg-green-600 text-white' :
                        activeScenario === 'conflict' ? 'bg-yellow-600 text-black' :
                          activeScenario === 'emergency' ? 'bg-red-600 text-white' :
                            'bg-purple-600 text-white'
                        }`}>
                        {activeScenario === 'normal' ? '🚄 Normal Operations' :
                          activeScenario === 'conflict' ? '⚠️ Conflict Resolution' :
                            activeScenario === 'emergency' ? '🚨 Emergency Response' :
                              '🧠 AI Optimization'}
                      </div>
                    </div>

                    <div className="text-sm text-gray-300">
                      {activeScenario === 'normal' &&
                        "Trains operating on scheduled routes with optimal platform allocation and smooth traffic flow."
                      }
                      {activeScenario === 'conflict' &&
                        "Multiple trains approaching same junction - AI system detecting conflicts and implementing resolution protocols."
                      }
                      {activeScenario === 'emergency' &&
                        "Emergency situation detected - All traffic halted, medical response activated, cautious operations resuming."
                      }
                      {activeScenario === 'optimization' &&
                        "AI analyzing platform allocation conflicts and redistributing trains for optimal efficiency and zero conflicts."
                      }
                    </div>
                  </div>

                  {/* Flow Indicators Summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/20">
                      <div className="flex items-center mb-2">
                        <div className={`w-3 h-3 rounded-full mr-2 ${activeScenario === 'normal' ? 'bg-blue-400' :
                          activeScenario === 'conflict' ? 'bg-red-400' :
                            activeScenario === 'emergency' ? 'bg-red-400' :
                              'bg-red-400'
                          }`}></div>
                        <span className="text-sm font-medium">Initial State</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {activeScenario === 'normal' && "Scheduled Flow"}
                        {activeScenario === 'conflict' && "Conflict Detected"}
                        {activeScenario === 'emergency' && "Emergency Stop"}
                        {activeScenario === 'optimization' && "Platform Conflict"}
                      </p>
                    </div>

                    <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/20">
                      <div className="flex items-center mb-2">
                        <div className={`w-3 h-3 rounded-full mr-2 ${activeScenario === 'normal' ? 'bg-blue-400' :
                          activeScenario === 'conflict' ? 'bg-green-400' :
                            activeScenario === 'emergency' ? 'bg-orange-400' :
                              'bg-green-400'
                          }`}></div>
                        <span className="text-sm font-medium">Resolution</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {activeScenario === 'normal' && "On Schedule"}
                        {activeScenario === 'conflict' && "Conflict Resolved"}
                        {activeScenario === 'emergency' && "Recovery Mode"}
                        {activeScenario === 'optimization' && "Optimized Flow"}
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/20">
                    <h6 className="font-medium text-sm mb-2">Flow Statistics</h6>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="text-center">
                        <div className="font-semibold text-blue-400">3</div>
                        <div className="text-gray-400">Active Trains</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-400">
                          {activeScenario === 'normal' ? '100%' :
                            activeScenario === 'conflict' ? '85%' :
                              activeScenario === 'emergency' ? '60%' :
                                '95%'}
                        </div>
                        <div className="text-gray-400">Flow Rate</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold ${conflictDetected || emergencyActive ? 'text-red-400' : 'text-green-400'
                          }`}>
                          {conflictDetected || emergencyActive ? 'ACTIVE' : 'CLEAR'}
                        </div>
                        <div className="text-gray-400">Alerts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Flow Legends for All Scenarios */}
          {/* AI Optimization Legend */}
          {activeScenario === 'optimization' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30"
            >
              <h4 className="text-lg font-semibold mb-4 text-center">Optimization Flow Legend</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-red-400 flex items-center">
                    <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
                    Initial Flow (Problematic)
                  </h5>
                  <p className="text-sm text-gray-300">
                    All trains converging on Platform 2, creating scheduling conflicts and delays
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <div className="flex items-center">
                      <div className="w-3 h-1 bg-red-400 mr-1"></div>
                      <span>Conflict Path</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 border-2 border-red-400 rounded-full mr-1"></div>
                      <span>Conflict Zone</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-green-400 flex items-center">
                    <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
                    Optimized Flow (Solution)
                  </h5>
                  <p className="text-sm text-gray-300">
                    AI redistributes trains to separate platforms, eliminating conflicts and improving efficiency
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <div className="flex items-center">
                      <div className="w-3 h-1 bg-green-400 mr-1"></div>
                      <span>Optimized Path</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400/30 rounded-full mr-1"></div>
                      <span>Success Zone</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Normal Operations Legend */}
          {activeScenario === 'normal' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30"
            >
              <h4 className="text-lg font-semibold mb-4 text-center">Normal Operations Flow</h4>
              <div className="space-y-4">
                <div className="space-y-3">
                  <h5 className="font-medium text-blue-400 flex items-center">
                    <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
                    Scheduled Operations Flow
                  </h5>
                  <p className="text-sm text-gray-300">
                    Trains follow predefined schedules with optimal platform allocation and smooth traffic flow
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center">
                      <div className="w-3 h-1 bg-blue-400 mr-1"></div>
                      <span>Scheduled Path</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400/40 rounded-full mr-1"></div>
                      <span>Platform Zone</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-400 font-medium">ON SCHEDULE</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Conflict Resolution Legend */}
          {activeScenario === 'conflict' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30"
            >
              <h4 className="text-lg font-semibold mb-4 text-center">Conflict Resolution Flow</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-red-400 flex items-center">
                    <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
                    Conflict Detection
                  </h5>
                  <p className="text-sm text-gray-300">
                    Multiple trains approaching same junction, creating potential collision risk
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <div className="flex items-center">
                      <div className="w-3 h-1 bg-red-400 mr-1"></div>
                      <span>Conflict Path</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 border-2 border-red-400 rounded-full mr-1"></div>
                      <span>Danger Zone</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-green-400 flex items-center">
                    <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
                    Resolution Flow
                  </h5>
                  <p className="text-sm text-gray-300">
                    AI reroutes trains to alternative paths, ensuring safe and efficient operations
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <div className="flex items-center">
                      <div className="w-3 h-1 bg-green-400 mr-1"></div>
                      <span>Safe Path</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400/30 rounded-full mr-1"></div>
                      <span>Clear Zone</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Emergency Response Legend */}
          {activeScenario === 'emergency' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30"
            >
              <h4 className="text-lg font-semibold mb-4 text-center">Emergency Response Flow</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-red-400 flex items-center">
                    <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
                    Emergency Protocol
                  </h5>
                  <p className="text-sm text-gray-300">
                    All traffic halted immediately for emergency response and medical assistance
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <div className="flex items-center">
                      <div className="w-3 h-1 bg-red-400 mr-1"></div>
                      <span>Emergency Stop</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-400/10 rounded-full mr-1"></div>
                      <span>Alert Zone</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-orange-400 flex items-center">
                    <div className="w-4 h-4 bg-orange-400 rounded mr-2"></div>
                    Cautious Recovery
                  </h5>
                  <p className="text-sm text-gray-300">
                    Gradual resumption of operations with reduced speeds and enhanced safety protocols
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <div className="flex items-center">
                      <div className="w-3 h-1 bg-orange-400 mr-1"></div>
                      <span>Recovery Path</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-400/20 rounded-full mr-1"></div>
                      <span>Safety Zone</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Problem Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              The Challenge of Manual Train Control
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Indian Railways operates one of the world's largest rail networks, handling millions of passengers daily.
              Manual traffic management faces unprecedented challenges in today's complex railway environment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
                title: 'Complex Decision Making',
                description: 'Hundreds of simultaneous decisions required across multiple routes and junctions'
              },
              {
                icon: <Clock className="w-12 h-12 text-orange-500" />,
                title: 'Time-Critical Operations',
                description: 'Split-second decisions affecting thousands of passengers and cargo movements'
              },
              {
                icon: <Users className="w-12 h-12 text-blue-500" />,
                title: 'Human Limitations',
                description: 'Cognitive overload leading to suboptimal routing and scheduling decisions'
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-green-500" />,
                title: 'Growing Demand',
                description: 'Increasing traffic volume requiring smarter resource allocation and optimization'
              }
            ].map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex justify-center">{challenge.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{challenge.title}</h3>
                <p className="text-gray-600">{challenge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Solution Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Why AI-Powered Optimization?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our intelligent system combines advanced AI algorithms with operations research
                to provide real-time, optimal decisions for railway traffic management.
              </p>
              <div className="space-y-4">
                {[
                  'Process thousands of variables simultaneously',
                  'Learn from historical patterns and real-time data',
                  'Provide conflict-free scheduling solutions',
                  'Optimize for multiple objectives: time, cost, safety',
                  'Adapt to disruptions with instant re-optimization'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <p className="text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                System Performance
              </h3>
              <div className="space-y-6">
                {[
                  { metric: 'Delay Reduction', value: '45%', color: 'bg-green-500' },
                  { metric: 'Efficiency Improvement', value: '62%', color: 'bg-blue-500' },
                  { metric: 'Conflict Resolution', value: '98%', color: 'bg-purple-500' },
                  { metric: 'Resource Utilization', value: '78%', color: 'bg-orange-500' }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{stat.metric}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: stat.value }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className={`h-full ${stat.color} rounded-full`}
                        ></motion.div>
                      </div>
                      <span className="text-lg font-bold text-gray-800">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Railway Operations?
            </h2>
            <h3 className="text-2xl font-semibold text-blue-300 mb-6">
              रेलवे संचालन में क्रांति लाने के लिए तैयार हैं?
            </h3>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join the future of intelligent railway management. Experience how AI can revolutionize
              your traffic control systems and improve operational efficiency.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;