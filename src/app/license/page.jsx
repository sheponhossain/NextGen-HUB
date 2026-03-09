'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function License() {
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
              License Agreement
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              This license governs your use of NextGen Hub and its associated
              software and services.
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

            {/* License Type */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                License Type
              </h2>
              <p className="text-gray-700 leading-relaxed">
                NextGen Hub is provided under a proprietary license. By using
                our services, you agree to the terms outlined in this license
                agreement.
              </p>
            </section>

            {/* Grant of License */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Grant of License
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Personal Use License
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Non-exclusive, non-transferable right to use</li>
                    <li>For personal, non-commercial purposes</li>
                    <li>Subject to compliance with these terms</li>
                    <li>May be revoked for violation of terms</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Commercial Use
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Commercial use requires a separate license agreement. Please
                    contact us for commercial licensing options and pricing
                    information.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Restrictions
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>No reverse engineering or decompilation</li>
                    <li>No distribution or sharing of software</li>
                    <li>No modification or creation of derivative works</li>
                    <li>No use in violation of applicable laws</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Intellectual Property Rights
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    Our Rights
                  </h3>
                  <ul className="text-blue-800 space-y-2 text-sm">
                    <li>All software and content is our property</li>
                    <li>Trademarks and logos are protected</li>
                    <li>Copyright and patent rights reserved</li>
                    <li>Trade secrets and confidential information</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">
                    Your Obligations
                  </h3>
                  <ul className="text-green-800 space-y-2 text-sm">
                    <li>Respect our intellectual property rights</li>
                    <li>Do not infringe on our trademarks</li>
                    <li>Report any unauthorized use</li>
                    <li>Maintain confidentiality of proprietary information</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* License Fees */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                License Fees and Payment
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Free Tier
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Basic features are available free of charge. This includes
                    access to core functionality with standard limitations.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Premium Features
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Advanced features may require payment. All fees are clearly
                    stated and must be paid in advance.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Refund Policy
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Refunds are provided only in accordance with our refund
                    policy. Please review our payment terms before purchasing.
                  </p>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Termination
              </h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-900 mb-3">
                  License Termination
                </h3>
                <p className="text-yellow-800 text-sm leading-relaxed">
                  We may terminate your license immediately if you breach any
                  terms of this agreement. Upon termination, you must cease all
                  use of our services and delete all copies of our software.
                </p>
              </div>
            </section>

            {/* Warranty Disclaimer */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Warranty Disclaimer
              </h2>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-3">No Warranty</h3>
                <p className="text-red-800 text-sm leading-relaxed">
                  Our services are provided "as is" without warranties of any
                  kind, either express or implied. We do not guarantee that our
                  services will be uninterrupted, secure, or error-free.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Limitation of Liability
              </h2>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-900 mb-3">
                  Liability Limits
                </h3>
                <p className="text-orange-800 text-sm leading-relaxed">
                  In no event shall we be liable for any indirect, incidental,
                  special, or consequential damages arising out of or in
                  connection with your use of our services.
                </p>
              </div>
            </section>

            {/* Updates and Changes */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Updates and Changes
              </h2>

              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-purple-800 leading-relaxed">
                  We may update our software and this license agreement from
                  time to time. Continued use after changes constitutes
                  acceptance of the updated terms.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have any questions about this license agreement, please
                contact us:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">Email:</span>
                    <p className="text-gray-700 mt-1">legal@nextgenhub.com</p>
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
