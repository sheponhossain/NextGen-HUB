'use client';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email: e.target.email.value,
        password: e.target.password.value,
        redirect: false,
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        alert('Invalid Credentials! Try demo@example.com / demopassword123');
        setLoading(false);
      }
    } catch (error) {
      alert('An error occurred during login. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', {
        callbackUrl: '/',
      });
    } catch (error) {
      alert(
        'Google login failed. Please check your internet connection and try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100"
      >
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your details to login
          </p>
        </div>

        {/* SOCIAL LOGIN */}
        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
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
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* CREDENTIALS FORM */}
        <form className="space-y-4" onSubmit={handleCredentialsLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition"
          >
            {loading ? 'Processing...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/register"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 underline decoration-2 underline-offset-4 cursor-pointer"
          >
            Don&apos;t have an account? Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
