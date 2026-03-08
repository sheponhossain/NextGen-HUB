import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product'; // Mongoose model
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Debug: Log the incoming data
    console.log('Incoming product data:', body);
    console.log('Price value:', body.price, typeof body.price);

    // Debug: Check if Product model is properly loaded
    console.log('Product model:', typeof Product);
    console.log('Product.create:', typeof Product.create);

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

    // Create product with explicit data types
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
      createdAt: now,
      updatedAt: now,
    };

    console.log('Creating product with data:', productData);

    // Debug: Check if Product.create is a function
    if (typeof Product.create !== 'function') {
      throw new Error(
        'Product.create is not a function. Model may not be properly loaded.'
      );
    }

    console.log('Attempting to save product to MongoDB...');
    const newProduct = await Product.create(productData);
    console.log('Product successfully saved to MongoDB:', {
      id: newProduct._id,
      title: newProduct.title,
      price: newProduct.price,
      category: newProduct.category,
      sku: newProduct.sku,
      imageUrl: newProduct.imageUrl,
      imageSavedTo: newProduct.imageUrl
        ? `http://localhost:3000${newProduct.imageUrl}`
        : 'No image',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Product successfully saved to MongoDB',
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    // Provide more specific error messages based on error type
    let errorMessage = 'Failed to create product';

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      errorMessage = `Validation error: ${validationErrors.join('. ')}`;
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      errorMessage = 'A product with this SKU already exists';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: error.name === 'ValidationError' ? error.errors : null,
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
