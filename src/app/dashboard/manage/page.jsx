'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProductModal from '../../../components/ProductModal';
import Swal from 'sweetalert2';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const { status } = useSession();
  const router = useRouter();

  // Redirect if not logged in
  if (status === 'unauthenticated') router.push('/login');

  const handleEdit = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updatedData,
          updatedAt: new Date(),
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setProducts(
          products.map((p) => (p._id === id ? { ...p, ...result.data } : p))
        );
        setIsModalOpen(false);
        alert('Product updated successfully!');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    if (data.success) setProducts(data.data);
    setLoading(false);
  };

  useEffect(() => {
    const load = async () => {
      await fetchProducts();
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'swal2-popup-custom',
        title: 'swal2-title-custom',
        htmlContainer: 'swal2-html-custom',
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProducts(products.filter((p) => p._id !== id));
      setIsModalOpen(false); // Close modal after successful deletion
      Swal.fire({
        title: 'Deleted!',
        text: 'Your product has been deleted.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#22c55e',
      });
    } else {
      const errorData = await res.json();
      Swal.fire({
        title: 'Delete Failed',
        text: `Failed to delete product: ${errorData.error || 'Unknown error'}`,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  const handleExportData = async () => {
    try {
      // Fetch all products data
      const res = await fetch('/api/products');
      const data = await res.json();

      if (!data.success) {
        throw new Error('Failed to fetch products data');
      }

      // Prepare CSV data
      const productsData = data.data;
      const csvHeaders = [
        'ID',
        'Title',
        'Description',
        'Price',
        'Priority',
        'Category',
        'SKU',
        'Image URL',
        'Created At',
        'Updated At',
      ];

      // Convert products to CSV format
      const csvContent = [
        csvHeaders.join(','),
        ...productsData.map((product) =>
          [
            product._id,
            `"${product.title.replace(/"/g, '""')}"`,
            `"${(product.shortDescription || product.fullDescription || '').replace(/"/g, '""')}"`,
            product.price || 0,
            product.priority || 'Medium',
            product.category || 'General',
            product.sku || '',
            product.imageUrl || '',
            new Date(product.createdAt || product._id).toISOString(),
            new Date(product.updatedAt || product._id).toISOString(),
          ].join(',')
        ),
      ].join('\n');

      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `products-export-${new Date().toISOString().slice(0, 10)}.csv`
      );
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
      Swal.fire({
        title: 'Export Successful!',
        text: `Successfully exported ${productsData.length} products to CSV file.`,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#22c55e',
      });
    } catch (error) {
      console.error('Export failed:', error);
      Swal.fire({
        title: 'Export Failed',
        text: `Failed to export data: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  const handleBulkImport = async () => {
    try {
      // Show SweetAlert2 file input popup
      const { value: file } = await Swal.fire({
        title: 'Bulk Import Products',
        text: 'Upload a CSV file to import multiple products at once',
        icon: 'info',
        input: 'file',
        inputAttributes: {
          accept: '.csv',
          'aria-label': 'Upload CSV file',
        },
        showCancelButton: true,
        confirmButtonText: 'Import Products',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom',
          htmlContainer: 'swal2-html-custom',
        },
      });

      if (!file) {
        return; // User cancelled
      }

      // Validate file type
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        Swal.fire({
          title: 'Invalid File Type',
          text: 'Please upload a valid CSV file.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
        });
        return;
      }

      // Read file content
      const text = await file.text();
      const lines = text.split('\n').filter((line) => line.trim());

      if (lines.length < 2) {
        Swal.fire({
          title: 'Invalid CSV File',
          text: 'CSV file must contain headers and at least one product record.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
        });
        return;
      }

      // Parse CSV headers
      const headers = lines[0]
        .split(',')
        .map((h) => h.trim().replace(/"/g, ''));
      const requiredHeaders = ['Title', 'Description', 'Price'];
      const missingHeaders = requiredHeaders.filter(
        (h) => !headers.includes(h)
      );

      if (missingHeaders.length > 0) {
        Swal.fire({
          title: 'Invalid CSV Format',
          text: `Missing required columns: ${missingHeaders.join(', ')}`,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
        });
        return;
      }

      // Parse products data
      const productsToImport = [];
      let validCount = 0;
      let invalidCount = 0;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        const values = line.split(',').map((v) => v.trim().replace(/"/g, ''));
        const productData = {};

        headers.forEach((header, index) => {
          productData[header] = values[index] || '';
        });

        // Validate required fields
        if (
          !productData.Title ||
          !productData.Description ||
          !productData.Price
        ) {
          invalidCount++;
          continue;
        }

        // Validate price
        const price = parseFloat(productData.Price);
        if (isNaN(price) || price <= 0) {
          invalidCount++;
          continue;
        }

        // Prepare product object
        const product = {
          title: productData.Title,
          description: productData.Description,
          shortDescription: productData.Description.substring(0, 200),
          fullDescription: productData.Description,
          price: price,
          priority: productData.Priority || 'Medium',
          category: productData.Category || '📦 All Products',
          sku: productData.SKU || '',
          imageUrl: productData['Image URL'] || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        productsToImport.push(product);
        validCount++;
      }

      if (validCount === 0) {
        Swal.fire({
          title: 'No Valid Products',
          text: 'No valid product data found in the CSV file.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f59e0b',
        });
        return;
      }

      // Show confirmation with summary
      const result = await Swal.fire({
        title: 'Import Summary',
        html: `
          <div style="text-align: left; font-size: 14px;">
            <p><strong>Valid products:</strong> ${validCount}</p>
            <p><strong>Invalid products:</strong> ${invalidCount}</p>
            <p><strong>Total to import:</strong> ${validCount}</p>
          </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Import Products',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom',
          htmlContainer: 'swal2-html-custom',
        },
      });

      if (!result.isConfirmed) {
        return;
      }

      // Import products
      let importedCount = 0;
      let failedCount = 0;

      for (const product of productsToImport) {
        try {
          const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
          });

          if (res.ok) {
            importedCount++;
          } else {
            failedCount++;
          }
        } catch (error) {
          failedCount++;
        }
      }

      // Refresh products list
      await fetchProducts();

      // Show final result
      if (failedCount === 0) {
        Swal.fire({
          title: 'Import Successful!',
          text: `Successfully imported ${importedCount} products.`,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#22c55e',
        });
      } else {
        Swal.fire({
          title: 'Import Partially Successful',
          text: `Imported ${importedCount} products successfully, ${failedCount} failed.`,
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f59e0b',
        });
      }
    } catch (error) {
      console.error('Bulk import failed:', error);
      Swal.fire({
        title: 'Import Failed',
        text: `Failed to import products: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        priorityFilter === 'all' ||
        (product.priority || 'Medium').toLowerCase() ===
          priorityFilter.toLowerCase()
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'date':
        default:
          return (
            new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id)
          );
      }
    });

  const getPriorityColor = (priority) => {
    const p = (priority || 'Medium').toLowerCase();
    switch (p) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full h-full mx-auto p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 rounded-2xl p-8 text-white shadow-2xl mb-8 border border-slate-700/50">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-lg flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-4h-2v4m0 0h-2m-4-4v4m-2-4v.01"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-1">Product Management</h1>
            <p className="text-slate-200 text-lg opacity-90">
              Professional inventory management and organization
            </p>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleExportData}
            className="cursor-pointer px-6 py-3 bg-white text-slate-800 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-slate-200"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export Data
            </div>
          </button>
          <Link
            href="/dashboard/add-product"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-blue-500/30"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Product
            </div>
          </Link>
          <button
            onClick={handleBulkImport}
            className="cursor-pointer px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-green-500/30"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Bulk Import
            </div>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200/50 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-slate-400"
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
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/50 hover:bg-white text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/50 hover:bg-white text-gray-800"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/50 hover:bg-white text-gray-800"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-3 bg-gradient-to-r from-slate-100 to-blue-50 text-slate-700 rounded-lg font-medium border border-slate-200/50 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {filteredProducts.length} products
              </div>
            </span>
          </div>
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200/50 p-8">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gradient-to-r from-slate-50 to-blue-50 text-slate-700 uppercase text-sm font-semibold border-b border-slate-200/50">
                <tr>
                  <th className="p-4 text-left">Product</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Priority</th>
                  <th className="p-4 text-left">Created</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredProducts
                    .slice(
                      (currentPage - 1) * productsPerPage,
                      currentPage * productsPerPage
                    )
                    .map((product, index) => (
                      <motion.tr
                        key={product._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-slate-200/50 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-blue-100 rounded-lg flex items-center justify-center shadow-sm border border-slate-200/50">
                              {product.imageUrl ? (
                                <img
                                  src={product.imageUrl}
                                  alt={product.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <span className="text-slate-500">No Image</span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-slate-900">
                                {product.title}
                              </h3>
                              <p className="text-sm text-slate-500">
                                ID: {product._id.slice(-6)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-slate-700 max-w-md truncate">
                            {product.shortDescription ||
                              product.fullDescription ||
                              'No description'}
                          </p>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-slate-900">
                            ${product.price?.toFixed(2) || '0.00'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(product.priority)}`}
                          >
                            {(product.priority || 'Medium').toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">
                          {formatDate(product.createdAt || product._id)}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <Link
                              href={`/details/${product._id}`}
                              className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-slate-200/50"
                            >
                              View
                            </Link>
                            <Link
                              href={`/dashboard/add-product?id=${product._id}`}
                              className="px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200/50"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="cursor-pointer px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-slate-200/50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-4h-2v4m0 0h-2m-4-4v4m-2-4v.01"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No products found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > productsPerPage && (
            <div className="flex justify-center items-center gap-4 mt-6 p-6 border-t border-slate-200/50 bg-slate-50/50">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
        </div>
      )}

      {/* Summary Stats */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-4h-2v4m0 0h-2m-4-4v4m-2-4v.01"
                  />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 font-medium">Total</p>
                <p className="text-xs text-slate-400">Inventory</p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-slate-600 mb-2">
              Total Products
            </h4>
            <p className="text-3xl font-bold text-slate-900">
              {products.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl shadow-lg border border-red-200/50 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg
                  className="w-6 h-6 text-white"
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
              <div className="text-right">
                <p className="text-sm text-red-500 font-medium">High</p>
                <p className="text-xs text-red-400">Priority</p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-red-600 mb-2">
              High Priority
            </h4>
            <p className="text-3xl font-bold text-red-700">
              {
                products.filter(
                  (p) => (p.priority || '').toLowerCase() === 'high'
                ).length
              }
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl shadow-lg border border-yellow-200/50 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-yellow-500 font-medium">Medium</p>
                <p className="text-xs text-yellow-400">Priority</p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-yellow-600 mb-2">
              Medium Priority
            </h4>
            <p className="text-3xl font-bold text-yellow-700">
              {
                products.filter(
                  (p) => (p.priority || '').toLowerCase() === 'medium'
                ).length
              }
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-lg border border-green-200/50 hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-500 font-medium">Low</p>
                <p className="text-xs text-green-400">Priority</p>
              </div>
            </div>
            <h4 className="text-sm font-medium text-green-600 mb-2">
              Low Priority
            </h4>
            <p className="text-3xl font-bold text-green-700">
              {
                products.filter(
                  (p) => (p.priority || '').toLowerCase() === 'low'
                ).length
              }
            </p>
          </div>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
