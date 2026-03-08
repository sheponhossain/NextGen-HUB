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

    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, options);

    // Send a ping to confirm a successful connection
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
  } catch (error) {
    console.error('MongoDB Connection error:', error.message);
    console.error('Error details:', {
      name: error.name,
      code: error.code,
      message: error.message,
    });

    // Provide helpful error messages for common issues
    if (error.name === 'MongoTimeoutError') {
      console.error(
        'MongoDB connection timed out. Check your network connection and MongoDB URI.'
      );
      console.error('Possible solutions:');
      console.error('1. Check your internet connection');
      console.error('2. Verify your MongoDB URI is correct');
      console.error('3. Check if MongoDB Atlas cluster is running');
      console.error('4. Check firewall settings');
    } else if (error.name === 'MongoNetworkError') {
      console.error(
        'Network error connecting to MongoDB. Check your MongoDB URI and firewall settings.'
      );
      console.error('Possible solutions:');
      console.error('1. Check if MongoDB Atlas cluster is accessible');
      console.error('2. Verify IP whitelist in MongoDB Atlas');
      console.error('3. Check network connectivity');
    } else if (error.name === 'MongoParseError') {
      console.error('Invalid MongoDB URI. Please check your .env file.');
      console.error(
        'Make sure the URI format is correct and all required fields are present.'
      );
    } else if (error.name === 'MongoServerSelectionError') {
      console.error(
        'Server selection error. Check MongoDB Atlas cluster status and IP whitelist.'
      );
      console.error('Possible solutions:');
      console.error('1. Add your IP address to MongoDB Atlas IP Access List');
      console.error('2. Check if cluster is running');
      console.error('3. Verify database name in URI');
    }

    throw error; // Re-throw to let calling code handle it
  }
};

export default connectDB;
