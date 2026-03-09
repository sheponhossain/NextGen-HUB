'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  MessageCircle,
  Calendar,
  TrendingUp,
  Award,
  Globe,
  Star,
  MessageCircle as ChatBubble,
  Lightbulb,
  Rocket,
} from 'lucide-react';

export default function Community() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Users size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Community
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Join our vibrant community of developers, share knowledge, and
              collaborate to build amazing things with NextGen Hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/help"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-lg"
              >
                Get Help
              </Link>
              <Link
                href="/docs"
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition transform hover:-translate-y-1"
              >
                Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Members</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="text-3xl font-bold text-green-600 mb-2">5K+</div>
              <div className="text-gray-600">Discussions</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">1K+</div>
              <div className="text-gray-600">Contributors</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Left Column - Community Features */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Join the Conversation
                </h2>
                <div className="space-y-4">
                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MessageCircle size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Discussion Forums
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Participate in discussions, ask questions, and share
                          your knowledge with the community.
                        </p>
                        <Link
                          href="/community/forums"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Visit Forums
                          <ChatBubble size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Calendar size={24} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Events & Meetups
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Join virtual events, webinars, and local meetups to
                          connect with other community members.
                        </p>
                        <Link
                          href="/community/events"
                          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                        >
                          View Events
                          <Calendar size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Lightbulb size={24} className="text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Ideas & Feedback
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Share your ideas for new features and vote on
                          community suggestions.
                        </p>
                        <Link
                          href="/community/ideas"
                          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Share Ideas
                          <Lightbulb size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Topics */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Popular Topics
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Getting Started',
                      posts: '1,234',
                      icon: 'Rocket',
                    },
                    {
                      title: 'API Integration',
                      posts: '892',
                      icon: 'TrendingUp',
                    },
                    { title: 'Troubleshooting', posts: '654', icon: 'Award' },
                    { title: 'Best Practices', posts: '432', icon: 'Star' },
                  ].map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Rocket size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {topic.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {topic.posts} posts
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/community/topics/${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Community Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Join Our Community?
                </h2>
                <div className="space-y-4">
                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Award size={24} className="text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Recognition & Rewards
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Earn badges, points, and recognition for your
                          contributions to the community.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            Active Members
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            Top Contributors
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <TrendingUp size={24} className="text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Professional Growth
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Learn from experts, share your expertise, and grow
                          your professional network.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                            Mentorship
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            Networking
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Globe size={24} className="text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Global Network
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Connect with developers and professionals from around
                          the world, sharing diverse perspectives and
                          experiences.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                            Worldwide
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            Inclusive
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Guidelines */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Community Guidelines
                </h3>
                <div className="space-y-3">
                  {[
                    'Be respectful and inclusive',
                    'Help others and share knowledge',
                    'Stay on topic and relevant',
                    'Report inappropriate content',
                    'Follow our code of conduct',
                  ].map((guideline, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition"
                    >
                      <Star
                        size={16}
                        className="text-yellow-500 flex-shrink-0"
                      />
                      <span className="text-gray-700">{guideline}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 border border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Join Our Community?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Whether you're a beginner looking for help or an expert wanting
                to share your knowledge, there's a place for you in our
                community. Let's build something amazing together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/community/join"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  Join Now
                </Link>
                <Link
                  href="/help"
                  className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition transform hover:-translate-y-1"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
