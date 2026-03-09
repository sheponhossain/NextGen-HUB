'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Headphones,
  ArrowUp,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Security', href: '#security' },
      { label: 'Roadmap', href: '#roadmap' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    Support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Community', href: '/community' },
      { label: 'Status', href: '/status' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'License', href: '/license' },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-900 text-gray-300">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gray-800"></div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <Link href="/" className="flex items-center">
                <div className="flex items-center font-sans">
                  <div className="relative flex flex-col items-start">
                    {/* Main Text Container */}
                    <div className="flex items-baseline leading-none">
                      {/* NextGen Part */}
                      <h1
                        className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg"
                        style={{
                          filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))',
                        }}
                      >
                        NextGen
                      </h1>

                      {/* Vertical Separator */}
                      <div className="mx-1 w-[3px] h-[20px] md:h-[24px] bg-gradient-to-b from-green-400 to-blue-500 rounded-full shadow-inner"></div>

                      {/* HUB Part */}
                      <h1 className="text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-b from-sky-300 to-sky-600 bg-clip-text text-transparent drop-shadow-md">
                        HUB
                      </h1>
                    </div>

                    {/* Bottom Decorative Line */}
                    <div className="w-[60%] h-[3px] mt-0.5 bg-gradient-to-r from-blue-500 via-green-400 to-green-500 rounded-sm shadow-lg"></div>
                  </div>
                </div>
                <span className="sr-only">NextGen Hub</span>
              </Link>
            </div>

            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              A powerful Next.js dashboard for managing your products and
              inventory with cutting-edge technology and modern design
              principles.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition">
                <Mail size={18} />
                <span>contact@nextgenhub.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition">
                <Phone size={18} />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition">
                <MapPin size={18} />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="lg:col-span-1"
            >
              <h4 className="text-white font-semibold mb-4 text-lg">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-blue-400 transition duration-200 text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-transparent group-hover:bg-blue-500 rounded-full transition"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <h4 className="text-white text-lg font-semibold mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-400 text-sm">
                Subscribe to our newsletter for the latest updates, features,
                and exclusive content.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition"
              />
              <button className="px-4 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition transform hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row gap-6 text-sm text-gray-400">
              <span>
                &copy; {currentYear} NextGen Hub. All rights reserved.
              </span>
              <div className="flex gap-4">
                <Link
                  href="/privacy"
                  className="hover:text-blue-400 transition"
                >
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-blue-400 transition">
                  Terms of Service
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              {[
                {
                  Icon: Facebook,
                  href: 'https://facebook.com',
                  color: 'text-blue-600',
                },
                {
                  Icon: Twitter,
                  href: 'https://twitter.com',
                  color: 'text-blue-400',
                },
                {
                  Icon: Instagram,
                  href: 'https://instagram.com',
                  color: 'text-pink-500',
                },
                {
                  Icon: Linkedin,
                  href: 'https://linkedin.com',
                  color: 'text-blue-700',
                },
              ].map(({ Icon, href, color }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition ${color}`}
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Support Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="fixed bottom-8 right-8"
      >
        {/* Floating Chat Widget */}
        <div className="relative">
          {/* Chat Bubble */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -top-16 -right-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm font-medium border border-gray-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Need help? Chat with us!</span>
            </div>
          </motion.div>

          {/* Customer Support Button */}
          <button
            onClick={() => window.open('https://wa.me/8801234567890', '_blank')}
            className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group"
            title="Chat with our support team"
          >
            <div className="relative">
              {/* Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                S
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
