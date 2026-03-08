'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

function UserDropdown() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (status === 'loading') {
    return (
      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 bg-white border border-gray-200 px-2 py-1 rounded-full hover:shadow-lg transition-all duration-200"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {session.user?.name?.charAt(0) || 'U'}
              </span>
            </div>
          )}
        </div>
        <div className="hidden md:block">
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </motion.button>

      {dropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {session.user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  {session.user?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {session.user?.email || 'user@example.com'}
                </div>
              </div>
            </div>
          </div>

          <div className="py-2">
            <Link href="/dashboard/add-product">
              <motion.div
                whileHover={{ backgroundColor: '#f8fafc', x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer flex items-center gap-3"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600">➕</span>
                </span>
                Add Product
              </motion.div>
            </Link>

            <Link href="/dashboard/manage">
              <motion.div
                whileHover={{ backgroundColor: '#f8fafc', x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer flex items-center gap-3"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600">📊</span>
                </span>
                Manage Products
              </motion.div>
            </Link>
          </div>

          <div className="border-t border-gray-100 mt-2 pt-2">
            <Link href="/api/auth/signout">
              <motion.div
                whileHover={{ backgroundColor: '#fef2f2', x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 cursor-pointer flex items-center gap-3"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span>🚪</span>
                </span>
                Sign Out
              </motion.div>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
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
        </motion.div>

        <div className="hidden md:flex space-x-8 items-center">
          {[
            { path: '/', label: 'Home' },
            { path: '/products', label: 'Products' },
            { path: '/about', label: 'About' },
            { path: '/contact', label: 'Contact' },
          ].map((item, idx) => {
            const isActive =
              item.path === '/'
                ? pathname === '/'
                : pathname.startsWith(item.path);
            return (
              <Link key={idx} href={item.path}>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  className={`inline-flex items-center text-gray-600 font-semibold transition-colors cursor-pointer group relative ${
                    isActive ? 'text-blue-400' : 'hover:text-blue-300'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-1 transition-all duration-300 rounded-full ${isActive ? 'w-full bg-blue-400' : 'w-0 group-hover:w-full bg-blue-300'}`}
                  ></span>
                </motion.span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
