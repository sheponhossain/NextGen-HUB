'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'contact@nextgenhub.com',
      link: 'mailto:contact@nextgenhub.com',
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: '📍',
      title: 'Address',
      value: '123 Innovation St, Tech City, TC 12345',
      link: '#',
    },
    {
      icon: '⏰',
      title: 'Hours',
      value: 'Mon-Fri: 9AM-6PM EST',
      link: '#',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-50 py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Have questions or feedback? We'd love to hear from you. Reach out
            and let's connect!
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-4 gap-6">
          {contactInfo.map((info, idx) => (
            <motion.a
              key={idx}
              href={info.link}
              {...fadeIn}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-blue-100 text-center group"
            >
              <div className="text-5xl mb-4">{info.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {info.title}
              </h3>
              <p className="text-gray-600 group-hover:text-blue-600 transition-colors">
                {info.value}
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-10 border border-blue-100"
          >
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              Send us a Message
            </h2>
            <p className="text-gray-600 mb-8">
              We'll get back to you as soon as possible
            </p>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl border border-green-300"
              >
                ✅ Thanks for your message! We'll be in touch soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  rows={5}
                  required
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Why Contact Us?
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: '🚀',
                  title: 'Fast Response',
                  desc: 'We respond to inquiries within 24 hours',
                },
                {
                  icon: '💡',
                  title: 'Expert Support',
                  desc: 'Our team of experts is ready to help',
                },
                {
                  icon: '🎯',
                  title: 'Tailored Solutions',
                  desc: 'Custom solutions for your unique needs',
                },
                {
                  icon: '🌟',
                  title: 'Premium Service',
                  desc: 'Best-in-class customer experience',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeIn}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-white border border-blue-100 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Follow us on social media:</p>
              <div className="flex gap-4">
                {[
                  { icon: '𝕏', label: 'Twitter' },
                  { icon: '👔', label: 'LinkedIn' },
                  { icon: '📘', label: 'Facebook' },
                  { icon: '📷', label: 'Instagram' },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold hover:shadow-lg transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 mt-20">
        <motion.h2
          {...fadeIn}
          className="text-4xl font-bold text-center mb-12 text-gray-900"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              q: 'What is the response time?',
              a: 'We typically respond within 24 hours during business days.',
            },
            {
              q: 'Do you offer support on weekends?',
              a: 'Yes, limited support available. Priority support for enterprise clients.',
            },
            {
              q: 'How can I track my request?',
              a: "You'll receive a confirmation email with a ticket number.",
            },
            {
              q: 'What payment methods do you accept?',
              a: 'Credit cards, wire transfers, and major digital payment platforms.',
            },
          ].map((faq, idx) => (
            <motion.div
              key={idx}
              {...fadeIn}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-white rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-white text-xl font-bold">❓</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                  Support
                </span>
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  ✓
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
