'use client';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Basic validation
    if (!name || !email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Registration successful - redirect to login page
        setError('');
        setLoading(false);
        router.push('/login');
        router.refresh();
      } else {
        setError(data.message || 'Registration failed');
        setLoading(false);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
          >
            <span className="text-white text-2xl">🚀</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-600">Join our community today</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {/* SOCIAL LOGIN */}
        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
          >
            <Image
              src="https://www.svgrepo.com/show/355037/google.svg"
              width={20}
              height={20}
              alt="Google"
              className="h-5 w-5"
            />
            Continue with Google
          </motion.button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 bg-gradient-to-r from-transparent via-white to-transparent">
              Or sign up with email
            </span>
          </div>
        </div>

        {/* REGISTRATION FORM */}
        <form className="space-y-4" onSubmit={handleRegister}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <input
              name="name"
              type="text"
              placeholder="Full name"
              required
              className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
              className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              name="password"
              type="password"
              placeholder="Password (min 6 characters)"
              required
              className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-1"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              'Sign Up'
            )}
          </motion.button>
        </form>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <Link
            href="/login"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 underline decoration-2 underline-offset-4 transition-colors"
          >
            Already have an account? Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
