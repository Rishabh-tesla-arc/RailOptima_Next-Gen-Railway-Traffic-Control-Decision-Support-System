import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Train, 
  Wind, 
  Zap,
  Clock
} from 'lucide-react';

const DashboardPage = () => {
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const zones = [
    { name: 'Northern', status: 'delayed', trains: 145, delay: '12m' },
    { name: 'Southern', status: 'optimal', trains: 112, delay: '2m' },
    { name: 'Eastern', status: 'optimal', trains: 98, delay: '1m' },
    { name: 'Western', status: 'moderate', trains: 134, delay: '5m' },
    { name: 'Central', status: 'optimal', trains: 156, delay: '3m' }
  ];

  const alerts = [
    { id: 1, type: 'critical', message: 'Signal failure at Kanpur Central (CNB)', time: '2m ago' },
    { id: 2, type: 'warning', message: 'Heavy fog reported near Delhi NCR', time: '15m ago' },
    { id: 3, type: 'info', message: 'Maintenance scheduled for Track 4B', time: '1h ago' },
  ];

  const trains = [
    { id: '12301', name: 'Rajdhani Express', from: 'Howrah', to: 'New Delhi', status: 'On Time', speed: '135 km/h' },
    { id: '22436', name: 'Vande Bharat', from: 'Varanasi', to: 'New Delhi', status: 'Delayed 5m', speed: '110 km/h' },
    { id: '12002', name: 'Shatabdi Express', from: 'New Delhi', to: 'Bhopal', status: 'On Time', speed: '120 km/h' },
    { id: '12951', name: 'Mumbai Rajdhani', from: 'Mumbai', to: 'New Delhi', status: 'On Time', speed: '130 km/h' },
  ];

  const stations = [
    { id: 'delhi', name: 'New Delhi', x: 280, y: 150, status: 'critical', temp: '12°C', weather: 'Fog' },
    { id: 'mumbai', name: 'Mumbai', x: 180, y: 350, status: 'optimal', temp: '28°C', weather: 'Clear' },
    { id: 'kolkata', name: 'Kolkata', x: 550, y: 280, status: 'optimal', temp: '24°C', weather: 'Haze' },
    { id: 'chennai', name: 'Chennai', x: 350, y: 500, status: 'optimal', temp: '30°C', weather: 'Sunny' },
    { id: 'bengaluru', name: 'Bengaluru', x: 300, y: 450, status: 'moderate', temp: '22°C', weather: 'Cloudy' },
    { id: 'hyderabad', name: 'Hyderabad', x: 320, y: 380, status: 'optimal', temp: '26°C', weather: 'Clear' },
    { id: 'ahmedabad', name: 'Ahmedabad', x: 180, y: 250, status: 'optimal', temp: '29°C', weather: 'Sunny' },
    { id: 'guwahati', name: 'Guwahati', x: 650, y: 200, status: 'moderate', temp: '18°C', weather: 'Rain' },
  ];

  const StatusCard = ({ title, value, subtext, icon: Icon, color }: any) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-gray-800">{value}</h3>
          <p className={`text-sm mt-1 ${color === 'red' ? 'text-red-500' : 'text-green-500'}`}>
            {subtext}
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Network Command Center</h1>
            <p className="text-gray-500 mt-1">Real-time monitoring and decision support</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="font-mono font-medium text-lg">{currentTime}</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>System Active</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatusCard 
            title="Network Health" 
            value="98.2%" 
            subtext="+0.4% from last hour" 
            icon={Activity} 
            color="green" 
          />
          <StatusCard 
            title="Active Trains" 
            value="12,450" 
            subtext="240 high priority" 
            icon={Train} 
            color="blue" 
          />
          <StatusCard 
            title="Critical Alerts" 
            value="3" 
            subtext="Requires attention" 
            icon={AlertTriangle} 
            color="red" 
          />
          <StatusCard 
            title="Avg. Punctuality" 
            value="94.5%" 
            subtext="Zones A, B leading" 
            icon={CheckCircle} 
            color="purple" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Map Area */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden min-h-[500px] relative"
            >
              <div className="absolute inset-0 bg-slate-50 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full max-w-[800px] mx-auto">
                   
                   {/* Interactive India Map Visualization */}
                   <svg className="w-full h-full" viewBox="0 0 800 700">
                      {/* India Outline (Simplified) */}
                      <path 
                        d="M300,50 L400,20 L500,50 L600,150 L700,200 L650,400 L500,600 L350,680 L200,500 L100,300 L200,200 L300,50 Z" 
                        fill="#e2e8f0" 
                        stroke="#94a3b8" 
                        strokeWidth="2"
                        className="drop-shadow-sm"
                      />

                      {/* Rail Network Connections */}
                      <g stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4">
                        {/* North-South Corridor */}
                        <line x1="280" y1="150" x2="350" y2="500" />
                        {/* East-West Corridor */}
                        <line x1="180" y1="350" x2="550" y2="280" />
                        {/* Diagonals */}
                        <line x1="280" y1="150" x2="550" y2="280" />
                        <line x1="280" y1="150" x2="180" y2="350" />
                        <line x1="180" y1="350" x2="350" y2="500" />
                        <line x1="350" y1="500" x2="550" y2="280" />
                      </g>

                      {/* Station Nodes */}
                      {stations.map((station) => (
                        <g 
                          key={station.id}
                          onMouseEnter={() => setHoveredStation(station.id)}
                          onMouseLeave={() => setHoveredStation(null)}
                          className="cursor-pointer"
                        >
                          {/* Pulse Effect for Critical/Warning Status */}
                          {station.status !== 'optimal' && (
                            <circle 
                              cx={station.x} 
                              cy={station.y} 
                              r="20" 
                              fill={station.status === 'critical' ? '#ef4444' : '#eab308'}
                              opacity="0.2"
                            >
                              <animate attributeName="r" values="10;25" dur="1.5s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.6;0" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                          )}
                          
                          {/* Station Dot */}
                          <circle 
                            cx={station.x} 
                            cy={station.y} 
                            r="8" 
                            fill={
                              station.status === 'critical' ? '#ef4444' : 
                              station.status === 'moderate' ? '#eab308' : '#22c55e'
                            }
                            stroke="white"
                            strokeWidth="2"
                          />
                          
                          {/* Station Label */}
                          <text 
                            x={station.x + 15} 
                            y={station.y + 4} 
                            className="text-xs font-bold fill-gray-700 pointer-events-none"
                            style={{ textShadow: '0 1px 2px white' }}
                          >
                            {station.name}
                          </text>
                        </g>
                      ))}
                   </svg>

                   {/* Hover Tooltip */}
                   <AnimatePresence>
                     {hoveredStation && (
                       <motion.div
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0 }}
                         className="absolute bg-white p-3 rounded-lg shadow-xl border border-gray-100 z-10 w-48 pointer-events-none"
                         style={{
                           left: stations.find(s => s.id === hoveredStation)?.x! + 20,
                           top: stations.find(s => s.id === hoveredStation)?.y! - 20
                         }}
                       >
                         {(() => {
                           const station = stations.find(s => s.id === hoveredStation);
                           if (!station) return null;
                           return (
                             <>
                               <div className="flex justify-between items-center mb-2">
                                 <span className="font-bold text-gray-800">{station.name}</span>
                                 <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                                   station.status === 'critical' ? 'bg-red-100 text-red-600' :
                                   station.status === 'moderate' ? 'bg-yellow-100 text-yellow-600' :
                                   'bg-green-100 text-green-600'
                                 }`}>
                                   {station.status}
                                 </span>
                               </div>
                               <div className="space-y-1 text-xs text-gray-600">
                                 <div className="flex justify-between">
                                   <span>Temp:</span>
                                   <span className="font-medium">{station.temp}</span>
                                 </div>
                                 <div className="flex justify-between">
                                   <span>Weather:</span>
                                   <span className="font-medium">{station.weather}</span>
                                 </div>
                                 <div className="flex justify-between">
                                   <span>Active Trains:</span>
                                   <span className="font-medium">24</span>
                                 </div>
                               </div>
                             </>
                           );
                         })()}
                       </motion.div>
                     )}
                   </AnimatePresence>

                   {/* Legend */}
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-sm border border-gray-100 text-xs">
                    <div className="font-semibold text-gray-700 mb-2">Network Status</div>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Optimal Flow</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Minor Delays</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Critical Alert</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t p-4 flex justify-between items-center">
                <span className="font-semibold text-gray-700">Live Traffic Visualization</span>
                <span className="text-sm text-blue-600 flex items-center cursor-pointer hover:underline">
                  <Map className="w-4 h-4 mr-1" /> View Full Network
                </span>
              </div>
            </motion.div>

            {/* Live Trains Table */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Priority Trains Monitoring</h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Live Updates</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-6 py-3 font-medium">Train No.</th>
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Route</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Speed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {trains.map((train) => (
                      <tr key={train.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono font-medium text-gray-700">{train.id}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{train.name}</td>
                        <td className="px-6 py-4 text-gray-500">{train.from} → {train.to}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            train.status.includes('Delayed') 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {train.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{train.speed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Zone Status */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Zone Status</h3>
              <div className="space-y-4">
                {zones.map((zone) => (
                  <div key={zone.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div>
                      <h4 className="font-medium text-gray-900">{zone.name} Zone</h4>
                      <p className="text-xs text-gray-500">{zone.trains} Active Trains</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-bold uppercase ${
                        zone.status === 'optimal' ? 'text-green-600' : 
                        zone.status === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {zone.status}
                      </div>
                      <p className="text-xs text-gray-400">Avg Delay: {zone.delay}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                Live Alerts
              </h3>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="border-l-4 border-l-transparent hover:bg-gray-50 p-2 transition-colors border-l-red-500 pl-3">
                    <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 font-medium hover:underline">
                View All Alerts
              </button>
            </div>

            {/* Weather Widget */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm">Key Junction Weather</p>
                  <h3 className="text-2xl font-bold mt-1">New Delhi</h3>
                  <p className="text-3xl font-bold mt-4">12°C</p>
                  <p className="text-blue-100 text-sm mt-1">Dense Fog Warning</p>
                </div>
                <Wind className="w-10 h-10 text-blue-200 opacity-50" />
              </div>
              <div className="mt-6 flex justify-between text-sm text-blue-100 border-t border-blue-400/30 pt-4">
                <span>Vis: 50m</span>
                <span>Wind: 4km/h</span>
                <span>Hum: 82%</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
