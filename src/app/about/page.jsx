'use client';
import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  const stats = [
    { number: '50+', label: 'Team Members', icon: '👥' },
    { number: '8+', label: 'Years Experience', icon: '📅' },
    { number: '5000+', label: 'Happy Clients', icon: '😊' },
    { number: '99.9%', label: 'Uptime SLA', icon: '⚡' },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Mission-Driven',
      desc: 'We are committed to empowering businesses with cutting-edge technology solutions that drive growth and innovation.',
    },
    {
      icon: '🔒',
      title: 'Security First',
      desc: 'Your data is our priority. We implement enterprise-grade security to protect your sensitive information.',
    },
    {
      icon: '🚀',
      title: 'Innovation',
      desc: 'Constantly evolving and improving. We stay ahead of the curve with the latest technologies.',
    },
    {
      icon: '❤️',
      title: 'Customer Care',
      desc: 'Your success is our success. We provide 24/7 support to ensure you get the most from our platform.',
    },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', icon: '👩‍💼' },
    { name: 'Mike Chen', role: 'CTO', icon: '👨‍💻' },
    { name: 'Emily Davis', role: 'Head of Design', icon: '🎨' },
    { name: 'Alex Rodriguez', role: 'Lead Developer', icon: '⚙️' },
    { name: 'Lisa Wang', role: 'Product Manager', icon: '📊' },
    { name: 'James Wilson', role: 'Customer Success', icon: '🤝' },
  ];

  const timeline = [
    {
      year: '2016',
      event:
        'Founded NextGen Hub with a vision to revolutionize product management',
    },
    { year: '2017', event: 'Launched first version of our core platform' },
    { year: '2019', event: 'Reached 1000+ active users milestone' },
    { year: '2021', event: 'Expanded globally with offices in 5 countries' },
    { year: '2023', event: 'Surpassed 5000+ enterprise clients' },
    { year: '2025', event: 'Introduced AI-powered analytics and forecasting' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-gray-900">
            About NextGen Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We're on a mission to empower businesses with intelligent product
            management solutions. Since 2016, we&apos;ve been helping companies
            streamline their operations, improve efficiency, and drive growth
            through innovative technology.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#contact"
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg cursor-pointer"
            >
              Get In Touch
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#vision"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all cursor-pointer"
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              {...fadeIn}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all"
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision & Values Section */}
      <section id="vision" className="container mx-auto px-4 py-24">
        <motion.h2
          {...fadeIn}
          className="text-5xl font-bold text-center mb-4 text-gray-900"
        >
          Our Values
        </motion.h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          These core values guide everything we do and shape our company culture
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              {...fadeIn}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl hover:-translate-y-2 transition-all group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-24 bg-white rounded-3xl my-16 shadow-xl border border-blue-100">
        <motion.h2
          {...fadeIn}
          className="text-5xl font-bold text-center mb-4 text-gray-900"
        >
          Meet Our Team
        </motion.h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Talented individuals united by a passion for innovation and excellence
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              {...fadeIn}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all text-center hover:-translate-y-2"
            >
              <div className="text-6xl mb-4 inline-block">{member.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {member.name}
              </h3>
              <p className="text-blue-600 font-semibold">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-24">
        <motion.h2
          {...fadeIn}
          className="text-5xl font-bold text-center mb-4 text-gray-900"
        >
          Our Journey
        </motion.h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          From humble beginnings to a global leader in product management
          solutions
        </p>

        <div className="max-w-3xl mx-auto">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              {...fadeIn}
              transition={{ delay: idx * 0.1 }}
              className="mb-8 flex gap-6 items-start"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  {idx + 1}
                </div>
                {idx < timeline.length - 1 && (
                  <div className="w-1 h-20 bg-gradient-to-b from-blue-400 to-transparent mt-2"></div>
                )}
              </div>
              <div className="pt-2 pb-8 bg-white p-6 rounded-2xl border-l-4 border-blue-600 shadow-lg flex-1">
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {item.year}
                </h3>
                <p className="text-gray-600">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <motion.div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-16 text-center text-white shadow-2xl">
          <h2 className="text-5xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Experience the power of NextGen Hub and transform how you manage
            your business
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold hover:shadow-2xl transition-all text-lg cursor-pointer"
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-24">
        <motion.h2
          {...fadeIn}
          className="text-5xl font-bold text-center mb-4 text-gray-900"
        >
          What Clients Say
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              text: 'NextGen Hub transformed our inventory management completely!',
              author: 'John Smith',
              company: 'Tech Corp',
            },
            {
              text: 'The best product management solution we&apos;ve ever used.',
              author: 'Maria Garcia',
              company: 'Global Industries',
            },
            {
              text: 'Excellent support and amazing features. Highly recommended!',
              author: 'David Lee',
              company: 'Innovation Labs',
            },
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              {...fadeIn}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white rounded-2xl shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-all"
            >
              <p className="text-gray-600 mb-4 italic">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"></div>
                <div>
                  <p className="font-bold text-gray-800">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
