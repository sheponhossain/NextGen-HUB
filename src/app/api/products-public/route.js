import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product'; // Mongoose model
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    // Get all products without any session check or filtering
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
