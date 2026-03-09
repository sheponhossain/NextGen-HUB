import mongoose from 'mongoose';

const connectDB = async () => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    // MongoDB connection options using the latest API version
    const options = {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
      // Additional connection options for modern MongoDB
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10, // Maintain up to 10 socket connections
      connectTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
    };

    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, options);

    // Send a ping to confirm a successful connection
    await mongoose.connection.db.admin().command({ ping: 1 });
  } catch (error) {
    throw error; // Re-throw to let calling code handle it
  }
};

export default connectDB;
