import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  try {
    // Connect to database directly
    const mongoURI =
      process.env.MONGODB_URI ||
      'mongodb+srv://NextGen_Hub_db_user:BM78Ro5A0o4W3W0X@cluster0.rcgvg4l.mongodb.net/NextGen_Hub?retryWrites=true&w=majority&appName=Cluster0';

    const options = {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      connectTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
    };

    await mongoose.connect(mongoURI, options);
    console.log('Connected to MongoDB');

    // Check if demo user already exists
    const existingUser = await User.findOne({ email: 'demo@example.com' });

    if (existingUser) {
      console.log('Demo user already exists:', existingUser.email);
      return;
    }

    // Create demo user
    const hashedPassword = await bcrypt.hash('demopassword123', 10);
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: hashedPassword,
    });

    console.log('Demo user created successfully:');
    console.log('Email: demo@example.com');
    console.log('Password: demopassword123');
    console.log('User ID:', demoUser._id);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seed function
seedDatabase();
