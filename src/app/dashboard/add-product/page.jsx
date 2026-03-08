'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function AddProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Protected Page Logic
  if (status === 'unauthenticated') router.push('/login');

  const fetchProductForEdit = async (id) => {
    try {
      console.log('Fetching product for edit with ID:', id);
      const res = await fetch(`/api/product/${id}`);
      console.log('Fetch response status:', res.status);

      if (res.ok) {
        const data = await res.json();
        console.log('Product data received:', data);
        setEditingProduct(data.data);
      } else {
        const errorText = await res.text();
        console.error('Failed to fetch product:', errorText);
        Swal.fire({
          title: 'Load Error',
          text: `Failed to load product for editing. Status: ${res.status}`,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
        });
        router.push('/dashboard/manage');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      Swal.fire({
        title: 'Load Error',
        text: 'Failed to load product for editing',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
      router.push('/dashboard/manage');
    }
  };

  // Check if we're editing and fetch the product data
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
      const loadProduct = async () => {
        await fetchProductForEdit(productId);
      };
      loadProduct();
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
      ];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          title: 'Invalid File Type',
          text: 'Invalid file type. Only JPG, PNG, and GIF files are allowed.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'File Too Large',
          text: 'File too large. Maximum file size is 5MB.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        Swal.fire({
          title: 'Image Uploaded!',
          text: 'Image uploaded successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#22c55e',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Client-side validation with improved error handling
    const title = formData.get('title');
    const shortDescription = formData.get('shortDescription');
    const fullDescription = formData.get('fullDescription');
    const price = formData.get('price');
    const file = formData.get('imageUrl');

    // Title validation
    if (!title || title.trim() === '') {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please enter a product title',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
      return;
    }

    if (title.trim().length < 3) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Product title must be at least 3 characters long',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
      return;
    }

    // Description validation
    if (!shortDescription || shortDescription.trim() === '') {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please enter a short description',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
      return;
    }

    if (shortDescription.trim().length < 10) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Short description must be at least 10 characters long',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
      return;
    }

    if (!fullDescription || fullDescription.trim() === '') {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please enter a full description',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
      return;
    }

    if (fullDescription.trim().length < 20) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Full description must be at least 20 characters long',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
      return;
    }

    // Price validation
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please enter a valid price (must be greater than 0)',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
      return;
    }

    if (parseFloat(price) > 999999) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Price cannot exceed $999,999',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
      return;
    }

    // Show SweetAlert2 confirmation popup
    const result = await Swal.fire({
      title: editingProduct ? 'Update Product?' : 'Add Product?',
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Price:</strong> $${parseFloat(price).toFixed(2)}</p>
          <p><strong>Category:</strong> ${formData.get('category') || 'General'}</p>
          <p><strong>Priority:</strong> ${formData.get('priority') || 'Medium'}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: editingProduct ? 'Update Product' : 'Add Product',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      customClass: {
        popup: 'swal2-popup-custom',
        title: 'swal2-title-custom',
        htmlContainer: 'swal2-html-custom',
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    setLoading(true);

    // Handle file upload
    let imageUrl = editingProduct?.imageUrl || '';
    if (file && file.size > 0) {
      // Validate file type
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
      ];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          title: 'File Type Error',
          text: 'Invalid file type. Only JPG, PNG, and GIF files are allowed.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
        });
        setLoading(false);
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'File Size Error',
          text: 'File too large. Maximum file size is 5MB.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
        });
        setLoading(false);
        return;
      }

      const uploadData = new FormData();
      uploadData.append('file', file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (uploadRes.ok) {
        const uploadResult = await uploadRes.json();
        imageUrl = uploadResult.url;
      } else {
        let errorMessage = 'Failed to upload image';
        try {
          const uploadError = await uploadRes.json();
          errorMessage = uploadError.error || errorMessage;
        } catch (parseError) {
          console.error('Failed to parse upload error:', parseError);
        }
        Swal.fire({
          title: 'Upload Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
        });
        setLoading(false);
        return;
      }
    }

    // Prepare product data
    const productData = {
      title: title.trim(),
      description: shortDescription.trim(), // Map to 'description' field in schema
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim(),
      price: parseFloat(price),
      priority: formData.get('priority') || 'Medium',
      category: formData.get('category') || '📦 All Products',
      sku: formData.get('sku') || '',
      imageUrl: imageUrl,
      updatedAt: new Date(),
    };

    const url = editingProduct
      ? `/api/product/${editingProduct._id}`
      : '/api/products';
    const method = editingProduct ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(productData),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const result = await res.json();
      console.log('Product saved successfully:', result.data);
      Swal.fire({
        title: editingProduct ? 'Product Updated!' : 'Product Added!',
        text: editingProduct
          ? 'Product Updated Successfully!'
          : 'Product Added Successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#22c55e',
      });
      router.push('/dashboard/manage');
    } else {
      let errorMessage = 'Unknown error occurred';
      try {
        const error = await res.json();
        console.error('Failed to save product:', error);

        // Handle different error formats
        if (error && error.error) {
          errorMessage = error.error;
        } else if (error && error.message) {
          errorMessage = error.message;
        } else if (error && typeof error === 'string') {
          errorMessage = error;
        } else if (error) {
          errorMessage = JSON.stringify(error);
        }
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
        // If we can't parse the JSON, try to get the text response
        try {
          const errorText = await res.text();
          console.error('Raw error response:', errorText);
          errorMessage = errorText || 'Server returned an invalid response';
        } catch (textError) {
          console.error('Failed to get error text:', textError);
        }
      }

      Swal.fire({
        title: 'Save Failed',
        text: `Failed to save product: ${errorMessage}`,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-white via-gray-50 to-white rounded-xl shadow-lg border border-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h1>
        <p className="text-gray-600 text-lg">
          {editingProduct
            ? 'Update your product information below'
            : 'Create a new product listing'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              name="title"
              placeholder="Enter product name..."
              defaultValue={editingProduct?.title || ''}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-lg">$</span>
              </div>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                defaultValue={editingProduct?.price || ''}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              defaultValue={editingProduct?.category || '📦 All Products'}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 text-gray-800"
            >
              <option value="📦 All Products">📦 All Products</option>
              <option value="📊 Inventory">📊 Inventory</option>
              <option value="📈 Analytics">📈 Analytics</option>
              <option value="☁️ Cloud">☁️ Cloud</option>
              <option value="🔒 Security">🔒 Security</option>
              <option value="👥 Team">👥 Team</option>
              <option value="🤖 AI Tools">🤖 AI Tools</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              name="priority"
              defaultValue={editingProduct?.priority || 'Medium'}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 text-gray-800"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SKU
            </label>
            <input
              name="sku"
              placeholder="SKU-001"
              defaultValue={editingProduct?.sku || ''}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Upload
            </label>
            {(imagePreview || editingProduct?.imageUrl) && (
              <div className="mb-4">
                <img
                  src={imagePreview || editingProduct?.imageUrl}
                  alt="Product preview"
                  className="w-full h-40 object-cover rounded-lg border border-gray-200 shadow-sm"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-600">
                    {imagePreview ? 'New image selected' : 'Current image'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setImagePreview('')}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Remove image
                  </button>
                </div>
              </div>
            )}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200 bg-gray-50/50">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                </div>
                <div>
                  <input
                    name="imageUrl"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Drag and drop or click to upload • Max 5MB • JPG, PNG, GIF
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            placeholder="Describe your product in 2-3 sentences..."
            defaultValue={editingProduct?.shortDescription || ''}
            maxLength="500"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-gray-800 placeholder-gray-400"
            rows="3"
            required
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{editingProduct?.shortDescription?.length || 0}/500</span>
            <span>Keep it concise and compelling</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Description
          </label>
          <textarea
            name="fullDescription"
            placeholder="Provide detailed information about your product..."
            defaultValue={editingProduct?.fullDescription || ''}
            maxLength="2000"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-gray-800 placeholder-gray-400"
            rows="5"
            required
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{editingProduct?.fullDescription?.length || 0}/2000</span>
            <span>Include features, specifications, and benefits</span>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={() => router.push('/dashboard/manage')}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : editingProduct ? (
              'Update Product'
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
