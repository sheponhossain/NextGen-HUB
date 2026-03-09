'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfService() {
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
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Please read these terms carefully before using our services. By
              accessing or using our platform, you agree to be bound by these
              terms.
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
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using NextGen Hub, you accept and agree to be
                bound by the terms and provision of this agreement. In addition,
                when using our services, you shall be subject to any posted
                guidelines or rules applicable to such services.
              </p>
            </section>

            {/* User Responsibilities */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                User Responsibilities
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Account Registration
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>You must provide accurate and complete information</li>
                    <li>
                      You are responsible for maintaining account security
                    </li>
                    <li>
                      You must notify us immediately of any unauthorized use
                    </li>
                    <li>
                      You must be at least 13 years old to use our services
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Prohibited Activities
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Violating any laws or regulations</li>
                    <li>Interfering with service operation or security</li>
                    <li>Uploading malicious or harmful content</li>
                    <li>Impersonating any person or entity</li>
                    <li>Collecting information about other users</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Content Guidelines
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    You agree not to post, upload, or distribute any content
                    that is unlawful, harmful, threatening, abusive, defamatory,
                    or otherwise objectionable.
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Intellectual Property
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    Our Rights
                  </h3>
                  <ul className="text-blue-800 space-y-2 text-sm">
                    <li>All content is our property or licensed to us</li>
                    <li>Trademarks and logos are our property</li>
                    <li>We reserve all rights not expressly granted</li>
                    <li>Unauthorized use is strictly prohibited</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">
                    Your License
                  </h3>
                  <ul className="text-green-800 space-y-2 text-sm">
                    <li>Personal, non-exclusive use only</li>
                    <li>Non-transferable and revocable</li>
                    <li>Must comply with these terms</li>
                    <li>May not modify or distribute content</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Service Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Service Terms
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Service Availability
                  </h3>
                  <p className="text-gray-700 text-sm">
                    We strive to provide uninterrupted service but do not
                    guarantee continuous or secure access. We may modify or
                    discontinue services with notice.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Third-Party Services
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Our services may include links to third-party websites or
                    services. We are not responsible for the content or
                    practices of these third parties.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Updates and Changes
                  </h3>
                  <p className="text-gray-700 text-sm">
                    We may update our services and these terms at any time.
                    Continued use after changes constitutes acceptance of new
                    terms.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Limitation of Liability
              </h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-900 mb-3">
                  Disclaimer
                </h3>
                <p className="text-yellow-800 text-sm leading-relaxed">
                  Our services are provided "as is" and "as available" without
                  warranties of any kind. We are not liable for any indirect,
                  incidental, or consequential damages arising from your use of
                  our services.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Termination
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We may terminate or suspend your account and access to our
                  services immediately, without prior notice or liability, for
                  any reason, including if you breach these terms.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">
                      Upon Termination
                    </h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>Your right to use the service ends</li>
                      <li>Any outstanding fees remain due</li>
                      <li>Your content may be deleted</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">
                      Survival
                    </h4>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>These terms survive termination</li>
                      <li>Disclaimers remain in effect</li>
                      <li>Liability limitations continue</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Governing Law
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  These terms shall be governed by and construed in accordance
                  with the laws of Bangladesh, without regard to its conflict of
                  law provisions. You agree to submit to the personal and
                  exclusive jurisdiction of the courts located in Dhaka,
                  Bangladesh.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have any questions about these Terms of Service, please
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
