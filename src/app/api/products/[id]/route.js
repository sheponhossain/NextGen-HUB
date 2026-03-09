import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
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

    const { id } = await params;
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
          error: 'Unauthorized: You can only view your own products',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
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

    const { id } = await params;
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

export async function PUT(req, { params }) {
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

    const { id } = await params;
    const body = await req.json();

    // Validate required fields
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
        },
        { status: 400 }
      );
    }

    // Validate price is a number
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
        },
        { status: 400 }
      );
    }

    // Check if the product exists and belongs to the current user
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.createdBy !== session.user.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: You can only edit your own products',
        },
        { status: 403 }
      );
    }

    // Update product with explicit data types
    const now = new Date();
    const updateData = {
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
      updatedAt: now,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
