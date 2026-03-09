'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                href="/terms"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            {/* Last Updated */}
            <div className="mb-8 text-sm text-gray-500 border-b border-gray-200 pb-6">
              Last Updated: March 2026
            </div>

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At NextGen Hub, we are committed to protecting your privacy and
                personal information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website or use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Information We Collect
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Personal Information
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Name and email address</li>
                    <li>Profile picture (if using Google OAuth)</li>
                    <li>Contact information</li>
                    <li>Account preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Usage Data
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>IP address and browser type</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring websites</li>
                    <li>Device information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Cookies and Tracking
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We use cookies and similar technologies to enhance your
                    experience, analyze usage patterns, and improve our
                    services.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                How We Use Your Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    Service Provision
                  </h3>
                  <ul className="text-blue-800 space-y-2 text-sm">
                    <li>Provide and maintain our services</li>
                    <li>Process your requests and transactions</li>
                    <li>Send service-related communications</li>
                    <li>Improve user experience</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">
                    Communication
                  </h3>
                  <ul className="text-green-800 space-y-2 text-sm">
                    <li>Respond to your inquiries</li>
                    <li>Send updates and announcements</li>
                    <li>Provide customer support</li>
                    <li>Send newsletters (if subscribed)</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-3">
                    Analytics and Improvement
                  </h3>
                  <ul className="text-purple-800 space-y-2 text-sm">
                    <li>Analyze usage patterns</li>
                    <li>Improve our services</li>
                    <li>Develop new features</li>
                    <li>Monitor system performance</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-3">
                    Security and Compliance
                  </h3>
                  <ul className="text-orange-800 space-y-2 text-sm">
                    <li>Prevent fraud and abuse</li>
                    <li>Comply with legal obligations</li>
                    <li>Protect our rights and property</li>
                    <li>Enforce our terms of service</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Data Protection
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    Security Measures
                  </h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>Industry-standard encryption</li>
                    <li>Secure servers and databases</li>
                    <li>Regular security assessments</li>
                    <li>Access controls and monitoring</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Your Rights</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>Access your personal data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to processing of your data</li>
                    <li>Data portability</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Third-Party Services
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We may use third-party services to help us operate our
                  business and the Service, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Google OAuth:</strong> For authentication purposes
                  </li>
                  <li>
                    <strong>MongoDB:</strong> For data storage and management
                  </li>
                  <li>
                    <strong>Analytics services:</strong> To understand usage
                    patterns
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed text-sm text-gray-600">
                  These third parties have their own privacy policies and we
                  encourage you to review them.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Data Retention
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information only for as long as
                necessary to fulfill the purposes for which we collected it,
                including for the purposes of satisfying any legal, accounting,
                or reporting requirements.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">Email:</span>
                    <p className="text-gray-700 mt-1">privacy@nextgenhub.com</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Address:
                    </span>
                    <p className="text-gray-700 mt-1">
                      NextGen Hub
                      <br />
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
