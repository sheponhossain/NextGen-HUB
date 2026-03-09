'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CookiePolicy() {
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
              Cookie Policy
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              This policy explains how we use cookies and similar technologies
              to enhance your experience on our website.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                href="/privacy"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Privacy Policy
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
                What Are Cookies?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Cookies are small text files that are stored on your device when
                you visit our website. They help us understand how you interact
                with our site and improve your experience.
              </p>
            </section>

            {/* Types of Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Types of Cookies We Use
              </h2>

              <div className="space-y-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Essential Cookies
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These cookies are necessary for the website to function
                    properly. They enable core functionality such as page
                    navigation and access to secure areas of the website.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Session management</li>
                    <li>Security features</li>
                    <li>Load balancing</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Analytics Cookies
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Website traffic analysis</li>
                    <li>User behavior tracking</li>
                    <li>Performance measurement</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Functional Cookies
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These cookies enable enhanced functionality and
                    personalization. They may be set by us or by third-party
                    providers.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>User preferences</li>
                    <li>Language settings</li>
                    <li>Remembering form inputs</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Third-Party Cookies
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may use third-party services that set cookies on your
                    device to provide their services, such as analytics and
                    social media.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Google Analytics</li>
                    <li>Social media widgets</li>
                    <li>Advertising networks</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookie Management */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Managing Cookies
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    Browser Settings
                  </h3>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    Most web browsers allow you to control cookies through their
                    settings. You can usually find these settings in the
                    "options" or "preferences" menu of your browser.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">
                    Cookie Consent
                  </h3>
                  <p className="text-green-800 text-sm leading-relaxed">
                    We provide cookie consent mechanisms on our website. You can
                    choose which types of cookies to accept or reject.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Your Rights
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Access and Control
                  </h3>
                  <p className="text-gray-700 text-sm">
                    You have the right to access, control, and delete cookies
                    stored on your device. You can manage your cookie
                    preferences through your browser settings.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Opt-Out Options
                  </h3>
                  <p className="text-gray-700 text-sm">
                    You can opt-out of certain types of cookies, particularly
                    those used for advertising and analytics purposes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Impact on Experience
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Disabling certain cookies may affect the functionality of
                    our website and your ability to access certain features.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Third-Party Cookie Policies
              </h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-900 mb-3">
                  External Services
                </h3>
                <p className="text-yellow-800 text-sm leading-relaxed">
                  Third-party services we use may have their own cookie
                  policies. We recommend reviewing their privacy policies for
                  more information about their cookie practices.
                </p>
              </div>
            </section>

            {/* Updates to This Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Policy Updates
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect
                  changes in our practices or for other operational, legal, or
                  regulatory reasons. We encourage you to review this policy
                  periodically for any changes.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have any questions about our Cookie Policy, please
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
