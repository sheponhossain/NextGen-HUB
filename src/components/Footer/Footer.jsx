'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    Legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'License', href: '/license' },
    ],
    Social: [
      { label: 'Twitter', href: 'https://twitter.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'Discord', href: 'https://discord.com' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold text-white mb-4">NextGen Hub</h3>
            <p className="text-sm leading-relaxed">
              A powerful Next.js dashboard for managing your products and
              inventory with ease.
            </p>
          </motion.div>

          {/* Footer Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-blue-400 transition duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} NextGen Hub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-blue-400 transition"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-blue-400 transition"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-400 hover:text-blue-400 transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
