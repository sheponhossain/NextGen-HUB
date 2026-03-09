'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import ProductModal from '@/components/ProductModal';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ProductsPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const handleDelete = async (id) => {
    setShowDeleteConfirm(true);
    setProductToDelete(id);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const res = await fetch(`/api/product/${productToDelete}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== productToDelete));
        alert('Product deleted successfully!');
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      alert('Error deleting product');
    } finally {
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  // Fetch products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products-public');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();

        if (data.success && data.data) {
          // Transform MongoDB data to match Card component expectations
          const formattedProducts = data.data.map((product) => ({
            id: product._id,
            title: product.title,
            price: `$${product.price}/mo`,
            description: product.shortDescription,
            imageUrl: product.imageUrl || '',
            category: product.category || 'general',
            badge: product.badge || null,
            rating: product.rating || 4.5,
            reviews: product.reviews || 0,
            discount: product.discount || 0,
            features: product.features || [],
            fullDescription: product.fullDescription,
            priority: product.priority || 'Medium',
          }));
          setProducts(formattedProducts);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { id: 'all', label: 'All Products', icon: '📦' },
    { id: '📊 Inventory', label: 'Inventory', icon: '📊' },
    { id: '📈 Analytics', label: 'Analytics', icon: '📈' },
    { id: '☁️ Cloud', label: 'Cloud', icon: '☁️' },
    { id: '🔒 Security', label: 'Security', icon: '🔒' },
    { id: '👥 Team', label: 'Team', icon: '👥' },
    { id: '🤖 AI Tools', label: 'AI Tools', icon: '🤖' },
  ];

  const filteredProducts = products.filter((product) => {
    // Filter by category
    const categoryMatch = filter === 'all' || product.category === filter;

    // Filter by search term (case insensitive)
    const searchMatch =
      searchTerm === '' ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <>
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Delete Product
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="cursor-pointer flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="cursor-pointer flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-gray-900">
              Our Products
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover powerful tools designed to streamline your business
              operations. Choose from our comprehensive suite of solutions
              tailored for modern enterprises, helping you achieve peak
              performance and efficiency.
            </p>
          </motion.div>
        </section>

        {/* Search and Filter Section */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 bg-white border-2 border-gray-200 rounded-full focus:border-blue-600 focus:outline-none text-lg font-medium transition-all duration-200 shadow-lg"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(cat.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
                    filter === cat.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600'
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <section className="container mx-auto px-4 pb-20">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl p-6 shadow-lg animate-pulse"
                >
                  <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Error State */}
        {error && !loading && (
          <section className="container mx-auto px-4 pb-20">
            <div className="text-center py-20">
              <p className="text-2xl text-red-500 mb-4">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Try Again
              </motion.button>
            </div>
          </section>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <section className="container mx-auto px-4 pb-20">
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts
                .slice(
                  (currentPage - 1) * productsPerPage,
                  currentPage * productsPerPage
                )
                .map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="relative h-full">
                      <Card
                        href={`/details/${product.id}`}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        badge={product.badge}
                        imageUrl={product.imageUrl}
                        onDelete={() => handleDelete(product.id)}
                      />
                    </div>
                  </motion.div>
                ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-2xl text-gray-500">
                  No products found. Add some products to get started!
                </p>
              </motion.div>
            )}

            {/* Pagination */}
            {filteredProducts.length > productsPerPage && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Previous
                </button>

                <span className="px-4 py-2 text-gray-600 font-medium">
                  Page {currentPage} of{' '}
                  {Math.ceil(filteredProducts.length / productsPerPage)}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(filteredProducts.length / productsPerPage)
                      )
                    )
                  }
                  disabled={
                    currentPage ===
                    Math.ceil(filteredProducts.length / productsPerPage)
                  }
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage ===
                    Math.ceil(filteredProducts.length / productsPerPage)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </section>
        )}

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20 bg-white rounded-3xl border border-blue-100 shadow-xl my-12">
          <motion.h2
            {...fadeIn}
            className="text-5xl font-bold text-center mb-12 text-gray-900"
          >
            Why Choose Our Products?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Lightning Fast',
                desc: 'Optimized performance for speed and efficiency',
              },
              {
                icon: '🔐',
                title: 'Enterprise Security',
                desc: 'Bank-level encryption and compliance standards',
              },
              {
                icon: '🎯',
                title: 'Easy Integration',
                desc: 'Seamlessly integrate with your existing tools',
              },
              {
                icon: '📊',
                title: 'Advanced Analytics',
                desc: 'Gain insights with powerful data visualization',
              },
              {
                icon: '🤝',
                title: '24/7 Support',
                desc: 'Expert support team ready to help anytime',
              },
              {
                icon: '💰',
                title: 'Great Value',
                desc: 'Flexible pricing with excellent ROI',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-16 text-center text-white shadow-2xl">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using NextGen Hub to
              transform their operations
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:shadow-2xl transition-all text-lg"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all text-lg"
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
