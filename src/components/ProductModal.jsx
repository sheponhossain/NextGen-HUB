'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: product?.title || '',
    shortDescription: product?.shortDescription || '',
    fullDescription: product?.fullDescription || '',
    price: product?.price || '',
    priority: product?.priority || 'Medium',
  });

  if (!isOpen || !product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    // Call the edit function passed from parent
    if (onEdit) {
      onEdit(product._id, formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditing ? 'Edit Product' : 'Product Details'}
              </h2>
              <div className="flex gap-2">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-blue-500 to-indigo-700 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
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

                {/* Priority Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                      (product.priority || 'Medium').toLowerCase() === 'high'
                        ? 'bg-red-500'
                        : (product.priority || 'Medium').toLowerCase() ===
                            'medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                  >
                    {(product.priority || 'Medium').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8">
                {isEditing ? (
                  // Edit Form
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Short Description
                      </label>
                      <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Description
                      </label>
                      <textarea
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // View Mode
                  <>
                    {/* Title and Price */}
                    <div className="mb-6">
                      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                        {product.title}
                      </h1>
                      <p className="text-3xl font-bold text-blue-600 mb-2">
                        ${product.price?.toFixed(2) || '0.00'}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-800">
                        Short Description:
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {product.shortDescription}
                      </p>

                      <h3 className="font-bold text-lg mb-2 text-gray-800">
                        Full Description:
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {product.fullDescription}
                      </p>
                    </div>

                    {/* Priority */}
                    <div className="mb-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-800">
                        Priority:
                      </h3>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          (product.priority || 'Medium').toLowerCase() ===
                          'high'
                            ? 'bg-red-100 text-red-700'
                            : (product.priority || 'Medium').toLowerCase() ===
                                'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {(product.priority || 'Medium').toUpperCase()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:shadow-lg font-semibold transition-all duration-200 transform hover:scale-105">
                        View Product Page
                      </button>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
                      >
                        Edit Product
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure you want to delete this product? This action cannot be undone.'
                            )
                          ) {
                            onDelete(product._id);
                          }
                        }}
                        className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg font-semibold transition-all duration-200 transform hover:scale-105"
                      >
                        Delete Product
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
