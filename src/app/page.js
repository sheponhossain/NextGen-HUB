'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import Footer from '@/components/Footer/Footer';
import Card from '@/components/Card';
import ProductModal from '@/components/ProductModal';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const slideIn = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const zoomIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, type: 'spring', stiffness: 100 },
};

const float = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function LandingPage() {
  const router = useRouter();

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const nextTestimonial = useCallback(
    (count) => setTestimonialIndex((i) => (i + 1) % count),
    []
  );
  const prevTestimonial = useCallback(
    (count) => setTestimonialIndex((i) => (i - 1 + count) % count),
    []
  );

  const testimonials = [
    {
      quote:
        'This platform completely overhauled our inventory workflow. Absolutely stellar UX and support.',
      name: 'Emily R.',
      role: 'Operations Manager, Acme Corp',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      rating: 5,
    },
    {
      quote:
        'Sales have doubled since we integrated the dashboard features. Data is now our strongest asset.',
      name: 'Michael S.',
      role: 'CEO, WidgetWorks',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      rating: 4,
    },
    {
      quote:
        'The onboarding was seamless and the team is very responsive. Highly recommend to any e-commerce business.',
      name: 'Aisha K.',
      role: 'Founder, StyleMart',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      rating: 5,
    },
  ];

  // automatically advance testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(
      () => nextTestimonial(testimonials.length),
      5000
    );
    return () => clearInterval(interval);
  }, [testimonials.length, nextTestimonial]);

  const sampleProducts = [
    {
      id: 1,
      title: 'Inventory Master Pro',
      description:
        'Advanced real-time inventory tracking with barcode scanning',
      price: '$49.99/mo',
      imageUrl:
        'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=400&h=300&fit=crop',
      badge: 'Popular',
      rating: 4.8,
      reviews: 245,
    },
    {
      id: 2,
      title: 'Dashboard Elite',
      description: 'Comprehensive analytics dashboard with AI insights',
      price: '$79.99/mo',
      imageUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      badge: 'Best Seller',
      rating: 4.9,
      reviews: 389,
    },
    {
      id: 3,
      title: 'Cloud Sync Suite',
      description: 'Seamless cloud synchronization across devices',
      price: '$89.99/mo',
      imageUrl:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      badge: 'New',
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      title: 'Security Guardian',
      description: 'Enterprise-grade security with compliance',
      price: '$99.99/mo',
      imageUrl:
        'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop',
      badge: 'Premium',
      rating: 4.9,
      reviews: 421,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center z-10 relative"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white">
            Manage Your Products <br />{' '}
            <span className="text-cyan-300">Like a Pro</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 text-blue-100">
            Build, manage, and scale your inventory with our high-performance
            Next.js application. Simple, fast, and secure.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition shadow-2xl inline-block"
              >
                Explore Products
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-slate-900 transition inline-block"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
          {/* Hero quick stats */}
          <div className="mt-8 flex gap-6 justify-center flex-wrap text-sm text-blue-100 opacity-90">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 px-3 py-2 rounded-full font-semibold">
                10k+
              </div>
              <div>Active users</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 px-3 py-2 rounded-full font-semibold">
                99%
              </div>
              <div>Uptime</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 px-3 py-2 rounded-full font-semibold">
                14d
              </div>
              <div>Free trial</div>
            </div>
          </div>
        </motion.div>
        {/* Background Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400 rounded-full blur-[100px] opacity-20"
        />
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-12"
          >
            <path
              d="M0,0V46.29c47.56,22.56,106.66,35.08,166,39,40.64,2.71,81.28-0.45,121-2.44C411.67,74.28,451,68.81,490,57.66c91-26.92,182-38,273-1.39,59.62,23.24,115.79,60.48,176,79.16,59.31,18.51,118.53,21.34,177,3.34V0Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* 2. PRODUCT SHOWCASE */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Explore Our Solutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A curated selection of our most powerful tools to jumpstart your
              workflow.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="h-full"
              >
                <Card
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  href={`/details/${item.id}`}
                  badge={item.badge}
                  imageUrl={item.imageUrl}
                  onButtonClick={() => {
                    setSelectedProduct(item);
                    setIsModalOpen(true);
                  }}
                  buttonText="View Details"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED BY SECTION */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <p className="text-gray-600 mb-4 text-lg font-medium">
              Trusted by industry leaders
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Join thousands of satisfied teams
            </h3>
          </motion.div>

          {/* Animated Logo Carousel */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-8 md:gap-16"
              animate={{ x: ['-100%', '0%'] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
              }}
            >
              {/* First set of logos */}
              {[
                {
                  name: 'Microsoft',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
                  color: 'bg-blue-600',
                },
                {
                  name: 'Amazon',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
                  color: 'bg-orange-500',
                },
                {
                  name: 'Google',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
                  color: 'bg-red-500',
                },
                {
                  name: 'Netflix',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
                  color: 'bg-red-600',
                },
                {
                  name: 'Adobe',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Systems_logo_and_wordmark.svg',
                  color: 'bg-red-500',
                },
                {
                  name: 'Shopify',
                  logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/Shopify_Logo.svg',
                  color: 'bg-green-600',
                },
              ].map((company, idx) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 w-32 md:w-40 h-16 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-4 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-8 w-auto object-contain"
                  />
                </motion.div>
              ))}

              {/* Duplicate set for seamless loop */}
              {[
                {
                  name: 'Microsoft',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
                  color: 'bg-blue-600',
                },
                {
                  name: 'Amazon',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
                  color: 'bg-orange-500',
                },
                {
                  name: 'Google',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
                  color: 'bg-red-500',
                },
                {
                  name: 'Netflix',
                  logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/Netflix_2015_logo.svg',
                  color: 'bg-red-600',
                },
                {
                  name: 'Adobe',
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Systems_logo_and_wordmark.svg',
                  color: 'bg-red-500',
                },
                {
                  name: 'Shopify',
                  logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/Shopify_Logo.svg',
                  color: 'bg-green-600',
                },
              ].map((company, idx) => (
                <motion.div
                  key={`dup-${idx}`}
                  className="flex-shrink-0 w-32 md:w-40 h-16 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-4 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx + 6) * 0.1 }}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-8 w-auto object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { number: '50k+', label: 'Happy Customers', icon: '👥' },
              { number: '99.9%', label: 'Uptime Guarantee', icon: '⚡' },
              { number: '24/7', label: 'Customer Support', icon: '🎯' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <h4 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </h4>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* background illustration */}
        <motion.img
          src="https://images.unsplash.com/photo-1581091215362-90460758b44d?w=600"
          alt="Features illustration"
          className="absolute top-0 right-0 w-1/4 opacity-20 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
        />
        {/* decorative blobs */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-10 -left-20 w-72 h-72 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-15"
        />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Core Features
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Fast Performance', icon: '⚡' },
              { name: 'Secure Auth', icon: '🔐' },
              { name: 'Real-time DB', icon: '🚀' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-8 border border-blue-100 rounded-2xl hover:shadow-2xl transition-all hover:-translate-y-2 text-center bg-gradient-to-br from-white to-blue-50"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="text-3xl">{feature.icon}</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  {feature.name}
                </h3>
                <p className="text-gray-600">
                  Experience seamless management with our cutting-edge
                  technology stack.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* decorative animation/image */}
        <motion.img
          src="https://images.unsplash.com/photo-1581094658037-b708e1c6c3b3?w=600"
          alt="Process illustration"
          className="absolute left-0 top-1/2 w-1/3 opacity-20 hidden lg:block transform -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
        />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Create Account',
                desc: 'Start by signing up with your email or social login.',
                img: 'https://images.unsplash.com/photo-1560438718-ebfa50dc65e3?w=600',
              },
              {
                title: 'List Products',
                desc: 'Easily add and categorize your inventory items.',
                img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
              },
              {
                title: 'Analyze Growth',
                desc: 'Use our dashboards to track sales and trends.',
                img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="relative flex flex-col justify-between h-full p-8 bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl shadow-2xl hover:shadow-3xl transition transform hover:-translate-y-3 hover:scale-105"
              >
                {/* animated illustration */}
                {step.img && (
                  <motion.img
                    src={step.img}
                    alt={step.title}
                    className="mx-auto mb-4 h-20 w-20 rounded-full object-cover drop-shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-2">{step.desc}</p>
                {/* subtle divider */}
                <div className="h-px bg-gray-200 my-4"></div>
                <button
                  onClick={() => {
                    if (step.title === 'Create Account') {
                      router.push('/register');
                    } else if (step.title === 'List Products') {
                      router.push('/login');
                    }
                  }}
                  className="mt-2 inline-block w-36 mx-auto text-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm shadow-md hover:bg-blue-700 transition cursor-pointer"
                >
                  {step.title === 'Create Account'
                    ? 'Sign Up Now'
                    : step.title === 'List Products'
                      ? 'Go to Dashboard'
                      : 'Get Insights'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATISTICS SECTION */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white text-center">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '10k+', label: 'Active Users', icon: '👥' },
            { number: '500+', label: 'Products', icon: '📦' },
            { number: '99%', label: 'Uptime', icon: '⚡' },
            { number: '24/7', label: 'Support', icon: '🎯' },
          ].map((stat, idx) => (
            <motion.div key={idx} {...fadeIn} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <h3 className="text-5xl font-bold mb-2">{stat.number}</h3>
              <p className="opacity-80 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            What Our Clients Say
          </h2>
          <div className="max-w-2xl mx-auto">
            <motion.div
              {...fadeIn}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={testimonials[testimonialIndex].avatar}
                  alt={testimonials[testimonialIndex].name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-800 italic">
                    &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
                  </p>
                  <p className="mt-2 font-semibold text-gray-900">
                    {testimonials[testimonialIndex].name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonials[testimonialIndex].role}
                  </p>
                </div>
              </div>
              <div>
                {Array.from({
                  length: testimonials[testimonialIndex].rating,
                }).map((_, i) => (
                  <span key={i} className="text-yellow-500">
                    ★
                  </span>
                ))}
                {Array.from({
                  length: 5 - testimonials[testimonialIndex].rating,
                }).map((_, i) => (
                  <span key={i} className="text-gray-300">
                    ★
                  </span>
                ))}
              </div>
            </motion.div>
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => prevTestimonial(testimonials.length)}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              >
                ‹
              </button>
              <button
                onClick={() => nextTestimonial(testimonials.length)}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our platform. Everything
              you need to know in one place.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {[
              {
                q: 'How do I start with your platform?',
                a: 'Getting started is simple! Sign up for an account, verify your email, and begin adding products right away. Our intuitive onboarding process takes just 2 minutes to get you up and running. You will have access to all essential features immediately.',
              },
              {
                q: 'Can I integrate your platform with other tools?',
                a: 'Absolutely! Our open API allows you to connect with third-party services seamlessly. We support integrations with popular e-commerce platforms, payment gateways, and analytics tools. Our API documentation provides comprehensive guides for developers.',
              },
              {
                q: 'Is there a free trial available?',
                a: 'Yes! We offer 14 days of full access with no credit card required. During your trial, you can explore all features, add unlimited products, and experience the complete platform. Upgrade anytime during or after the trial period.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All transactions are secured with industry-standard encryption and comply with PCI DSS requirements.',
              },
              {
                q: 'How is my data secured and protected?',
                a: 'We use industry-standard encryption (SSL/TLS), regular security audits, and comply with GDPR and other data protection regulations. Your data is stored in secure data centers with 99.9% uptime guarantee. We also provide two-factor authentication for added security.',
              },
              {
                q: 'Do you offer customer support?',
                a: 'Yes, we provide 24/7 customer support through multiple channels including live chat, email, and phone. Our dedicated support team is available to help you with any questions or issues. Enterprise customers receive priority support with dedicated account managers.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              >
                <motion.button
                  className="w-full text-left p-6 flex items-center justify-between group"
                  onClick={() => {
                    const content = document.querySelector(
                      `[data-faq-index="${idx}"]`
                    );
                    if (content) {
                      const isVisible = content.style.maxHeight;
                      content.style.maxHeight = isVisible ? '0' : '1000px';
                      content.style.opacity = isVisible ? '0' : '1';
                      content.style.paddingTop = isVisible ? '0' : '1rem';
                    }
                  }}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {item.q}
                  </h3>
                  <motion.div
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300"
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
                  </motion.div>
                </motion.button>
                <motion.div
                  className="text-gray-600 leading-relaxed overflow-hidden px-6 pb-6"
                  initial={{ maxHeight: 0, opacity: 0, paddingTop: 0 }}
                  animate={{
                    maxHeight: '1000px',
                    opacity: 1,
                    paddingTop: '1rem',
                  }}
                  transition={{ duration: 0.3 }}
                  data-faq-index={idx}
                  style={{
                    maxHeight: '0',
                    opacity: '0',
                    paddingTop: '0',
                    transition:
                      'max-height 0.3s ease-out, opacity 0.3s ease-out, padding-top 0.3s ease-out',
                  }}
                >
                  {item.a}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our team is here to help. Contact us and we'll get back to you
                within 24 hours.
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 text-base"
              >
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. PRICING PLANS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Pricing Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Simple, predictable pricing for teams of all sizes. Try any plan
            free for 14 days.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: '$19',
                period: '/mo',
                bullets: [
                  'Up to 500 products',
                  'Email support',
                  'Core features',
                ],
              },
              {
                name: 'Business',
                price: '$49',
                period: '/mo',
                bullets: [
                  'Unlimited products',
                  'Priority support',
                  'Advanced analytics',
                ],
              },
              {
                name: 'Enterprise',
                price: 'Contact',
                period: '',
                bullets: ['SAML/SSO', 'Dedicated support', 'Custom SLAs'],
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className={`p-8 rounded-2xl bg-white shadow-lg border ${plan.name === 'Business' ? 'border-blue-200 scale-100' : 'border-gray-100'}`}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-2 mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-600">{plan.period}</span>
                </div>
                <ul className="text-gray-600 mb-6 space-y-2">
                  {plan.bullets.map((b, i) => (
                    <li key={i} className="text-sm">
                      • {b}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold ${plan.name === 'Business' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'border-2 border-gray-200 text-gray-700'}`}
                >
                  {plan.name === 'Enterprise'
                    ? 'Contact Sales'
                    : 'Start Free Trial'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA BANNER */}
      <section className="py-24 container mx-auto px-4">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-16 text-center text-white relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20"
            animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          ></motion.div>
          <div className="relative z-10">
            <motion.h2
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ready to scale your business?
            </motion.h2>
            <motion.p
              className="mb-8 opacity-90 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join thousands of managers who trust our Next.js dashboard for
              their daily operations. Start free today.
            </motion.p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-200 text-lg"
            >
              Start Now for Free
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 11. FOOTER */}
      <Footer />
    </main>
  );
}
