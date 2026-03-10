'use client';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/products/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
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

  if (error || !product) {
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
            Product Not Found
          </h2>
          <p className="text-gray-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
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
          key={product._id}
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
              {product.discount && (
                <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  -{product.discount}%
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
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
