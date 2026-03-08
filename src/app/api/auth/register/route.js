import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Input validation
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ message: 'Invalid email format' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return new Response(
        JSON.stringify({
          message: 'Password must be at least 6 characters long',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Connect to database with error handling
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection failed during registration:', dbError);
      return new Response(
        JSON.stringify({
          message: 'Database connection failed. Please try again later.',
          error: dbError.message,
        }),
        {
          status: 503, // Service Unavailable
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(
        JSON.stringify({ message: 'User with that email already exists' }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Hash password and create user
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    return new Response(
      JSON.stringify({
        message: 'User created successfully',
        user: { name, email },
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Registration error:', error);

    // Handle specific error types
    if (error.name === 'ValidationError') {
      return new Response(
        JSON.stringify({
          message: 'Invalid data provided',
          details: error.message,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (error.code === 11000) {
      return new Response(
        JSON.stringify({
          message: 'User with that email already exists',
        }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Server error. Please try again later.',
        error:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
