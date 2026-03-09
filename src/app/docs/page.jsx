'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen,
  Code,
  Settings,
  Database,
  Shield,
  Zap,
  Users,
  BarChart3,
  Clock,
  Search,
  Download,
  ExternalLink,
} from 'lucide-react';

export default function Documentation() {
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
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <BookOpen size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Documentation
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Comprehensive guides and API documentation to help you get the
              most out of NextGen Hub. Whether you're just getting started or
              building advanced integrations, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/help"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-lg"
              >
                Help Center
              </Link>
              <Link
                href="/api"
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition transform hover:-translate-y-1"
              >
                API Reference
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
              Find what you're looking for
            </h2>
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search documentation, guides, and API references..."
                className="w-full pl-12 pr-4 py-4 text-lg bg-white rounded-xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Left Column - Getting Started */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Getting Started
                </h2>
                <div className="space-y-4">
                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Zap size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Quick Start Guide
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Get up and running with NextGen Hub in minutes. This
                          guide covers everything you need to know to start
                          using our platform.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            Beginner
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            5 min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Settings size={24} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Installation & Setup
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Detailed instructions for installing and configuring
                          NextGen Hub for your specific environment.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            Setup
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            10 min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Clock size={24} className="text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Video Tutorials
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Watch step-by-step video guides to learn NextGen Hub
                          features and best practices.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            Visual
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            15+ videos
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Documentation */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  API Documentation
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      title: 'REST API Reference',
                      desc: 'Complete API documentation with examples',
                      icon: 'Code',
                    },
                    {
                      title: 'Authentication',
                      desc: 'OAuth 2.0 and JWT authentication',
                      icon: 'Shield',
                    },
                    {
                      title: 'Webhooks',
                      desc: 'Real-time event notifications',
                      icon: 'Zap',
                    },
                    {
                      title: 'Rate Limiting',
                      desc: 'API usage limits and best practices',
                      icon: 'BarChart3',
                    },
                  ].map((api, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Code size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {api.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{api.desc}</p>
                      </div>
                      <ExternalLink
                        size={16}
                        className="text-gray-400 ml-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Advanced Topics */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Advanced Topics
                </h2>
                <div className="space-y-4">
                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Database size={24} className="text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Database Integration
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Learn how to integrate NextGen Hub with your existing
                          database systems and data sources.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            Advanced
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            15 min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Shield size={24} className="text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Security Best Practices
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Comprehensive guide to securing your NextGen Hub
                          implementation and protecting your data.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                            Security
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            20 min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Users size={24} className="text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Team Collaboration
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Set up team workflows, permissions, and collaboration
                          features for your organization.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                            Team
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            10 min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Downloads & Resources */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Downloads & Resources
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      title: 'SDK Downloads',
                      desc: 'Official SDKs for popular programming languages',
                      icon: 'Download',
                    },
                    {
                      title: 'Postman Collection',
                      desc: 'Import our API collection to Postman',
                      icon: 'Download',
                    },
                    {
                      title: 'Whitepapers',
                      desc: 'Technical whitepapers and case studies',
                      icon: 'Download',
                    },
                    {
                      title: 'Developer Tools',
                      desc: 'CLI tools and development utilities',
                      icon: 'Download',
                    },
                  ].map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Download size={20} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {resource.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{resource.desc}</p>
                      </div>
                      <Download size={16} className="text-gray-400 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Need Help?
              </h3>
              <p className="text-gray-600 mb-4">
                Visit our Help Center for answers to common questions and
                troubleshooting guides.
              </p>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Visit Help Center
                <ExternalLink size={16} />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Join Community
              </h3>
              <p className="text-gray-600 mb-4">
                Connect with other developers, share knowledge, and get support
                from our community.
              </p>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                Join Community
                <ExternalLink size={16} />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Report Issue
              </h3>
              <p className="text-gray-600 mb-4">
                Found a bug or have a feature request? Let us know so we can
                improve.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                Report Issue
                <ExternalLink size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
