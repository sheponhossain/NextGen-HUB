'use client';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SampleProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample products data (same as in page.js)
    const sampleProducts = [
      {
        id: 1,
        title: 'Inventory Master Pro',
        description:
          'Advanced real-time inventory tracking with barcode scanning',
        price: '$49.99/mo',
        imageUrl:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        badge: 'Popular',
        rating: 4.8,
        reviews: 245,
        features: [
          'Real-time tracking',
          'Barcode scanning',
          'Multi-warehouse support',
        ],
        category: 'inventory',
        sku: 'SAMPLE-001',
      },
      {
        id: 2,
        title: 'Dashboard Elite',
        description:
          'Comprehensive analytics and reporting dashboard with AI insights',
        price: '$79.99/mo',
        imageUrl:
          'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=400&h=300&fit=crop',
        badge: 'Best Seller',
        rating: 4.9,
        reviews: 389,
        features: [
          'AI-powered insights',
          'Custom reports',
          'Real-time dashboards',
        ],
        category: 'analytics',
        sku: 'SAMPLE-002',
      },
      {
        id: 3,
        title: 'Cloud Sync Suite',
        description: 'Enterprise cloud synchronization across all your devices',
        price: '$89.99/mo',
        imageUrl:
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
        badge: 'New',
        rating: 4.7,
        reviews: 156,
        features: ['Auto-sync', 'Version control', '99.9% uptime SLA'],
        category: 'cloud',
        sku: 'SAMPLE-003',
      },
      {
        id: 4,
        title: 'Security Guardian',
        description: 'Enterprise-grade security with compliance and encryption',
        price: '$99.99/mo',
        imageUrl:
          'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop',
        badge: 'Premium',
        rating: 4.9,
        reviews: 421,
        features: ['256-bit encryption', 'Compliance certified', 'Audit logs'],
        category: 'security',
        sku: 'SAMPLE-004',
      },
    ];

    // Find the product by ID
    const foundProduct = sampleProducts.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 mt-10">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto p-6 mt-10">
        <motion.button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:underline cursor-pointer"
        >
          ← Back to Products
        </motion.button>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sample Product Not Found
          </h2>
          <p className="text-gray-600">
            The sample product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-blue-600 hover:underline cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <motion.button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:underline cursor-pointer"
      >
        ← Back to Products
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-10"
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative h-96 md:h-[500px] bg-gradient-to-br from-blue-500 to-indigo-700 rounded-3xl overflow-hidden"
          >
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  No Image Available
                </span>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

            {/* Badges */}
            <div className="absolute top-4 left-4 space-y-2">
              {product.badge && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                    product.badge === 'Best Seller'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-600'
                      : product.badge === 'Hot'
                        ? 'bg-gradient-to-r from-red-500 to-rose-600'
                        : product.badge === 'New'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                          : product.badge === 'Premium'
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
                            : 'bg-gradient-to-r from-blue-500 to-blue-600'
                  }`}
                >
                  ⭐ {product.badge}
                </span>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                {product.title}
              </h1>
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {product.price}
              </p>
              {product.rating && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-semibold text-gray-800">
                    {product.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                Description:
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">
                  Key Features:
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:shadow-lg font-semibold transition-all duration-200 transform hover:scale-105">
                Add to Cart
              </button>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                Add to Wishlist
              </button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-semibold text-gray-800">Category:</span>
                <br />
                <span>{product.category || 'General'}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-semibold text-gray-800">SKU:</span>
                <br />
                <span>{product.sku || 'N/A'}</span>
              </div>
            </div>

            {/* Sample Product Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This is a sample product for
                demonstration purposes. To explore real products, visit our{' '}
                <Link
                  href="/products"
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Products page
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
