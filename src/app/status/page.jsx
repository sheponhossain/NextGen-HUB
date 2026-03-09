'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Wifi,
  Database,
  Server,
  Zap,
} from 'lucide-react';

export default function SystemStatus() {
  const statusData = {
    overall: {
      status: 'operational',
      message: 'All systems operational',
      lastUpdated: '2 minutes ago',
    },
    services: [
      {
        name: 'Website & Dashboard',
        status: 'operational',
        responseTime: '45ms',
        uptime: '99.9%',
        icon: Wifi,
      },
      {
        name: 'API Services',
        status: 'operational',
        responseTime: '62ms',
        uptime: '99.8%',
        icon: Database,
      },
      {
        name: 'Authentication',
        status: 'operational',
        responseTime: '38ms',
        uptime: '99.95%',
        icon: Server,
      },
      {
        name: 'File Upload',
        status: 'operational',
        responseTime: '120ms',
        uptime: '99.7%',
        icon: Zap,
      },
      {
        name: 'Email Services',
        status: 'degraded',
        responseTime: '2.1s',
        uptime: '95.2%',
        icon: RefreshCw,
      },
    ],
    incidents: [
      {
        title: 'Email delivery delays',
        status: 'investigating',
        time: '30 minutes ago',
        description:
          'Some users may experience delays in receiving email notifications. Our team is investigating the issue.',
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'partial':
        return 'text-orange-600 bg-orange-100';
      case 'major':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return CheckCircle;
      case 'degraded':
        return AlertTriangle;
      case 'partial':
        return AlertTriangle;
      case 'major':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <BarChart3 size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              System Status
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(statusData.overall.status)}`}
              >
                {statusData.overall.status.toUpperCase()}
              </span>
              <span className="text-gray-600">
                {statusData.overall.message}
              </span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Real-time status information for NextGen Hub services. We monitor
              all systems to ensure optimal performance and uptime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/help"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-lg"
              >
                Get Help
              </Link>
              <Link
                href="/community"
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition transform hover:-translate-y-1"
              >
                Report Issue
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column - Service Status */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Service Status
                </h2>
                <div className="space-y-4">
                  {statusData.services.map((service, index) => {
                    const Icon = service.icon;
                    const StatusIcon = getStatusIcon(service.status);

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Icon size={24} className="text-gray-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {service.name}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span
                                  className={`px-2 py-1 rounded-full font-medium ${getStatusColor(service.status)}`}
                                >
                                  {service.status.toUpperCase()}
                                </span>
                                <span>Response: {service.responseTime}</span>
                                <span>Uptime: {service.uptime}</span>
                              </div>
                            </div>
                          </div>
                          <StatusIcon
                            size={24}
                            className={
                              getStatusColor(service.status).split(' ')[0]
                            }
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp size={20} className="text-green-600" />
                      <span className="font-semibold text-gray-900">
                        Average Response Time
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">68ms</div>
                    <div className="text-sm text-gray-600">Last 24 hours</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Wifi size={20} className="text-blue-600" />
                      <span className="font-semibold text-gray-900">
                        Overall Uptime
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      99.87%
                    </div>
                    <div className="text-sm text-gray-600">Last 30 days</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Database size={20} className="text-purple-600" />
                      <span className="font-semibold text-gray-900">
                        Active Users
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      12,345
                    </div>
                    <div className="text-sm text-gray-600">
                      Currently online
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Incidents & Updates */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Recent Incidents
                </h2>
                <div className="space-y-4">
                  {statusData.incidents.map((incident, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle
                          size={20}
                          className="text-yellow-600 mt-1 flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {incident.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                              {incident.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {incident.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {incident.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* No incidents message */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-900">
                          No Active Incidents
                        </h4>
                        <p className="text-sm text-green-700">
                          All systems are running smoothly
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Status Information
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What do these statuses mean?
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>
                        • <strong>Operational:</strong> All systems working
                        normally
                      </li>
                      <li>
                        • <strong>Degraded:</strong> Reduced performance or
                        functionality
                      </li>
                      <li>
                        • <strong>Partial Outage:</strong> Some features
                        unavailable
                      </li>
                      <li>
                        • <strong>Major Outage:</strong> Most or all features
                        unavailable
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Stay Updated
                    </h4>
                    <p className="text-sm text-blue-700 mb-4">
                      Get real-time updates about our system status and any
                      incidents.
                    </p>
                    <Link
                      href="/community"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Join our community
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center text-gray-600"
          >
            <p>Last updated: {statusData.overall.lastUpdated}</p>
            <p className="text-sm mt-2">
              For more information about our system status, please visit our{' '}
              <Link href="/help" className="text-blue-600 hover:text-blue-700">
                Help Center
              </Link>{' '}
              or contact our support team.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
