import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    // Test database connection
    const testProduct = {
      title: 'Test Product',
      description: 'Test Description',
      shortDescription: 'Test Short Description',
      fullDescription: 'Test Full Description',
      price: 99.99,
      priority: 'Medium',
      imageUrl: '',
      sku: `TEST-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const savedProduct = await Product.create(testProduct);

    // Clean up test product
    await Product.findByIdAndDelete(savedProduct._id);

    return NextResponse.json({
      success: true,
      message: 'MongoDB connection and data storage working correctly',
      testProductId: savedProduct._id,
      database: 'NextGen_Hub',
      connection: 'Active',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'MongoDB connection or data storage failed',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
