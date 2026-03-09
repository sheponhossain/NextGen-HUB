import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  imageUrl: {
    type: String,
    required: false,
  },
  badge: {
    type: String,
    enum: ['Popular', 'Best Seller', 'New', 'Premium'],
    default: null,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  features: [
    {
      type: String,
    },
  ],
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: null,
  },
  category: {
    type: String,
    enum: [
      '📦 All Products',
      '📊 Inventory',
      '📈 Analytics',
      '☁️ Cloud',
      '🔒 Security',
      '👥 Team',
      '🤖 AI Tools',
    ],
    default: '📦 All Products',
  },
  sku: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
