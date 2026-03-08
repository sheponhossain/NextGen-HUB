'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Card({
  href = '#',
  imageUrl = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  title = 'Untitled',
  description = '',
  price = null,
  onButtonClick = null,
  buttonText = 'View Details',
  badge = null,
  rating = null,
  reviews = null,
  features = [],
  discount = null,
  onDelete = null,
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{
          y: -12,
          boxShadow: '0px 24px 48px rgba(37, 99, 235, 0.2)',
        }}
        className="bg-white rounded-3xl overflow-hidden shadow-xl group border border-gray-100 hover:border-blue-200 transition-all duration-300 flex flex-col h-full cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative h-56 bg-gradient-to-br from-blue-500 to-indigo-700 group-hover:from-blue-600 group-hover:to-indigo-800 transition-all duration-300 overflow-hidden">
          {/* Discount Badge */}
          {discount && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
            >
              -{discount}%
            </motion.div>
          )}

          {/* Popularity Badge */}
          {badge && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className={`absolute top-4 right-4 z-10 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg ${
                badge === 'Best Seller'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-600'
                  : badge === 'Hot'
                    ? 'bg-gradient-to-r from-red-500 to-rose-600'
                    : badge === 'New'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                      : badge === 'Premium'
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
              }`}
            >
              ⭐ {badge}
            </motion.div>
          )}

          {/* Image */}
          {imageUrl ? (
            // Check if it's a local uploaded image or external URL
            imageUrl.startsWith('http') ? (
              <Image
                src={imageUrl}
                alt={title}
                width={1200}
                height={800}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  height: '100%',
                  filter: 'brightness(1.05)',
                }}
              />
            ) : (
              // For local uploaded images, use regular img tag with beautiful styling
              <div className="relative w-full h-full">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    width: '100%',
                    height: '100%',
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
            // Fallback image when no image is uploaded
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-lg font-semibold">No Image</p>
                <p className="text-sm opacity-80">Image coming soon</p>
              </div>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h4 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h4>

          {/* Rating & Reviews */}
          {rating && (
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold text-gray-800">{rating}</span>
              <span className="text-xs text-gray-500">({reviews} reviews)</span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
            {description}
          </p>

          {/* Features List */}
          {features && features.length > 0 && (
            <ul className="mb-4 space-y-2">
              {features.slice(0, 2).map((feature, idx) => (
                <li
                  key={idx}
                  className="text-xs text-gray-500 flex items-center gap-2"
                >
                  <span className="text-blue-600">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Price & Buttons */}
          <div className="flex justify-between items-center gap-3 mt-auto pt-4 border-t border-gray-100">
            {price && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Starting at</p>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {price}
                </span>
              </div>
            )}

            <div className="flex gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = href;
                  }}
                  className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl hover:shadow-lg font-semibold transition-all duration-200 whitespace-nowrap"
                >
                  {buttonText}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
