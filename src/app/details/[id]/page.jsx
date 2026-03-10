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
        setError(null);

        // First try to fetch from API
        const response = await fetch(`/productss/${id}`);

        if (response.ok) {
          const productData = await response.json();

          if (productData.success && productData.data) {
            // Transform the MongoDB data to match our expected format
            const transformedProduct = {
              id: productData.data._id || productData.data.id,
              title: productData.data.title || 'Untitled Product',
              description:
                productData.data.fullDescription ||
                productData.data.description ||
                'No description available',
              price: productData.data.price
                ? `$${productData.data.price}/mo`
                : '$0/mo',
              imageUrl:
                productData.data.imageUrl ||
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
              badge: productData.data.badge || null,
              rating: productData.data.rating || 4.5,
              reviews: productData.data.reviews || 0,
              features: productData.data.features || [],
              category: productData.data.category || 'General',
              sku: productData.data.sku || productData.data._id || 'N/A',
              priority: productData.data.priority || 'Medium',
            };

            setProduct(transformedProduct);
            return;
          }
        }

        // If API fails, try to fetch from the main products API
        try {
          const productsResponse = await fetch('/productss');
          if (productsResponse.ok) {
            const productsData = await productsResponse.json();

            if (productsData.success && productsData.data) {
              const foundProduct = productsData.data.find((p) => p._id === id);

              if (foundProduct) {
                const transformedProduct = {
                  id: foundProduct._id,
                  title: foundProduct.title || 'Untitled Product',
                  description:
                    foundProduct.fullDescription ||
                    foundProduct.description ||
                    'No description available',
                  price: foundProduct.price
                    ? `$${foundProduct.price}/mo`
                    : '$0/mo',
                  imageUrl:
                    foundProduct.imageUrl ||
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
                  badge: foundProduct.badge || null,
                  rating: foundProduct.rating || 4.5,
                  reviews: foundProduct.reviews || 0,
                  features: foundProduct.features || [],
                  category: foundProduct.category || 'General',
                  sku: foundProduct.sku || foundProduct._id || 'N/A',
                  priority: foundProduct.priority || 'Medium',
                };

                setProduct(transformedProduct);
                return;
              }
            }
          }
        } catch (fallbackError) {}

        // If all API attempts fail, use sample data
        const sampleProducts = [
          {
            id: '1',
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
            id: '2',
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
            id: '3',
            title: 'Cloud Sync Suite',
            description:
              'Enterprise cloud synchronization across all your devices',
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
            id: '4',
            title: 'Security Guardian',
            description:
              'Enterprise-grade security with compliance and encryption',
            price: '$99.99/mo',
            imageUrl:
              'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop',
            badge: 'Premium',
            rating: 4.9,
            reviews: 421,
            features: [
              '256-bit encryption',
              'Compliance certified',
              'Audit logs',
            ],
            category: 'security',
            sku: 'SAMPLE-004',
          },
        ];

        const foundProduct = sampleProducts.find((p) => p.id === id);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          throw new Error('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
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

  if (error) {
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
            Error Loading Product
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Back to Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto p-6 mt-10">
        <motion.button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:underline"
        >
          ← Back to Products
        </motion.button>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
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
              // Check if it's a local uploaded image or external URL
              product.imageUrl.startsWith('http') ? (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'brightness(1.05)',
                  }}
                />
              ) : (
                // For local uploaded images, use regular img tag
                <div className="relative w-full h-full">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      filter: 'brightness(1.05)',
                      transition:
                        'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.3s ease',
                    }}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                          <div class="text-white text-center p-4">
                            <div class="text-4xl mb-2">🖼️</div>
                            <p class="text-sm font-semibold">Image Error</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                  {/* Beautiful overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )
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
                    ({product.reviews} reviews)
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
