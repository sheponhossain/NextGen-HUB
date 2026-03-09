'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  HelpCircle,
  Book,
  Users,
  BarChart3,
  Search,
  MessageCircle,
  Shield,
  Zap,
  Clock,
  Star,
} from 'lucide-react';

export default function HelpCenter() {
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
                <HelpCircle size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Help Center
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Find answers to your questions, get started with our platform, and
              discover tips to make the most of your experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-lg"
              >
                View Documentation
              </Link>
              <Link
                href="/community"
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition transform hover:-translate-y-1"
              >
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              How can we help you today?
            </h2>
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search for help articles, guides, and more..."
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
                  <Link
                    href="/docs"
                    className="block p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Book size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Documentation
                        </h3>
                        <p className="text-gray-600">
                          Comprehensive guides and API documentation to help you
                          get started quickly.
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Zap size={24} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Quick Start Guide
                        </h3>
                        <p className="text-gray-600">
                          Get up and running in minutes with our step-by-step
                          guide.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Clock size={24} className="text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Video Tutorials
                        </h3>
                        <p className="text-gray-600">
                          Watch our video tutorials to learn at your own pace.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Articles */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Popular Articles
                </h3>
                <div className="space-y-3">
                  {[
                    'How to set up your account',
                    'Understanding dashboard features',
                    'Managing your products',
                    'Security best practices',
                    'Troubleshooting common issues',
                  ].map((article, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition"
                    >
                      <Star
                        size={16}
                        className="text-yellow-500 flex-shrink-0"
                      />
                      <span className="text-gray-700">{article}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Support & Community */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Support & Community
                </h2>
                <div className="space-y-4">
                  <Link
                    href="/community"
                    className="block p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Users size={24} className="text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Community Forum
                        </h3>
                        <p className="text-gray-600">
                          Connect with other users, share tips, and get help
                          from our community.
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <MessageCircle size={24} className="text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Contact Support
                        </h3>
                        <p className="text-gray-600">
                          Get in touch with our support team for personalized
                          assistance.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/status"
                    className="block p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <BarChart3 size={24} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          System Status
                        </h3>
                        <p className="text-gray-600">
                          Check the current status of our services and any
                          ongoing issues.
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Security & Privacy */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Security & Privacy
                </h3>
                <div className="space-y-3">
                  {[
                    'Data protection policies',
                    'Two-factor authentication setup',
                    'Privacy settings guide',
                    'Security incident reporting',
                  ].map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition"
                    >
                      <Shield
                        size={16}
                        className="text-blue-500 flex-shrink-0"
                      />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Status Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    System Status
                  </h3>
                  <p className="text-gray-600">
                    All systems are operational. No incidents reported.
                  </p>
                </div>
              </div>
              <Link
                href="/status"
                className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition border border-gray-300"
              >
                View Status Page
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
