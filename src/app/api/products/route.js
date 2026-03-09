import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product'; // Mongoose model
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();

    // Get session to identify the user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validate required fields with more descriptive error messages
    const errors = [];

    if (!body.title || body.title.trim() === '') {
      errors.push('Product title is required');
    }

    if (!body.shortDescription || body.shortDescription.trim() === '') {
      errors.push('Short description is required');
    }

    if (!body.fullDescription || body.fullDescription.trim() === '') {
      errors.push('Full description is required');
    }

    if (
      body.price === undefined ||
      body.price === null ||
      body.price === '' ||
      body.price === 'undefined' ||
      body.price === 'null'
    ) {
      errors.push('Price is required and must be a valid number');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: errors.join('. '),
          details: {
            title: body.title,
            shortDescription: body.shortDescription,
            fullDescription: body.fullDescription,
            price: body.price,
          },
        },
        { status: 400 }
      );
    }

    // Validate price is a number with more descriptive error messages
    let price;
    if (typeof body.price === 'string') {
      price = parseFloat(body.price.replace(/[^0-9.-]/g, ''));
    } else {
      price = parseFloat(body.price);
    }

    if (isNaN(price) || price < 0 || !isFinite(price)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid price value: "${body.price}". Price must be a positive number.`,
          details: {
            input: body.price,
            parsed: price,
            type: typeof body.price,
          },
        },
        { status: 400 }
      );
    }

    // Create product with explicit data types and user association
    const now = new Date();
    const productData = {
      title: String(body.title).trim(),
      description: String(body.shortDescription).trim(),
      shortDescription: String(body.shortDescription).trim(),
      fullDescription: String(body.fullDescription).trim(),
      price: Number(price),
      priority: body.priority ? String(body.priority).trim() : 'Medium',
      category: body.category
        ? String(body.category).trim()
        : '📦 All Products',
      sku: body.sku ? String(body.sku).trim() : '',
      imageUrl: body.imageUrl ? String(body.imageUrl).trim() : '',
      createdBy: session.user.email, // Associate product with user
      createdAt: now,
      updatedAt: now,
    };

    const newProduct = await Product.create(productData);

    return NextResponse.json(
      {
        success: true,
        message: 'Product successfully saved to MongoDB',
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product',
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    // Get session to identify the user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Filter products by the current user
    const products = await Product.find({ createdBy: session.user.email }).sort(
      { createdAt: -1 }
    );
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    // Get session to identify the user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if the product belongs to the current user
    if (product.createdBy !== session.user.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: You can only delete your own products',
        },
        { status: 403 }
      );
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
